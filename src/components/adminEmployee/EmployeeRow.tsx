import React from 'react';
import { FaEye, FaExclamationCircle } from 'react-icons/fa';

interface Props {
  employee: {
    id: string;
    name: string;
    email: string;
    number: string | null;
  };
}

const EmployeeRow: React.FC<Props> = ({ employee }) => {
  return (
    <tr className="bg-transparent">
      <td colSpan={6}>
        <div className="rounded-xl bg-blue-100 px-4 py-3 shadow mb-2 flex items-center justify-between gap-4 min-h-[70px]">
          <div className="w-1/8 font-mono text-gray-600">{employee.id}</div>
          <div className="w-1/6 ms-20 font-semibold text-gray-800">{employee.name}</div>
          <div className="w-1/5 ms-22 text-gray-700">{employee.email}</div>
          <div className="w-1/5 ms-10">
            {employee.number ? (
              <span>{employee.number}</span>
            ) : (
              <div className="text-orange-500 flex items-center gap-1 text-sm leading-tight">
                <FaExclamationCircle className="mt-[1px]" />
                <span>
                  This employee's profile is incomplete.
                  <a href="#" className="text-blue-500 underline ml-1">
                    Complete Now
                  </a>
                </span>
              </div>
            )}
          </div>
          <div className="w-1/3 ms-15">
            <span className="text-green-600 font-semibold">Active</span>
          </div>
          <div className="w-1/6 text-gray-600">
            <FaEye className="cursor-pointer hover:text-blue-600" />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeRow;
