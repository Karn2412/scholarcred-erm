import React from 'react';
import { FaSyncAlt } from 'react-icons/fa';

interface AttendanceRecord {
  day: string;
  date: string;
  checkIn: string;
  checkOut: string;
  hours: string;
  status: string;
}

const attendanceDetailData: AttendanceRecord[] = [
  { day: 'Monday',    date: '18-05-2025', checkIn: '8:35',  checkOut: '--',    hours: '8',  status: 'Checked In'     },
  { day: 'Tuesday',   date: '19-05-2025', checkIn: '8:35',  checkOut: '18:35', hours: '7',  status: 'Completed'      },
  { day: 'Wednesday', date: '20-05-2025', checkIn: '--',    checkOut: '--',    hours: '2',  status: 'Absent'         },
  { day: 'Thursday',  date: '21-05-2025', checkIn: '--',    checkOut: '--',    hours: '6',  status: 'Approved Off'   },
  { day: 'Friday',    date: '22-05-2025', checkIn: '8:35',  checkOut: '--',    hours: '12', status: 'Regularize'     },
  { day: 'Saturday',  date: '23-05-2025', checkIn: '8:35',  checkOut: '9:45',  hours: '10', status: 'Incomplete'     },
  { day: 'Sunday',    date: '24-05-2025', checkIn: '--',    checkOut: '--',    hours: '9',  status: 'Off Day'        },
];

const getDotColor = (status: string) => {
  switch (status) {
    case 'Checked In':
    case 'Completed':
      return 'bg-green-500';
    case 'Absent':
      return 'bg-red-500';
    case 'Approved Off':
      return 'bg-blue-500';
    case 'Regularize':
      return 'bg-orange-400';
    default:
      return 'bg-gray-400';
  }
};

const AttendanceWeeklyTable: React.FC = () => (
  <div className="overflow-auto bg-white rounded-2xl shadow p-6">
    <div className="rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 text-left">
          <tr>
            <th className="px-4 py-3">Day</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Check In</th>
            <th className="px-4 py-3">Progress</th>
            <th className="px-4 py-3">Check Out</th>
            <th className="px-4 py-3">Hours</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceDetailData.map((row, idx) => {
            const dotColor = getDotColor(row.status);
            const isEven = idx % 2 === 0;

            return (
              <tr
                key={idx}
                className={`${isEven ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-100 transition duration-200`}
              >
                <td className="px-4 py-3 rounded-l-xl">{row.day}</td>
                <td className="px-4 py-3">{row.date}</td>
                <td className="px-4 py-3">{row.checkIn}</td>

                <td className="px-4 py-3 w-40">
                  <div className="flex items-center space-x-1">
                    {/* Start Dot */}
                    <span className={`h-2 w-2 rounded-full ${row.checkIn !== '--' ? 'bg-green-500' : 'bg-gray-400'}`}></span>

                    {/* Track */}
                    <div className="flex-1 h-1 rounded bg-gray-300 relative overflow-hidden">
                      <div
                        className={`absolute left-0 top-0 h-full ${row.checkIn !== '--' ? 'bg-green-500' : 'bg-gray-400'}`}
                        style={{ width: row.checkIn !== '--' && row.checkOut !== '--' ? '100%' : '50%' }}
                      ></div>
                    </div>

                    {/* End Dot */}
                    <span className={`h-2 w-2 rounded-full ${row.checkOut !== '--' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  </div>
                </td>

                <td className="px-4 py-3">{row.checkOut}</td>
                <td className="px-4 py-3">{row.hours}</td>

                <td className="px-4 py-3 rounded-r-xl">
                  {row.status === 'Regularize' ? (
                    <button className="flex items-center space-x-2 px-3 py-1 text-sm bg-orange-400 text-white font-medium rounded-full">
                      <span>Regularize</span>
                      <FaSyncAlt className="text-xs" />
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className={`h-2 w-2 rounded-full ${getDotColor(row.status)}`}></span>
                      <span className="text-sm font-medium text-gray-700">{row.status}</span>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default AttendanceWeeklyTable;
