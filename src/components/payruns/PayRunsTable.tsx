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
}

const PayRunsTable: React.FC = () => {
  const [payRunsData, setPayRunsData] = useState<PayRun[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>("2025-08"); // YYYY-MM
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPayRuns = async () => {
      // ✅ Fetch everything including adjustments
      const { data, error } = await supabase
        .from("monthly_payroll_view")

        .select(`
          user_id,
          employee_name,
          monthly_ctc,
          base_pay,
          deductions,
          incentives,
          reimbursements,
          total_pay
        `)
        .eq("month", `${selectedMonth}-01`); // filter by selected month

      if (error) {
        console.error("❌ Error fetching pay runs:", error);
        return;
      }

      const formatted = data.map((item: any) => ({
        id: item.user_id,
        user_id: item.user_id,
        employee_name: item.employee_name,
        salary: item.monthly_ctc,
        deductions: item.deductions || 0,
        incentives: item.incentives || 0,
        reimbursements: item.reimbursements || 0,
        total_pay: item.total_pay
      }));

      setPayRunsData(formatted);
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
                    className="text-gray-600 hover:text-black"
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
