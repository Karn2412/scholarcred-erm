import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import ReimbursementProofModal from './modal/ReimbursementProofModal';


interface SubmissionItem {
  id: number;
  type: string;
  date: string;
  description: string;
  amount: number;
}

const data: SubmissionItem[] = [
  { id: 1, type: 'Travel', date: '18-05-2025', description: 'Ostrobyte Overseas', amount: 500 },
  { id: 2, type: 'Supplies', date: '19-05-2025', description: 'Ostrobyte Overseas', amount: 5196 },
];

const SubmissionTable: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
      const handleViewClick = () => {
       setShowModal(true);
     };
  return (
    <div className="bg-indigo-50 rounded-xl shadow-sm overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-gray-600 text-left">
            <th className="py-2 px-3">Sl no</th>
            <th className="py-2 px-3">Type of Reimbursement</th>
            <th className="py-2 px-3">Expense Date</th>
            <th className="py-2 px-3">Description</th>
            <th className="py-2 px-3">Amount</th>
            <th className="py-2 px-3">Proof</th>
            <th className="py-2 px-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className={`${index % 2 === 0 ? 'bg-violet-50' : 'bg-orange-50'} hover:bg-gray-100`}>
              <td className="py-2 px-3">{item.id}</td>
              <td className="py-2 px-3">{item.type}</td>
              <td className="py-2 px-3">{item.date}</td>
              <td className="py-2 px-3">{item.description}</td>
              <td className="py-2 px-3">{item.amount}</td>
              <td className="py-2 px-3">
                <button onClick={handleViewClick}
                className="flex items-center bg-blue-200 hover:bg-blue-600 text-xs px-3 py-1 rounded-md">
                  View <FaEye className="ml-2 text-gray-600" size={12} />
                </button>
              </td>
              <td className="py-2 px-3">
                <div className="flex space-x-2">
                  <button className="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600">Approve</button>
                  <button className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600">Reject</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     {showModal && <ReimbursementProofModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default SubmissionTable;
