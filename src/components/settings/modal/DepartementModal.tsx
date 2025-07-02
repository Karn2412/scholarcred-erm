import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface AddDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDepartmentModal: React.FC<AddDepartmentModalProps> = ({ isOpen, onClose }) => {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentCode, setDepartmentCode] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="bg-white rounded-xl w-96 p-6 relative shadow-lg">
        {/* Close Icon */}
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">
          <FaTimes />
        </button>

        <h2 className="text-lg font-semibold mb-4">New Department</h2>

        <div className="space-y-4 bg-gray-200 rounded-tr-2xl rounded-tl-2xl p-4">
          {/* Department Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Department Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Department Name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="w-full border border-blue-300 rounded-full px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          {/* Department Code */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Department Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="000000"
              value={departmentCode}
              onChange={(e) => setDepartmentCode(e.target.value)}
              className="w-full border border-blue-300 rounded-full px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              placeholder="Max 250 characters"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-blue-300 rounded-2xl px-3 py-2 text-sm focus:outline-none h-28"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className='rounded-bl-2xl rounded-br-2xl bg-gray-200 py-0.5'>
          <button className=" mt-1 w-50 mb-8 bg-blue-500 ms-20 text-white py-2 rounded-full flex items-center justify-center gap-2 hover:bg-blue-600">
            Save Department <FaCheck />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDepartmentModal;
