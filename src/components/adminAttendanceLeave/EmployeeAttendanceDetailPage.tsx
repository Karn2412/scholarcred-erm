import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import { FaBell } from 'react-icons/fa';

const EmployeeAttendanceDetailPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const attendanceDetailData = [
    { day: 'Monday', date: '18-05-2025', checkIn: '8:35', checkOut: '--', hours: '8', status: 'Checked In' },
    { day: 'Tuesday', date: '19-05-2025', checkIn: '8:35', checkOut: '18:35', hours: '7', status: 'Completed' },
    { day: 'Wednesday', date: '20-05-2025', checkIn: '--', checkOut: '--', hours: '2', status: 'Absent' },
    { day: 'Thursday', date: '21-05-2025', checkIn: '--', checkOut: '--', hours: '6', status: 'Approved Off' },
    { day: 'Friday', date: '22-05-2025', checkIn: '8:35', checkOut: '--', hours: '12', status: 'Action Required' },
    { day: 'Saturday', date: '23-05-2025', checkIn: '8:35', checkOut: '9:45', hours: '10', status: 'Incomplete' },
    { day: 'Sunday', date: '24-05-2025', checkIn: '--', checkOut: '--', hours: '9', status: 'Off Day' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Checked In':
        return 'bg-green-500';
      case 'Completed':
        return 'bg-blue-100';
      case 'Absent':
        return 'bg-red-500';
      case 'Approved Off':
        return 'bg-blue-500';
      case 'Action Required':
        return 'bg-orange-400';
      case 'Incomplete':
        return 'bg-purple-400';
      case 'Off Day':
        return 'bg-gray-300';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1">
        <Header />

        <div className="p-6">
          {/* Top Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Employee Attendance</h2>

            {/* Weekly/Monthly Switch */}
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm rounded bg-gray-200">Weekly</button>
              <button className="px-3 py-1 text-sm rounded bg-gray-100 text-gray-500">Monthly</button>
            </div>
          </div>

          {/* Employee Info and Request Count */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-sm mb-4">
            <input
              type="text"
              readOnly
              value="Zain Workman"
              className="border rounded-full px-4 py-2 text-sm text-gray-700"
            />
            <input
              type="text"
              readOnly
              value="Ostrobyte Overseas"
              className="border rounded-full px-4 py-2 text-sm text-gray-700"
            />
            <input
              type="text"
              readOnly
              value="UI UX Designer"
              className="border rounded-full px-4 py-2 text-sm text-gray-700"
            />
            <button className="flex items-center justify-between bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
              Requests
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs">
                2
              </span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded border border-gray-200 shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-2 px-3 text-left">Day</th>
                  <th className="py-2 px-3 text-left">Date</th>
                  <th className="py-2 px-3 text-left">Check In</th>
                  <th className="py-2 px-3 text-left">Progress</th>
                  <th className="py-2 px-3 text-left">Check Out</th>
                  <th className="py-2 px-3 text-left">Hours</th>
                  <th className="py-2 px-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceDetailData.map((item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-100`}
                  >
                    <td className="py-2 px-3">{item.day}</td>
                    <td className="py-2 px-3">{item.date}</td>
                    <td className="py-2 px-3">{item.checkIn}</td>
                    <td className="py-2 px-3">
                      <div
                        className={`h-1 w-24 rounded-full ${getStatusColor(item.status)}`}
                      ></div>
                    </td>
                    <td className="py-2 px-3">{item.checkOut}</td>
                    <td className="py-2 px-3">{item.hours}</td>
                    <td className="py-2 px-3">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendanceDetailPage;
