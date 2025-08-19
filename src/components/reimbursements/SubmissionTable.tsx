import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import ReimbursementProofModal from './modal/ReimbursementProofModal';

interface SubmissionItem {
  id: string;
  type: string;
  date: string;
  description: string;
  amount: number;
  proof?: string;
  status: string;
}

const SubmissionTable: React.FC<{ data: SubmissionItem[] }> = ({ data }) => {
  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
            <th className="py-2 px-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? 'bg-violet-50' : 'bg-orange-50'}>
              <td className="py-2 px-3">{index + 1}</td>
              <td className="py-2 px-3">{item.type}</td>
              <td className="py-2 px-3">{item.date}</td>
              <td className="py-2 px-3">{item.description}</td>
              <td className="py-2 px-3">{item.amount}</td>
              <td className="py-2 px-3">
                <button
                  onClick={() => {
                    setSelectedId(item.id);
                    setSelectedProof(item.proof || '');
                  }}
                  className="flex items-center bg-blue-200 hover:bg-blue-600 text-xs px-3 py-1 rounded-md"
                >
                  View <FaEye className="ml-2 text-gray-600" size={12} />
                </button>
              </td>
              <td className="py-2 px-3">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProof && selectedId && (
        <ReimbursementProofModal
          reimbursementId={selectedId}
          proofUrl={selectedProof}
          onClose={() => {
            setSelectedProof(null);
            setSelectedId(null);
          }}
          onActionComplete={() => {
            // 🔄 refresh list from parent
          }}
        />
      )}
    </div>
  );
};

export default SubmissionTable;
