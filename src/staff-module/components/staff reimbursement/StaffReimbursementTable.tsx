// src/components/staff reimbursement/StaffReimbursementTable.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import toast from "react-hot-toast";

interface Props {
  refresh: number;
}

interface Reimbursement {
  id: string;
  category: string;
  expense_date: string;
  description: string | null;
  amount: number;
  receipt_path: string | null;
  status: string;
  proofUrl?: string | null;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "text-green-600";
    case "REJECTED":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

const ReimbursementTable: React.FC<Props> = ({ refresh }) => {
  const [data, setData] = useState<Reimbursement[]>([]);

  async function fetchData() {
    const { data: auth } = await supabase.auth.getUser();
    const uid = auth?.user?.id;
    if (!uid) return;

    const { data, error } = await supabase
      .from("reimbursements")
      .select("id, category, expense_date, description, amount, receipt_url, status")
      .eq("user_id", uid)
      .order("expense_date", { ascending: false });

    if (error) {
      console.error("❌ fetch reimbursements", error);
      return;
    }

    const withUrls = await Promise.all(
      (data || []).map(async (item) => {
        if (item.receipt_url) {
          const { data: signed } = await supabase.storage
            .from("reimbursement") // ✅ correct bucket
            .createSignedUrl(item.receipt_url, 60 * 60 * 24);
          return { ...item, proofUrl: signed?.signedUrl };
        }
        return { ...item, proofUrl: null };
      })
    );

    setData(withUrls);
  }

  useEffect(() => {
    fetchData();
  }, [refresh]);

  // Delete
  async function handleDelete(id: string) {
    const { error } = await supabase.from("reimbursements").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete reimbursement");
      return;
    }
    toast.success("Reimbursement deleted");
    fetchData();
  }

  // Edit
  async function handleEdit(item: Reimbursement) {
    const newAmount = prompt("Enter new amount:", String(item.amount));
    if (!newAmount) return;

    const { error } = await supabase
      .from("reimbursements")
      .update({ amount: Number(newAmount) })
      .eq("id", item.id)
      .eq("status", "PENDING");

    if (error) {
      toast.error("Failed to update reimbursement");
      return;
    }
    toast.success("Reimbursement updated");
    fetchData();
  }

  return (
    <div className="bg-white mt-8 rounded-2xl shadow-sm p-6">
      <h3 className="text-base font-semibold mb-4 text-gray-800">
        Previous Submissions
      </h3>

      <div className="grid grid-cols-9 text-xs font-semibold text-gray-500 px-4 pb-2">
        <div>Sl no</div>
        <div>Type</div>
        <div>Date</div>
        <div>Description</div>
        <div>Amount</div>
        <div>Proof</div>
        <div>Status</div>
        <div>Edit</div>
        <div>Delete</div>
      </div>

      <div className="space-y-3">
        {data.map((item, i) => (
          <div
            key={item.id}
            className="grid grid-cols-9 items-center bg-blue-50 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all"
          >
            <div>{i + 1}</div>
            <div>{item.category}</div>
            <div>{new Date(item.expense_date).toLocaleDateString()}</div>
            <div className="truncate">{item.description}</div>
            <div>₹{item.amount}</div>
            <div>
              {item.proofUrl ? (
                <a
                  href={item.proofUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-blue-200 text-sm rounded-full text-gray-700 flex items-center gap-1"
                >
                  View 👁️
                </a>
              ) : (
                "-"
              )}
            </div>
            <div className={`font-medium ${getStatusColor(item.status)}`}>
              {item.status}
            </div>
            <div>
              {item.status === "PENDING" && (
                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-1 text-xs rounded-full bg-yellow-300 hover:bg-yellow-400"
                >
                  Edit
                </button>
              )}
            </div>
            <div>
              {item.status === "PENDING" && (
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 text-xs rounded-full bg-red-300 hover:bg-red-400"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-6 text-gray-500 text-sm">
            No submissions yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ReimbursementTable;
