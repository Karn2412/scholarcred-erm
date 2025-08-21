import React, { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { supabase } from '../../supabaseClient';
import AddDepartmentModal from './modal/DepartementModal';

interface Department {
  id: string;
  department_name: string;
  department_code: string;
  description: string | null;
  employees?: number;
}

const DepartmentsTable: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const adminId = session?.user?.id;
      if (!adminId) return;

      // get admin company_id
      const { data: adminUser } = await supabase
        .from('users')
        .select('company_id')
        .eq('id', adminId)
        .single();

      if (!adminUser?.company_id) return;

      const { data, error } = await supabase
        .from('departments')
        .select('id, department_name, department_code, description')
        .eq('company_id', adminUser.company_id);

      if (error) {
        console.error('Error fetching departments:', error);
      } else {
        setDepartments(data || []);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center bg-white mb-4">
        <h2 className="text-lg font-semibold">Departments</h2>

        {/* Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm">
            Add Department
          </button>
          <button className="bg-gray-100 border text-gray-600 px-3 py-2 rounded text-sm flex items-center">
            <FaDownload className="mr-1" />
          </button>
        </div>
      </div>

      <div className="bg-blue-50 h-125 rounded-lg shadow p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="py-2">Department Name</th>
              <th>Department Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr
                key={dept.id}
                className={`${index % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100'} hover:bg-blue-200`}>
                <td className="py-2">{dept.department_name}</td>
                <td>{dept.department_code}</td>
                <td>{dept.description || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <AddDepartmentModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onDepartmentAdded={(dept) => setDepartments((prev) => [...prev, dept])}
        />
      </div>
    </>
  );
};

export default DepartmentsTable;
