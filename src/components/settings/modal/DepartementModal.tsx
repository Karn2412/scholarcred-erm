import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { supabase } from '../../../supabaseClient';

interface AddDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDepartmentAdded: (dept: any) => void;
}

const AddDepartmentModal: React.FC<AddDepartmentModalProps> = ({ isOpen, onClose, onDepartmentAdded }) => {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentCode, setDepartmentCode] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const adminId = session?.user?.id;
    if (!adminId) return;

    // get admin's company_id
    const { data: adminUser } = await supabase
      .from('users')
      .select('company_id')
      .eq('id', adminId)
      .single();

    if (!adminUser?.company_id) return;

    const { data, error } = await supabase
      .from('departments')
      .insert([
        {
          company_id: adminUser.company_id,
          department_name: departmentName,
          department_code: departmentCode,
          description,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error adding department:', error.message);
    } else if (data) {
      onDepartmentAdded(data);
      setDepartmentName('');
      setDepartmentCode('');
      setDescription('');
      onClose();
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="bg-white rounded-xl w-96 p-6 relative shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">
          <FaTimes />
        </button>

        <h2 className="text-lg font-semibold mb-4">New Department</h2>

        <div className="space-y-4 bg-gray-200 rounded-tr-2xl rounded-tl-2xl p-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Department Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="w-full border border-blue-300 rounded-full px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Department Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={departmentCode}
              onChange={(e) => setDepartmentCode(e.target.value)}
              className="w-full border border-blue-300 rounded-full px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-blue-300 rounded-2xl px-3 py-2 text-sm h-28"
            />
          </div>
        </div>

        <div className="rounded-bl-2xl rounded-br-2xl bg-gray-200 py-2 flex justify-center">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-500 text-white py-2 px-4 rounded-full flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Department'} <FaCheck />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDepartmentModal;
