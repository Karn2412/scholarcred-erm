import React, { useState, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import PayslipPreviewModal from '../Staffpayslip/PaySlipPreview';
import { supabase } from '../../../supabaseClient';
import { fillTemplate } from '../../../utils/filledtemplate';


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
  const [templateHtml, setTemplateHtml] = useState<string>("");

  // fetch default payslip template
  useEffect(() => {
    const fetchTemplate = async () => {
      const { data, error } = await supabase
        .from("templates")
        .select("html_content")
        .eq("category", "Regular Payslips")
        .eq("is_default", true)
        .single();
      if (data) setTemplateHtml(data.html_content);
      if (error) console.error("Template fetch error:", error.message);
    };
    fetchTemplate();
  }, []);

  const handlePreviewClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // fill template with real data
  const filledTemplate = templateHtml
    ? fillTemplate(templateHtml, {
        employee_name: employeeName,
        employee_id: "EMP001",
        month,
        base_pay: salary,
        incentives,
        reimbursements,
        deductions,
        net_pay: totalPay,
      })
    : "";

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
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white px-4 py-1 rounded-full text-sm flex items-center gap-2"
          >
            <FaDownload /> Download
          </button>

          {showModal && (
            <PayslipPreviewModal
              onClose={handleCloseModal}
              month={month}
              htmlContent={filledTemplate}
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
