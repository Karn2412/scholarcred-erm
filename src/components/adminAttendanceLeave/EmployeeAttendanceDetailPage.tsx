import React, { useState } from 'react';

import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import { useParams } from 'react-router-dom';
import EmployeeAttendanceHeader from './EmployeeAttendanceHeader';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, format } from 'date-fns';
import {  getDaysInMonth,  addDays } from 'date-fns';

// Inputs (replace with selectedMonth, selectedYear from state if needed)
const year = 2025;
const month = 7; // August = 7 (0-based index)

// Get first day of the month and total days
const firstDay = startOfMonth(new Date(year, month));
const totalDays = getDaysInMonth(firstDay);
const startDay = firstDay.getDay(); // 0=Sunday, 1=Monday, etc.

// Adjust for Monday-based week (you can tweak this logic if needed)
const offset = (startDay + 6) % 7; // Shift so Monday is start

import { useEffect } from 'react'
import { supabase } from '../../supabaseClient';
import { FaMapMarkerAlt } from 'react-icons/fa';
interface AttendanceRecord {
  day: string;
  date: string;
  hoursWorked: string;
  expectedHours: string;
  status: string;
  checkInLocation: { lat: number; long: number } | null;
  checkOutLocation: { lat: number; long: number } | null;
}


const EmployeeAttendanceDetailPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // assume route: /admin/attendance/:userId
  console.log(`User ID from params: ${userId}`);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

 

  
    // ✅ Month/year state
   const today = new Date();
const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
const [selectedYear, setSelectedYear] = useState(today.getFullYear());
const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');
const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
const [loading, setLoading] = useState(true);


const getCurrentWeekDates = () => {
  const start = startOfWeek(today, { weekStartsOn: 1 }); // Monday
  const end = endOfWeek(today, { weekStartsOn: 1 }); // Sunday

  return attendanceData.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= start && itemDate <= end;
  });
};


    const getColorBorder = (status: string) => {
      switch (status) {
        case 'Checked In': return 'border-green-500';
        case 'Absent': return 'border-red-500';
        case 'Regularize': return 'border-orange-400';
        case 'Approved Off': return 'border-blue-500';
        default: return 'border-gray-300';
      }
    };
  
    const getColorBg = (status: string) => {
      switch (status) {
        case 'Checked In': return 'bg-green-500';
        case 'Absent': return 'bg-red-500';
        case 'Regularize': return 'bg-orange-400';
        case 'Approved Off': return 'bg-blue-500';
        case 'Incomplete': return 'bg-yellow-500';
        default: return 'bg-gray-300';
      }
    };
  
  useEffect(() => {
  if (!userId) return;

  const fetchAttendance = async () => {
    setLoading(true);

    const startDate = format(new Date(selectedYear, selectedMonth, 1), 'yyyy-MM-dd');
    const endDate = format(endOfMonth(new Date(selectedYear, selectedMonth)), 'yyyy-MM-dd');

    const { data, error } = await supabase
      .from('employee_attendance_summary')
      .select('*')
      .eq('user_id', userId)
      .gte('attendance_date', startDate)
      .lte('attendance_date', endDate)
      .order('attendance_date', { ascending: true });

    if (error) {
      console.error('Error fetching attendance:', error);
      setAttendanceData([]);
      setLoading(false);
      return;
    }

    const transformed: AttendanceRecord[] = [];
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(selectedYear, selectedMonth, day);
      const formattedDate = format(dateObj, 'yyyy-MM-dd');
      const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

      const dbEntry = data?.find((entry) => entry.attendance_date === formattedDate);
      const isWeekend = weekday === 'Saturday' || weekday === 'Sunday';
      const isFuture = dateObj > today;

      if (dbEntry) {
        const checkInLat = dbEntry.check_in_latitudes?.[0] ?? null;
        const checkInLong = dbEntry.check_in_longitudes?.[0] ?? null;
        const checkOutLat = dbEntry.check_out_latitudes?.[0] ?? null;
        const checkOutLong = dbEntry.check_out_longitudes?.[0] ?? null;
        const status = dbEntry.attendance_statuses?.[0] || 'Absent';

        transformed.push({
          day: weekday,
          date: dbEntry.attendance_date,
          hoursWorked: dbEntry.total_worked_hours?.toFixed(2) ?? '0.00',
          expectedHours: dbEntry.expected_hours?.toFixed(2) ?? '0.00',
          status,
          checkInLocation: checkInLat && checkInLong ? { lat: checkInLat, long: checkInLong } : null,
          checkOutLocation: checkOutLat && checkOutLong ? { lat: checkOutLat, long: checkOutLong } : null,
        });
      } else {
        transformed.push({
          day: weekday,
          date: formattedDate,
          hoursWorked: '0.00',
          expectedHours: '0.00',
          status: isWeekend ? 'Approved Off' : isFuture ? 'Incomplete' : 'Absent',
          checkInLocation: null,
          checkOutLocation: null,
        });
      }
    }

    setAttendanceData(transformed);
    setLoading(false);
  };

  fetchAttendance();
}, [userId, selectedMonth, selectedYear]);

  

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1">
        <Header />
        <div className="p-6 backdrop-blur-md bg-white/50 rounded-xl shadow-inner">
          <EmployeeAttendanceHeader viewMode={viewMode}
  setViewMode={setViewMode}
  employeeName="Zain Workman"
  department="Ostrobyte Overseas"
  designation="UI UX Designer"
  showRequestsButton={true} />

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
  {getCurrentWeekDates().map((item, index) => (
    <tr key={index} className={`shadow-sm rounded-lg ${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-100`}>
      <td className="py-2 px-3 rounded-l-lg">{item.day}</td>
      <td className="py-2 px-3">{item.date}</td>
      <td className="py-2 px-3 text-blue-600 hover:text-blue-800">
  {item.checkInLocation ? (
    <a
      href={`https://www.google.com/maps?q=${item.checkInLocation.lat},${item.checkInLocation.lng}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1"
    >
      <FaMapMarkerAlt className="text-red-500" /> View
    </a>
  ) : (
    '--'
  )}
</td>

      <td className="py-2 px-3">
        <div className="flex items-center space-x-1">
          <div className={`w-3 h-3 rounded-full ${getColorBg(item.status)}`}></div>
          <span className="text-xs text-gray-600">{item.hoursWorked} / {item.expectedHours}</span>
        </div>
      </td>
      <td className="py-2 px-3 text-blue-600 hover:text-blue-800">
  {item.checkOutLocation ? (
    <a
      href={`https://www.google.com/maps?q=${item.checkOutLocation.lat},${item.checkOutLocation.lng}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1"
    >
      <FaMapMarkerAlt className="text-green-500" /> View
    </a>
  ) : (
    '--'
  )}
</td>

      <td className="py-2 px-3">{item.hoursWorked}</td>
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
               {/* Monthly Grid Cards */}
<div className="grid grid-cols-7 gap-4">
  {attendanceData.length > 0 ? (
    <>
      {/* Empty cells before the first day of the month */}
      {(() => {
        const firstDay = new Date(selectedYear, selectedMonth, 1);
        const jsDay = firstDay.getDay(); // 0 (Sun) to 6 (Sat)
        const offset = (jsDay + 6) % 7; // Convert to Monday-starting week
        return Array.from({ length: offset }).map((_, idx) => (
          <div key={`empty-${idx}`} className="h-24"></div>
        ));
      })()}

      {/* Actual days of the month */}
      {attendanceData.map((dayData, index) => (
        <div
          key={index}
          className={`rounded-lg border-1 ${getColorBorder(dayData.status)} flex flex-col justify-between overflow-hidden h-24`}
        >
          {/* Top - Date + Map Icons */}
          <div className="flex justify-between items-start px-2 py-1 text-sm font-semibold text-gray-800">
            <div>{format(new Date(dayData.date), 'd')}</div>
            <div className="flex gap-1">
              {dayData.checkInLocation && (
                <a
                  href={`https://www.google.com/maps?q=${dayData.checkInLocation.lat},${dayData.checkInLocation.long}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Check-in Location"
                >
                  <FaMapMarkerAlt className="text-red-500 hover:text-red-700" />
                </a>
              )}
              {dayData.checkOutLocation && (
                <a
                  href={`https://www.google.com/maps?q=${dayData.checkOutLocation.lat},${dayData.checkOutLocation.long}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Check-out Location"
                >
                  <FaMapMarkerAlt className="text-green-500 hover:text-green-700" />
                </a>
              )}
            </div>
          </div>

          <div className="flex-grow"></div>

          {/* Bottom - Status */}
          <div className={`${getColorBg(dayData.status)} text-white text-center py-1 text-[14px] font-semibold`}>
            {dayData.status}
          </div>
        </div>
      ))}
    </>
  ) : (
    <div className="col-span-7 text-center text-gray-500">No attendance data found</div>
  )}
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

