import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import { useParams } from 'react-router-dom';
import EmployeeAttendanceHeader from './EmployeeAttendanceHeader';

const EmployeeAttendanceDetailPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');
  const { id } = useParams<{ id: string }>();

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
      case 'Checked In': return 'bg-green-500';
      case 'Completed': return 'bg-green-500';
      case 'Absent': return 'bg-red-500';
      case 'Approved Off': return 'bg-blue-500';
      case 'Action Required': return 'bg-orange-400';
      case 'Incomplete': return 'bg-gray-400';
      case 'Off Day': return 'bg-gray-300';
      default: return 'bg-gray-200';
    }
  };

  const getColorBorder = (status: string) => {
    switch (status) {
      case 'Checked In':
      case 'Completed':
        return 'border-green-500';
      case 'Absent':
        return 'border-red-500';
      case 'Approved Off':
        return 'border-blue-500';
      case 'Regularization':
      case 'Action Required':
        return 'border-orange-400';
      case 'Incomplete':
        return 'border-gray-400';
      default:
        return 'border-gray-300';
    }
  };

  const getColorBg = (status: string) => {
    switch (status) {
      case 'Checked In':
      case 'Completed':
        return 'bg-green-500';
      case 'Absent':
        return 'bg-red-500';
      case 'Approved Off':
        return 'bg-blue-500';
      case 'Regularization':
      case 'Action Required':
        return 'bg-orange-400';
      case 'Incomplete':
        return 'bg-gray-400';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1">
        <Header />
        <div className="p-6 backdrop-blur-md bg-white/50 rounded-xl shadow-inner">
          <EmployeeAttendanceHeader viewMode={viewMode} setViewMode={setViewMode} />

          <div
            className="overflow-y-scroll overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm p-2"
            style={{ height: '500px', scrollbarGutter: 'stable' }}
          >
            {viewMode === 'weekly' ? (
              <table className="min-w-full text-sm border-separate border-spacing-y-2">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-2 px-3 text-left rounded-lg">Day</th>
                    <th className="py-2 px-3 text-left rounded-lg">Date</th>
                    <th className="py-2 px-3 text-left rounded-lg">Check In</th>
                    <th className="py-2 px-3 text-left rounded-lg">Progress</th>
                    <th className="py-2 px-3 text-left rounded-lg">Check Out</th>
                    <th className="py-2 px-3 text-left rounded-lg">Hours</th>
                    <th className="py-2 px-3 text-left rounded-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceDetailData.map((item, index) => (
                    <tr
                      key={index}
                      className={`shadow-sm rounded-lg ${
                        index % 2 === 0 ? 'bg-blue-50' : 'bg-white'
                      } hover:bg-blue-100`}
                    >
                      <td className="py-2 px-3 rounded-l-lg">{item.day}</td>
                      <td className="py-2 px-3">{item.date}</td>
                      <td className="py-2 px-3">{item.checkIn}</td>
                      <td className="py-2 px-3">
                        <div className="flex items-center space-x-1">
                          <span
                            className={`h-1 rounded-full ${getStatusColor(item.status)} inline-block w-full`}
                          ></span>
                        </div>
                      </td>
                      <td className="py-2 px-3">{item.checkOut}</td>
                      <td className="py-2 px-3">{item.hours}</td>
                      <td className="py-2 px-3 rounded-r-lg">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <>
                {/* Monthly Day Headers */}
                <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-600 mb-2">
                  <div>Monday</div>
                  <div>Tuesday</div>
                  <div>Wednesday</div>
                  <div>Thursday</div>
                  <div>Friday</div>
                  <div>Saturday</div>
                  <div>Sunday</div>
                </div>

                {/* Monthly Grid Cards */}
                <div className="grid grid-cols-7 gap-4">
                  {[...Array(31)].map((_, index) => {
                    const dayData = attendanceDetailData[index % attendanceDetailData.length];

                    return (
                      <div
                        key={index}
                        className={`rounded-lg border-1 ${getColorBorder(dayData.status)} flex flex-col justify-between overflow-hidden h-20`}
                      >
                        {/* Top section */}
                        <div className="flex justify-between items-start px-2 py-1 text-sm font-semibold text-gray-800">
                          <div>{index + 1}</div>
                          <div>{dayData.checkIn} - {dayData.checkOut}</div>
                        </div>

                        {/* Empty space for top part */}
                        <div className="flex-gro"></div>

                        {/* Bottom Status section */}
                        <div className={`${getColorBg(dayData.status)} text-white text-center py-1 text-[14px] font-semibold`}>
                          {dayData.status}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendanceDetailPage;

