import React from 'react';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Submission {
  id: number;
  name: string;
  department: string;
  designation: string;
  avatar: string;
}

const submissionsData: Submission[] = [
  {
    id: 1,
    name: 'Corey Baptista',
    department: 'Ostrobyte Overseas',
    designation: 'UI UX Designer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    name: 'Aspen Siphorn',
    department: 'Ostrobyte Overseas',
    designation: 'Sales Executive',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

const ReimbursementsTable: React.FC = () => {

  const navigate = useNavigate();

  const handleViewSubmission = (employeeId: string) => {
    navigate(`/reimbursements/${employeeId}`);
  };
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
           <tr className="text-gray-500 bg-gray-100 text-left rounded-lg">
      <th className="py-3 px-4 w-1/5">Sl no</th>
      <th className="py-3 px-4 w-1/5">Name</th>
      <th className="py-3 px-4 w-1/5">Department</th>
      <th className="py-3 px-4 w-1/5 ">Designation</th>
      <th className="py-3 px-4 w-1/5">Submissions</th>
    </tr>
        </thead>
        <tbody>
          {submissionsData.map((item, index) => (
         <tr key={item.id} className="bg-transparent">
      <td colSpan={5} className="p-2">
        <div
          className={`flex items-center justify-between p-2 rounded-lg ${
            index % 2 === 0 ? 'bg-gray-50' : 'bg-indigo-50'
          } hover:bg-gray-100 shadow-sm`}
        >
          <div className="flex items-center space-x-2 w-1/5">
            <span>{item.id}</span>
          </div>

          <div className="flex items-center space-x-2 w-1/5">
            <img
              src={item.avatar}
              alt={item.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span>{item.name}</span>
          </div>

          <div className="w-1/5 ms-7">{item.department}</div>
          <div className="w-1/5 ms-7">{item.designation}</div>

          <div className="w-1/5">
            <button  onClick={() => handleViewSubmission('id')}className="flex items-center bg-blue-200 hover:bg-gray-300 text-xs px-3 py-1 rounded-lg">
              View Submission
              <FaEye className="ml-2 text-gray-600" size={12} />
            </button>
          </div>
        </div>
      </td>
    </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReimbursementsTable;
