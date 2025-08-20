import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { supabase } from "../../supabaseClient";
import PayRunDetailsModal from "./PayRunDetailsModal";

interface PayRun {
  id: string;
  user_id: string;
  employee_name: string;
  salary: number;
  deductions: number;
  incentives: number;
  reimbursements: number;
  total_pay: number;
  source: "Live" | "History";
}

const PayRunsTable: React.FC = () => {
  const [payRunsData, setPayRunsData] = useState<PayRun[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>("2025-08"); // YYYY-MM
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPayRuns = async () => {
      const today = new Date();
      const currentMonth = today.toISOString().slice(0, 7); // YYYY-MM

      // 🔑 if selected month is current → live, else → history
      if (selectedMonth === currentMonth) {
        // ✅ fetch live payroll (current month)
        const { data: liveData, error: liveErr } = await supabase
          .from("monthly_payroll_view")
          .select(`
            user_id,
            employee_name,
            monthly_ctc,
            base_pay,
            deductions,
            incentives,
            reimbursements,
            total_pay,
            month
          `);

        if (liveErr) {
          console.error("❌ Live payroll error:", liveErr);
          return;
        }

        const formatted = (liveData || []).map((item: any) => ({
          id: item.user_id,
          user_id: item.user_id,
          employee_name: item.employee_name,
          salary: item.monthly_ctc,
          deductions: item.deductions || 0,
          incentives: item.incentives || 0,
          reimbursements: item.reimbursements || 0,
          total_pay: item.total_pay,
          source: "Live" as const,
        }));

        setPayRunsData(formatted);
      } else {
        // ✅ fetch history payroll (saved months)
        const { data: historyData, error: histErr } = await supabase
          .from("payroll_history_view")
          .select(`
            user_id,
            employee_name,
            month,
            monthly_ctc,
            base_pay,
            deductions,
            incentives,
            reimbursements,
            total_pay
          `)
          .eq("month", `${selectedMonth}-01`);

        if (histErr) {
          console.error("❌ History payroll error:", histErr);
          return;
        }

        const formatted = (historyData || []).map((item: any) => ({
          id: item.user_id,
          user_id: item.user_id,
          employee_name: item.employee_name,
          salary: item.monthly_ctc,
          deductions: item.deductions || 0,
          incentives: item.incentives || 0,
          reimbursements: item.reimbursements || 0,
          total_pay: item.total_pay,
          source: "History" as const,
        }));

        setPayRunsData(formatted);
      }
    };

    fetchPayRuns();
  }, [selectedMonth]);

  const handleViewMore = (userId: string) => {
    setSelectedUser(userId);
    setShowModal(true);
  };

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm p-4">
        {/* Month selector */}
        <div className="mb-3 flex items-center gap-3">
          <label className="text-sm font-medium">Select Month:</label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>

        <table className="min-w-full text-sm border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="py-2 px-3 text-left">SL No</th>
              <th className="py-2 px-3 text-left">Employee Name</th>
              <th className="py-2 px-3 text-left">Salary</th>
              <th className="py-2 px-3 text-left">Deductions</th>
              <th className="py-2 px-3 text-left">Incentives</th>
              <th className="py-2 px-3 text-left">Reimbursements</th>
              <th className="py-2 px-3 text-left">Total Pay</th>
              <th className="py-2 px-3 text-left">View More</th>
            </tr>
          </thead>
          <tbody>
            {payRunsData.map((item, index) => (
              <tr key={`${item.user_id}-${selectedMonth}`}>
                <td className="py-3 px-3 rounded-l-md">{index + 1}</td>
                <td className="py-3 px-3">{item.employee_name}</td>
                <td className="py-3 px-3">{item.salary}</td>
                <td className="py-3 px-3 text-red-500">{item.deductions}</td>
                <td className="py-3 px-3 text-green-600">{item.incentives}</td>
                <td className="py-3 px-3 text-blue-600">{item.reimbursements}</td>
                <td className="py-3 px-3 font-semibold">{item.total_pay}</td>
                <td className="py-3 px-3 rounded-r-md">
                  <button
                    onClick={() => handleViewMore(item.user_id)}
                    className={`text-gray-600 hover:text-black ${
                      item.source === "History" ? "opacity-40 cursor-not-allowed" : ""
                    }`}
                    disabled={item.source === "History"}
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedUser && (
        <PayRunDetailsModal
          userId={selectedUser}
          month={selectedMonth}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default PayRunsTable;
