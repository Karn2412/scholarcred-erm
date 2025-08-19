import React, { useEffect, useState } from 'react';
import { FaTimes, FaDownload } from 'react-icons/fa';
import jsPDF from 'jspdf';

interface PayslipPreviewModalProps {
  onClose: () => void;
  month: string;
  employeeName: string;
  salary: number;
  reimbursements: number;
  deductions: number;
  incentives: number;
  totalPay: number;
}

const PayslipPreviewModal: React.FC<PayslipPreviewModalProps> = ({
  onClose,
  month,
  employeeName,
  salary,
  reimbursements,
  deductions,
  incentives,
  totalPay,
}) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
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

    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [month, employeeName, salary, reimbursements, deductions, incentives, totalPay]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="bg-white rounded-2xl p-4 w-full max-w-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-2xl hover:text-gray-700"
        >
          <FaTimes />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">Payslip Preview</h2>

        {/* PDF Preview */}
        {pdfUrl ? (
          <iframe src={pdfUrl} className="w-full h-96 border rounded-md" />
        ) : (
          <p>Loading preview...</p>
        )}

        <div className="flex justify-center mt-4">
          <a
            href={pdfUrl || '#'}
            download={`Payslip_${month}.pdf`}
            className="bg-green-600 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-green-700"
          >
            Download <FaDownload size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PayslipPreviewModal;
