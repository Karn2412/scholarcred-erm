import React from 'react';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface AttendanceItem {
  id: number;
  name: string;
  department: string;
  designation: string;
  checkIn: string;
  status: string;
  checkOut: string;
}

interface AttendanceTableProps {
  attendanceData: AttendanceItem[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Checked In':
      return 'bg-green-500';
    case 'Absent':
      return 'bg-red-500';
    case 'Regularization':
      return 'bg-orange-400';
    case 'Approved Off':
      return 'bg-blue-500';
    default:
      return 'bg-gray-300';
  }
};


const AttendanceTable: React.FC<AttendanceTableProps> = ({ attendanceData }) => {

    const navigate = useNavigate();
const handleViewClick = (id:number) => {
  navigate(`/attendance-detail/${id}`);
};
  return (
    <div className="overflow-x-auto rounded border border-gray-200 shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-3 text-left">SL No</th>
            <th className="py-2 px-3 text-left">Employee Name</th>
            <th className="py-2 px-3 text-left">Department</th>
            <th className="py-2 px-3 text-left">Designation</th>
            <th className="py-2 px-3 text-left">Check In</th>
            <th className="py-2 px-3 text-left">Status</th>
            <th className="py-2 px-3 text-left">Check Out</th>
            <th className="py-2 px-3 text-left">View</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((item, index) => (
            <tr
              key={item.id}
              className={`${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-100`}
            >
              <td className="py-2 px-3">{index + 1}</td>
              <td className="py-2 px-3">{item.name}</td>
              <td className="py-2 px-3">{item.department}</td>
              <td className="py-2 px-3">{item.designation}</td>

              {/* Check In */}
              <td className="py-2 px-3">{item.checkIn}</td>

              {/* Status Bar with Hover Tooltip */}
              <td className="py-2 px-3">
                <div className="relative group">
                  <div
                    className={`w-24 h-1 rounded-full ${getStatusColor(item.status)} transition-all duration-200`}
                  ></div>

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap shadow-lg z-10">
                    {item.checkIn} - {item.checkOut !== '--' ? item.checkOut : '14:11'} <br />
                    <span className="text-blue-300">5 Hours</span>
                  </div>
                </div>
              </td>

              {/* Check Out */}
              <td className="py-2 px-3">{item.checkOut}</td>

              {/* View Button */}
              <td className="py-2 px-3">
  <button onClick={() => handleViewClick(item.id)} className="bg-indigo-300 px-3 py-1 text-xs text-black rounded flex items-center gap-1">
    View <FaEye />
  </button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
