import React from 'react';

const BankingDetailsForm: React.FC<{ formData: any; setFormData: any }> = ({ formData, setFormData }) => {
  const pillInput = 'w-full px-4 py-2 border-2 border-blue-400 rounded-full focus:outline-none focus:border-blue-500';

  return (
    <div className="bg-white p-6 rounded-2xl  h-100 ">
      {/* Section Title */}
      

      <form className="space-y-6">
        {/* Row 1: Name, Account Number, Re-enter Account Number */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name as per Bank Records <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Full Name"
              className={pillInput}
              value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="XXXXXXXXXXX"
              className={pillInput}
              value={formData.accountNumber || ''}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Re-enter Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="XXXXXXXXXXX"
              className={pillInput}
              value={formData.reEnterAccountNumber || ''}
              onChange={(e) => setFormData({ ...formData, reEnterAccountNumber: e.target.value })}
            />
          </div>
        </div>

        {/* Row 2: IFSC Code, Bank Name, Branch Name */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IFSC Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="XXXXX"
              className={pillInput}
               value={formData.ifscCode || ''}
            onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bank Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="XXXXXXXXXXX"
              className={pillInput}
               value={formData.bankName || ''}
            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="XXXXXXXXXXX"
              className={pillInput}
               value={formData.branchName || ''}
            onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BankingDetailsForm;

