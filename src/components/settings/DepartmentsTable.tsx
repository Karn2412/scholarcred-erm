import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import AddDepartmentModal from './modal/DepartementModal';

const DepartmentsTable: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
  const departments = [
    {
      name: 'Education Loan Customer Support',
      code: '-',
      description: '-',
      employees: '6',
    },
    {
      name: 'Education Loan Customer Support',
      code: '-',
      description: '-',
      employees: '-',
    },
  ];

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
          <button className="bg-gray-100  border text-gray-600 px-3 py-2 rounded text-sm flex items-center">
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
              <th>Total Employees</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100'
                } hover:bg-blue-200 space-y-2.5 rounded-lg overflow-hidden`}
                style={{ borderRadius: '0.5rem', marginBottom: '8px' }}
              >
                <td className="py-2">{dept.name}</td>
                <td>{dept.code}</td>
                <td>{dept.description}</td>
                <td>{dept.employees}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <AddDepartmentModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </div>
    </>
  );
};

export default DepartmentsTable;
 