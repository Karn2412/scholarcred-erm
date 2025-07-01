import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface ReimbursementProofModalProps {
  onClose: () => void;
}

const ReimbursementProofModal: React.FC<ReimbursementProofModalProps> = ({ onClose }) => {
  return (
<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="bg-white rounded-xl w-full max-w-3xl p-6 relative">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl"
        >
          <FaTimes />
        </button>

        {/* Modal Title */}
        <h2 className="text-lg font-semibold mb-4">Reimbursement Proof</h2>

        {/* Proof Preview */}
        <div className="bg-gray-200 rounded-lg h-72 mb-6 flex items-center justify-center text-gray-500 text-sm">
          Proof Preview
        </div>

        {/* Approve & Reject Buttons */}
        <div className="flex justify-center space-x-4">
          <button className="bg-green-500 text-white text-xs px-4 py-2 rounded hover:bg-green-600">
            Approve
          </button>
          <button className="bg-red-500 text-white text-xs px-4 py-2 rounded hover:bg-red-600">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReimbursementProofModal;
