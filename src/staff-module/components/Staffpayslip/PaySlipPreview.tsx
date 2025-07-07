import React from 'react';
import { FaTimes, FaSearchPlus, FaExpandArrowsAlt, FaDownload } from 'react-icons/fa';

interface PayslipPreviewModalProps {
  onClose: () => void;
}

const PayslipPreviewModal: React.FC<PayslipPreviewModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="bg-white rounded-2xl p-4 w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-2xl hover:text-gray-700"
        >
          <FaTimes />
        </button>

        {/* Modal Title */}
        <h2 className="text-md font-semibold text-gray-800 mb-4 ps-2">Payslip Preview</h2>

        {/* Preview Area */}
        <div className="bg-gray-200 rounded-2xl h-96 relative flex items-center justify-center text-gray-400 text-sm">
          {/* Placeholder */}
          <span>PDF Preview Placeholder</span>

          {/* Floating Action Buttons */}
          <div className="absolute right-4 top-1/3 flex flex-col space-y-3">
            <button className="bg-blue-100 p-2 rounded shadow-sm hover:bg-blue-200">
              <FaSearchPlus size={16} className="text-gray-700" />
            </button>
            <button className="bg-white border p-2 rounded shadow-sm hover:bg-gray-100">
              <FaExpandArrowsAlt size={16} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-center mt-4">
          <button className="bg-green-600 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-green-700">
            Download <FaDownload size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayslipPreviewModal;
