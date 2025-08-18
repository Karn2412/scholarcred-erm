import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

interface Props {
  refresh: number; // so table reloads after new submit
}

interface Reimbursement {
  id: string;
  category: string;
  expense_date: string;
  description: string | null;
  amount: number;
  receipt_url: string | null;
  status: string;
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

  useEffect(() => {
    (async () => {
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
      setData(data || []);
    })();
  }, [refresh]);

  return (
    <div className="bg-white mt-8 rounded-2xl shadow-sm p-6">
      <h3 className="text-base font-semibold mb-4 text-gray-800">Previous Submissions</h3>

      <div className="grid grid-cols-7 text-xs font-semibold text-gray-500 px-4 pb-2">
        <div>Sl no</div>
        <div>Type of Reimbursement</div>
        <div>Expense Date</div>
        <div>Description</div>
        <div>Amount</div>
        <div>Proof</div>
        <div>Status</div>
      </div>

      <div className="space-y-3">
        {data.map((item, i) => (
          <div
            key={item.id}
            className="grid grid-cols-7 items-center bg-blue-50 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all"
          >
            <div>{i + 1}</div>
            <div>{item.category}</div>
            <div>{new Date(item.expense_date).toLocaleDateString()}</div>
            <div className="truncate">{item.description}</div>
            <div>₹{item.amount}</div>
            <div>
              {item.receipt_url ? (
                <a
                  href={item.receipt_url}
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
          </div>
        ))}
        {data.length === 0 && (
          <div className="text-center py-6 text-gray-500 text-sm">No submissions yet</div>
        )}
      </div>
    </div>
  );
};

export default ReimbursementTable;
