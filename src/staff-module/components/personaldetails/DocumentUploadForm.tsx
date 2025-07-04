import React, { useRef, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

const DocumentUploadForm: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger native file picker
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  // Remove a file
  const handleRemove = (index: number) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  return (
    <div className="bg-white p-6 rounded-2xl h-80">
      {/* Title */}
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side: upload + instructions */}
        <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
              Uploaded Listed Document <span className="text-red-500">*</span>
            </label> 
          {/* Upload button */}
          <button
            type="button"
            onClick={handleUploadClick}
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium transition"
          >
            <FiUpload className="mr-2" />
            Upload Files
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
          />

          {/* Document instructions */}
          <div className="mt-6 text-sm text-gray-800 space-y-2">
            <p>1. Cancelled Cheque / Bank Statement / Passbook Copy</p>
            <p>2. PAN Card</p>
            <p>3. Aadhar Card</p>
          </div>
        </div>

        {/* Right side: uploaded files */}
        <div className="flex flex-col space-y-3">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="bg-blue-200 text-sm text-black px-4 py-2 rounded-full flex justify-between items-center w-full"
            >
              <span className="truncate">{file.name}</span>
              <button onClick={() => handleRemove(index)}>
                <IoMdClose className="text-black text-md ml-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
