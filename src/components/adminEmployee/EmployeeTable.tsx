import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import EmployeeRow from "./EmployeeRow";
import { supabase } from "../../supabaseClient";

interface Employee {
  id: string;
  name: string;
  email: string;
  number: string;
  status?: boolean;
}

const EmployeeTable = () => {
  const [data, setData] = useState<Employee[]>([]);
  const { userData } = useUser(); // contains company_id

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!userData?.company_id) return;

      // ✅ Fetch from the view
      const { data, error } = await supabase
        .from("user_with_email")
        .select("auth_id, email, name, number, company_id, is_active")
        .eq("company_id", userData.company_id);

      if (error) {
        console.error("Error fetching employees:", error.message);
        return;
      }

      const formatted = data.map((emp: any) => ({
        id: emp.auth_id,
        name: emp.name,
        email: emp.email,
        number: emp.number,
        status: emp.is_active,
      }));

      setData(formatted);
    };

    fetchEmployees();
  }, [userData]);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="min-w-full text-sm mt-4">
        <thead className="bg-gray-50 text-gray-500 font-medium">
          <tr>
            <th className="px-4 py-2 text-left">Employee ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Work Email</th>
            <th className="px-4 py-2 text-left">Mobile</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((emp) => (
            <EmployeeRow key={emp.id} employee={emp} />
          ))}
        </tbody>
      </table>

      <div className="relative py-6">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent z-0 mt-5"></div>
        <p className="text-center text-sm text-gray-500 z-10 relative">
          End of results
        </p>
      </div>
    </div>
  );
};

export default EmployeeTable;
