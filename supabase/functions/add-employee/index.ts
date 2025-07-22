/// <reference types="https://deno.land/std@0.192.0/types.d.ts" />
import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2?";

// Utility function to add CORS headers to any response
function withCors(res: Response): Response {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res;
}

serve(async (req) => {
  // Handle preflight CORS
  if (req.method === "OPTIONS") {
    return new Response("OK", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Step 1: Verify JWT
    const authHeader = req.headers.get("Authorization");
    const jwt = authHeader?.replace("Bearer ", "");

    if (!jwt) {
      return withCors(new Response(JSON.stringify({ error: "Unauthorized: No token provided" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }));
    }

    const { data: authUser, error: authError } = await supabase.auth.getUser(jwt);
    if (authError || !authUser?.user?.id) {
      return withCors(new Response(JSON.stringify({ error: "Unauthorized: Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }));
    }

    const adminId = authUser.user.id;

    // Step 2: Check if requester is an admin
    const { data: adminRecord, error: adminError } = await supabase
      .from("admins")
      .select("id, company_id")
      .eq("id", adminId)
      .single();

    if (adminError || !adminRecord) {
      return withCors(new Response(JSON.stringify({ error: "Forbidden: Not an admin" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }));
    }

    const adminCompanyId = adminRecord.company_id;

    // Step 3: Parse and validate request body
    const body = await req.json();
    const {
      email,
      password,
      name,
      company_id,
      number,
     
      gender,
      date_of_joining,
      designation,
      department,
    } = body;

    if (
      !email || !password || !name || !company_id || !number ||
      
      !gender || !date_of_joining || !department
    ) {
      return withCors(new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }));
    }

    if (company_id !== adminCompanyId) {
      return withCors(new Response(JSON.stringify({ error: "Forbidden: Company mismatch" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }));
    }

    // Step 4: Create new auth user
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (userError || !userData?.user?.id) {
      return withCors(new Response(JSON.stringify({ error: userError?.message || "User creation failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }));
    }

    const newUserId = userData.user.id;

    // Step 5: Insert into public.users table
    const { error: insertError } = await supabase.from("users").insert([{
      id: newUserId,
      name,
      company_id,
      number,
     
      gender,
      date_of_joining,
      
      designation: designation || null,
      department,
    }]);

    if (insertError) {
      return withCors(new Response(JSON.stringify({ error: insertError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }));
    }

    return withCors(new Response(JSON.stringify({
      message: "User created successfully",
      user_id: newUserId,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }));

  } catch (err) {
    return withCors(new Response(JSON.stringify({
      error: "Unexpected error",
      details: String(err),
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    }));
  }
});
