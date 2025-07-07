import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import PayslipPreviewModal from '../Staffpayslip/PaySlipPreview';

const PaySlipCard = ({ month, isAvailable }: { month: string; isAvailable: boolean }) => {
      const [showModal, setShowModal] = useState(false);
      
       const handlePreviewClick = (e: React.MouseEvent) => {
          e.stopPropagation(); // Prevent card click trigger
          setShowModal(true);
        };
      
      const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div
      className={`w-60 h-72 p-4 rounded-xl shadow flex flex-col justify-center items-center relative ${
        isAvailable ? 'bg-gray-200 border border-blue-400' : 'bg-white border border-gray-300'
      }`}
    >
      <div className="absolute top-2 right-2 text-xs font-bold bg-cyan-600 text-white px-2 py-1 rounded">
        {month}
      </div>
      {isAvailable ? (
        <>
          <button
            onClick={handlePreviewClick}
            className="bg-cyan-500 text-white px-4 py-1 rounded-full text-sm mb-2"
          >
            Preview
          </button>
          <button className="bg-green-500 text-white px-4 py-1 rounded-full text-sm flex items-center gap-2">
            <FaDownload /> Download
          </button>
          {showModal && <PayslipPreviewModal onClose={handleCloseModal} />}
        </>
      ) : null}
    </div>
  );
};

export default PaySlipCard;
