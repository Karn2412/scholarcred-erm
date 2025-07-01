import React from 'react';
import { FaEye } from 'react-icons/fa';

interface PayRun {
  id: number;
  name: string;
  salary: number;
  deductions: number;
  incentives: number;
  reimbursements: number;
  totalPay: number;
}

const payRunsData: PayRun[] = [
  { id: 1, name: 'Corey Baptista', salary: 50000, deductions: 50000, incentives: 50000, reimbursements: 50000, totalPay: 2000000 },
  { id: 2, name: 'Aspen Siphorn', salary: 50000, deductions: 50000, incentives: 50000, reimbursements: 50000, totalPay: 2000000 },
  { id: 3, name: 'Zain Workman', salary: 50000, deductions: 50000, incentives: 50000, reimbursements: 50000, totalPay: 2000000 },
  { id: 4, name: 'Hanna Siphorn', salary: 50000, deductions: 50000, incentives: 50000, reimbursements: 50000, totalPay: 2000000 },
  { id: 5, name: 'Ahmad Aminoff', salary: 50000, deductions: 50000, incentives: 50000, reimbursements: 50000, totalPay: 2000000 },
  { id: 6, name: 'Lincoln Bator', salary: 50000, deductions: 50000, incentives: 50000, reimbursements: 50000, totalPay: 2000000 },
  { id: 7, name: 'Jocelyn Schleifer', salary: 50000, deductions: 50000, incentives: 50000, reimbursements: 50000, totalPay: 2000000 },
  { id: 8, name: 'Dulce Vetrovs', salary: 50000, deductions: 50000, incentives: 50000, reimbursements: 50000, totalPay: 2000000 },
];

const PayRunsTable: React.FC = () => {
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
              className={`rounded-md shadow-sm gap-2 hover:bg-blue-200 ${
                index % 2 === 0 ? 'bg-indigo-100' : 'bg-purple-50'
              }`}
            >
              <td className="py-3 px-3 rounded-l-md">{index + 1}</td>
              <td className="py-3 px-3">{item.name}</td>
              <td className="py-3 px-3">{item.salary}</td>
              <td className="py-3 px-3">{item.deductions}</td>
              <td className="py-3 px-3">{item.incentives}</td>
              <td className="py-3 px-3">{item.reimbursements}</td>
              <td className="py-3 px-3">{item.totalPay}</td>
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

