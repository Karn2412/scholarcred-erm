import React from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Employee {
  id: string;
  name: string;
  number: string;
}

interface Props {
  employees: Employee[];
}

const ReimbursementsTable: React.FC<Props> = ({ employees }) => {
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
            <th className="py-3 px-4 w-1/5">Phone</th>
            <th className="py-3 px-4 w-1/5">Submissions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((item, index) => (
            <tr key={item.id} className="bg-transparent">
              <td colSpan={4} className="p-2">
                <div
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-indigo-50"
                  } hover:bg-gray-100 shadow-sm`}
                >
                  <div className="flex items-center space-x-2 w-1/5">
                    <span>{index + 1}</span>
                  </div>

                  <div className="flex items-center space-x-2 w-1/5">
                    <span>{item.name}</span>
                  </div>

                  <div className="w-1/5">{item.number}</div>

                  <div className="w-1/5">
                    <button
                      onClick={() => handleViewSubmission(item.id)}
                      className="flex items-center bg-blue-200 hover:bg-gray-300 text-xs px-3 py-1 rounded-lg"
                    >
                      View Submission
                      <FaEye className="ml-2 text-gray-600" size={12} />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}

          {employees.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-400">
                No reimbursements found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReimbursementsTable;
