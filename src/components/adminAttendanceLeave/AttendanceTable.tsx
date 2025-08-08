import React from 'react';
import { FaEye, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface AttendanceItem {
  user_id: number;
  name: string;
  attendance_date: string;
  total_worked_hours: number;
  expected_hours: number;
  check_in_latitudes: number[];
  check_in_longitudes: number[];
  check_out_latitudes: number[];
  check_out_longitudes: number[];
  attendance_statuses: string[];
}

interface AttendanceTableProps {
  attendanceData: AttendanceItem[];
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ attendanceData }) => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const todayData = attendanceData.filter(
    (item) => item.attendance_date === today
  );

  const handleViewClick = (userId: number) => {
    navigate(`/attendance-detail/${userId}`);
    console.log(`Navigating to attendance detail for user ID: ${userId}`);
  };
  

  const renderLocationIcon = (lat?: number, long?: number) => {
    if (!lat || !long) return '--';
    return (
      <a
        href={`https://www.google.com/maps?q=${lat},${long}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800"
        title={`${lat.toFixed(4)}, ${long.toFixed(4)}`}
      >
        <FaMapMarkerAlt size={16} />
      </a>
    );
  };

  return (
    <div className="overflow-x-auto rounded border border-gray-200 shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-3 text-left">SL No</th>
            <th className="py-2 px-3 text-left">Employee Name</th>
            <th className="py-2 px-3 text-left">Check In Location</th>
            <th className="py-2 px-3 text-left">Status</th>
            <th className="py-2 px-3 text-left">Check Out Location</th>
            <th className="py-2 px-3 text-left">View</th>
          </tr>
        </thead>
        <tbody>
          {todayData.length > 0 ? (
            todayData.map((item, index) => (
              <tr
                key={item.user_id}
                className={`${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-100`}
              >
                <td className="py-2 px-3">{index + 1}</td>
                <td className="py-2 px-3">{item.name}</td>
                <td className="py-2 px-3">
                  {renderLocationIcon(item.check_in_latitudes[0], item.check_in_longitudes[0])}
                </td>
                <td className="py-2 px-3">{item.attendance_statuses[0] || '--'}</td>
                <td className="py-2 px-3">
                  {renderLocationIcon(item.check_out_latitudes[0], item.check_out_longitudes[0])}
                </td>
                <td className="py-2 px-3">
                  <button
                    onClick={() => handleViewClick(item.user_id)}
                    className="bg-indigo-300 px-3 py-1 text-xs text-black rounded flex items-center gap-1"
                  >
                    View <FaEye />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No attendance records for today.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
