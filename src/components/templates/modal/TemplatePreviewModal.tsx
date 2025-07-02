import React from 'react';
import { FaTimes, FaSearchPlus, FaExpandArrowsAlt, FaCheck } from 'react-icons/fa';

interface TemplatePreviewModalProps {
  onClose: () => void;
}

const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white rounded-2xl p-6 w-100 max-w-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-2xl"
        >
          <FaTimes />
        </button>

        {/* Modal Title */}
        <h2 className="text-lg font-semibold mb-4">Template Preview</h2>

        {/* Preview Box */}
        <div className="bg-gray-300 rounded-tr-2xl rounded-tl-2xl h-96 relative flex items-center justify-center text-gray-400 text-sm">
          {/* Preview Placeholder */}
          Template Preview Area

          {/* Floating Action Buttons (Column Layout) */}
          <div className="absolute right-4 top-1/3 flex flex-col space-y-3">
            <button className="bg-blue-100 p-2 rounded shadow-sm">
              <FaSearchPlus size={16} className="text-gray-700" />
            </button>
            <button className="bg-white border p-2 rounded shadow-sm">
              <FaExpandArrowsAlt size={16} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Bottom Button */}
        <div className='rounded-bl-2xl rounded-br-2xl bg-gray-300 '>
            <button className=" w-50 bg-blue-500 ms-20 text-white py-2 rounded-full flex items-center justify-center gap-2 hover:bg-blue-600">
          Select Template <FaCheck />
        </button>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;
