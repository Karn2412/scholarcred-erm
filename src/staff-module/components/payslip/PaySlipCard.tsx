import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import PayslipPreviewModal from '../Staffpayslip/PaySlipPreview';
import jsPDF from 'jspdf';

interface PaySlipCardProps {
  month: string;
  isAvailable: boolean;
  employeeName?: string;
  salary?: number;
  reimbursements?: number;
  deductions?: number;
  incentives?: number;
  totalPay?: number;
}

const PaySlipCard: React.FC<PaySlipCardProps> = ({
  month,
  isAvailable,
  employeeName = "John Doe",
  salary = 50000,
  reimbursements = 2000,
  deductions = 1500,
  incentives = 3000,
  totalPay = 53500
}) => {
  const [showModal, setShowModal] = useState(false);

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  // 🔹 Generate Payslip PDF
  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Payslip", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Employee: ${employeeName}`, 20, 40);
    doc.text(`Month: ${month}`, 20, 50);

    doc.text(`Base Salary: ₹${salary}`, 20, 70);
    doc.text(`Incentives: ₹${incentives}`, 20, 80);
    doc.text(`Reimbursements: ₹${reimbursements}`, 20, 90);
    doc.text(`Deductions: ₹${deductions}`, 20, 100);

    doc.setFontSize(14);
    doc.text(`Net Pay: ₹${totalPay}`, 20, 120);

    doc.save(`Payslip_${month}.pdf`);
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
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-1 rounded-full text-sm flex items-center gap-2"
          >
            <FaDownload /> Download
          </button>

          {showModal && (
            <PayslipPreviewModal
              onClose={handleCloseModal}
              month={month}
              employeeName={employeeName}
              salary={salary}
              reimbursements={reimbursements}
              deductions={deductions}
              incentives={incentives}
              totalPay={totalPay}
            />
          )}
        </>
      ) : (
        <p className="text-gray-400 mt-4">Not Available</p>
      )}
    </div>
  );
};

export default PaySlipCard;
