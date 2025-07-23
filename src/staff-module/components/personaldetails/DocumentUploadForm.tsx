import React, { useState } from 'react';

interface Document {
  name: string;
  file?: File;
  url?: string;
}

interface Props {
  formData: {
    documents: Document[];
    panCardUrl?: string;
    aadhaarCardUrl?: string;
    blankChequeUrl?: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const DocumentUploadForm: React.FC<Props> = ({ formData, setFormData }) => {
  const [newDocName, setNewDocName] = useState('');
  const [newDocFile, setNewDocFile] = useState<File | null>(null);

  const handleAddDocument = () => {
    if (!newDocName || !newDocFile) return;
    setFormData((prev: any) => ({
      ...prev,
      documents: [
        ...(prev.documents || []),
        { name: newDocName, file: newDocFile },
      ],
    }));
    setNewDocName('');
    setNewDocFile(null);
  };

  return (
    <div className="p-6 rounded-md shadow-sm bg-white">
      <h2 className="text-lg font-bold mb-4">Uploaded Documents</h2>

      {/* Only Display Existing PAN, Aadhaar & Cheque URLs */}
      {formData.panCardUrl && (
        <div className="mb-4">
          <span className="font-medium">PAN Card:</span>{' '}
          <a href={formData.panCardUrl} className="text-blue-600 underline" target="_blank" rel="noreferrer">View</a>
        </div>
      )}
      {formData.aadhaarCardUrl && (
        <div className="mb-4">
          <span className="font-medium">Aadhaar Card:</span>{' '}
          <a href={formData.aadhaarCardUrl} className="text-blue-600 underline" target="_blank" rel="noreferrer">View</a>
        </div>
      )}
      {formData.blankChequeUrl && (
        <div className="mb-4">
          <span className="font-medium">Blank Cheque:</span>{' '}
          <a href={formData.blankChequeUrl} className="text-blue-600 underline" target="_blank" rel="noreferrer">View</a>
        </div>
      )}

      {/* Dynamic User-Uploaded Docs */}
      <div className="mt-6">
        <h3 className="font-semibold text-md mb-2">Add New Document</h3>
        <input
          type="text"
          value={newDocName}
          onChange={(e) => setNewDocName(e.target.value)}
          placeholder="Document Name"
          className="border rounded p-2 w-full mb-2"
        />
        <input
          type="file"
          onChange={(e) => setNewDocFile(e.target.files?.[0] || null)}
          className="border rounded p-2 w-full mb-2"
        />
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAddDocument}
        >
          Add Document
        </button>
      </div>

      {/* List of User-Added Files (Not Yet Uploaded) */}
      {formData.documents?.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Documents to Upload:</h4>
          <ul className="list-disc list-inside text-sm">
            {formData.documents.map((doc, idx) => (
              <li key={idx}>
                {doc.name} {doc.file && ` - ${doc.file.name}`} {doc.url && (
                  <a href={doc.url} target="_blank" rel="noreferrer" className="text-blue-600 ml-2">View</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadForm;
