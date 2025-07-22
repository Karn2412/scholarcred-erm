import React from 'react';

interface Props {
  formData: {
    panCard: File | null;
    aadhaarCard: File | null;
    blankCheque: File | null;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const DocumentUploadForm: React.FC<Props> = ({ formData, setFormData }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'panCard' | 'aadhaarCard' | 'blankCheque') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev: any) => ({
        ...prev,
        [type]: file
      }));
    }
  };

  return (
    <div className="p-6 rounded-md shadow-sm bg-white">
      <h2 className="text-lg font-bold mb-4">Document Upload</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload PAN Card <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => handleFileChange(e, 'panCard')}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {formData.panCard && (
          <p className="text-sm text-gray-500 mt-1">Selected: {formData.panCard.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Aadhaar Card <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => handleFileChange(e, 'aadhaarCard')}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {formData.aadhaarCard && (
          <p className="text-sm text-gray-500 mt-1">Selected: {formData.aadhaarCard.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Blank Cheque <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => handleFileChange(e, 'blankCheque')}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {formData.blankCheque && (
          <p className="text-sm text-gray-500 mt-1">Selected: {formData.blankCheque.name}</p>
        )}
      </div>
    </div>
  );
};

export default DocumentUploadForm;
