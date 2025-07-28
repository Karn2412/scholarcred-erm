import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { supabase } from "../../supabaseClient";

interface PayRun {
  id: string;
  employee_name: string;
  salary: number;
  deductions: number;
  incentives: number;
  reimbursements: number;
  total_pay: number;
}

const PayRunsTable: React.FC = () => {
  const [payRunsData, setPayRunsData] = useState<PayRun[]>([]);

  useEffect(() => {
    const fetchPayRuns = async () => {
      const { data, error } = await supabase
        .from("pay_runs")
        .select(`
          id,
          salary,
          deductions,
          incentives,
          reimbursements,
          total_pay,
          pay_date,
          employee_name   -- ✅ Correct alias based on FK
        `);
        console.log("Fetching pay runs data...", data);

      if (error) {
        console.error("❌ Error fetching pay runs:", error);
        return;
      }

    const formatted = data.map((item: any) => ({
  id: item.id,
  employee_name: item.employee_name || "Unknown", // ✅ Name from users table
  salary: item.salary,
  deductions: item.deductions,
  incentives: item.incentives,
  reimbursements: item.reimbursements,
  total_pay: item.total_pay,
}));
      console.log("✅ Pay runs data fetched successfully:", formatted);

      setPayRunsData(formatted);
    };

    fetchPayRuns();
  }, []);

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm p-4">
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
            <tr
              key={item.id}
              className={`rounded-md shadow-sm hover:bg-blue-200 ${
                index % 2 === 0 ? "bg-indigo-100" : "bg-purple-50"
              }`}
            >
              <td className="py-3 px-3 rounded-l-md">{index + 1}</td>
              <td className="py-3 px-3">{item.employee_name}</td>
              <td className="py-3 px-3">{item.salary}</td>
              <td className="py-3 px-3">{item.deductions}</td>
              <td className="py-3 px-3">{item.incentives}</td>
              <td className="py-3 px-3">{item.reimbursements}</td>
              <td className="py-3 px-3">{item.total_pay}</td>
              <td className="py-3 px-3 rounded-r-md">
                <button className="text-gray-600 hover:text-black">
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayRunsTable;
