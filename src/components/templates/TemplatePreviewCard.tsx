import React, { useState } from 'react';
import { FaEye, FaCheck } from 'react-icons/fa';
import TemplatePreviewModal from './modal/TemplatePreviewModal';

interface TemplatePreviewCardProps {
  id: number;
  title: string;
  isDefault?: boolean;
  isSelected: boolean;
  onSelect: () => void;
  htmlContent: string; // 👈 add this
}

const TemplatePreviewCard: React.FC<TemplatePreviewCardProps> = ({
  title,
  isDefault,
  isSelected,
  onSelect,
  htmlContent,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={onSelect}
        className={`border rounded-lg bg-white w-56 h-64 shadow-sm relative cursor-pointer
          ${isDefault && !isSelected ? 'border-gray-300' : ''}
          ${isSelected ? 'border-cyan-400 bg-gray-700 text-white' : ''}
        `}
      >
        {/* Default Badge */}
        {isDefault && (
          <div
            className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${
              isSelected ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            Default
          </div>
        )}

        {/* Buttons when selected */}
        {isSelected && (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <button
              onClick={handlePreviewClick}
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-full w-44"
            >
              <FaEye /> Preview Template
            </button>
            <button className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-full w-44">
              <FaCheck /> Select Template
            </button>
          </div>
        )}
      </div>

      <p className="mt-2 text-sm">{title}</p>

      {/* Modal with preview content */}
      {showModal && (
        <TemplatePreviewModal onClose={handleCloseModal} htmlContent={htmlContent} />
      )}
    </div>
  );
};

export default TemplatePreviewCard;
