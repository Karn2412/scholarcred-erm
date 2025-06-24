import React from 'react';
import { FaEye, FaExclamationCircle } from 'react-icons/fa';

interface Props {
  employee: {
    id: number;
    name: string;
    email: string;
    department: string;
    status: string;
  };
}

const EmployeeRow: React.FC<Props> = ({ employee }) => {
  return (
  <tr className="bg-transparent  ">
  <td colSpan={6}>
    <div className="rounded-xl bg-blue-100 px-4 py-3 shadow mb-2 flex items-center justify-between gap-4 min-h-[70px]">
      <div className="w-1/8">{employee.id}</div>
      <div className="w-1/6">{employee.name}</div>
      <div className="w-1/5">{employee.email}</div>
      <div className="w-1/5">
        {employee.department || (
          <div className="text-orange-500 flex items-center gap-1 text-sm leading-tight">
            <FaExclamationCircle className="mt-[1px]" />
            <span>This employee's profile is incomplete. 
              <a href="#" className="text-blue-500 underline ml-1">Complete Now</a>
            </span>
          </div>
        )}
      </div>
      <div className="w-1/3">
        {employee.status === 'Active' ? (
          <span className="text-green-600 font-medium">● Active</span>
        ) : (
          <span className="text-orange-500 font-medium">Incomplete</span>
        )}
      </div>
      <div className="w-1/6 text-gray-600">
        <FaEye className="cursor-pointer" />
      </div>
    </div>
  </td>
</tr>


  );
};

export default EmployeeRow;
