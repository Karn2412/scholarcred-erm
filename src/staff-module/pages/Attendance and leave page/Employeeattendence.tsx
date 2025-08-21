// Employeeattendence.tsx
import  { useEffect, useState } from 'react'
import StaffSidebar from '../../components/common/StaffSidebar'
import WorkRequestCard from '../../components/dashboard/WorkRequestCard'
import TimeTrackerCard from '../../components/dashboard/Timetrackercard'
import Header from '../../../components/common/Header'
import AttendanceWeeklyTable from '../../components/Attendence and leave/AttendanceWeeklyTable'
import { supabase } from '../../../supabaseClient'
import { useUser } from '../../../context/UserContext'
import { format, endOfMonth, addDays, isAfter } from 'date-fns'
// import RegularizeModal from '../../components/modals/RegularizeModal' // adjust path if you want to show the modal here

interface AttendanceRecord {
  day: string;
  date: string;
  hoursWorked: string;
  expectedHours: string;
  status: string;
  checkInLocation: { lat: number; long: number } | null;
  checkOutLocation: { lat: number; long: number } | null;
}

const EmployeeAttendancePage = () => {
  const { userData } = useUser();
  const userId = userData?.id;

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly')
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([])
  

  const today = new Date()
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth())
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear())

  // For opening your Regularize modal from the table:
  const [, setRegularizeDate] = useState<string | null>(null)

  const getColorBorder = (status: string) => {
    switch (status) {
      case 'Checked In': return 'border-green-500';
      case 'Absent': return 'border-red-500';
      case 'Regularize': return 'border-orange-400';
      case 'Approved Off': return 'border-blue-500';
      case 'Leave': return 'border-indigo-500';
      case 'WFH': return 'border-purple-500';
      default: return 'border-gray-300';
    }
  };

  const getColorBg = (status: string) => {
    switch (status) {
      case 'Checked In': return 'bg-green-500';
      case 'Absent': return 'bg-red-500';
      case 'Regularize': return 'bg-orange-400';
      case 'Approved Off': return 'bg-blue-500';
      case 'Leave': return 'bg-indigo-500';
      case 'WFH': return 'bg-purple-500';
      case 'Incomplete': return 'bg-yellow-500';
      default: return 'bg-gray-300';
    }
  };

  useEffect(() => {
    if (!userId) return;

    const fetchAttendance = async () => {
      

      const startDate = format(new Date(selectedYear, selectedMonth, 1), 'yyyy-MM-dd');
      const endDate = format(endOfMonth(new Date(selectedYear, selectedMonth)), 'yyyy-MM-dd');

      // 1) Base attendance summary for the month
      const { data: summary, error: summaryErr } = await supabase
        .from('employee_attendance_summary')
        .select('*')
        .eq('user_id', userId)
        .gte('attendance_date', startDate)
        .lte('attendance_date', endDate)
        .order('attendance_date', { ascending: true });

      if (summaryErr) {
        console.error('Error fetching attendance summary:', summaryErr);
      }

      // 2) Approved LEAVE & WFH requests that overlap this month
      const { data: requests, error: reqErr } = await supabase
        .from('attendance_requests')
        .select('request_type, status, start_date, end_date')
        .eq('user_id', userId)
        .eq('status', 'APPROVED')
        .in('request_type', ['LEAVE', 'WFH'])
        .lte('start_date', endDate)   // start on/before month end
        .gte('end_date', startDate);  // end on/after month start

      if (reqErr) {
        console.error('Error fetching approved requests:', reqErr);
      }

      // Build quick lookup sets for LEAVE/WFH dates
      const leaveDates = new Set<string>();
      const wfhDates = new Set<string>();

      if (requests?.length) {
        for (const r of requests) {
          const s = new Date(r.start_date as string);
          const e = new Date(r.end_date as string);
          // iterate inclusive
          for (let d = s; !isAfter(d, e); d = addDays(d, 1)) {
            const dayStr = format(d, 'yyyy-MM-dd');
            if (r.request_type === 'LEAVE') leaveDates.add(dayStr);
            if (r.request_type === 'WFH') wfhDates.add(dayStr);
          }
        }
      }

      // Build month view, overriding days with Leave/WFH and marking under-hours as Regularize
      const transformed: AttendanceRecord[] = [];
      const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(selectedYear, selectedMonth, day);
        const formattedDate = format(dateObj, 'yyyy-MM-dd');
        const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        const isWeekend = weekday === 'Saturday' || weekday === 'Sunday';
        const isFuture = dateObj > today;

        const dbEntry = summary?.find((entry) => entry.attendance_date === formattedDate);

        // If there is an approved leave/WFH covering this date, force that status
        if (leaveDates.has(formattedDate)) {
          transformed.push({
            day: weekday,
            date: formattedDate,
            hoursWorked: dbEntry?.total_worked_hours?.toFixed(2) ?? '0.00',
            expectedHours: dbEntry?.expected_hours?.toFixed(2) ?? '0.00',
            status: 'Leave',
            checkInLocation: null,
            checkOutLocation: null,
          });
          continue;
        }
        if (wfhDates.has(formattedDate)) {
          transformed.push({
            day: weekday,
            date: formattedDate,
            hoursWorked: dbEntry?.total_worked_hours?.toFixed(2) ?? '0.00',
            expectedHours: dbEntry?.expected_hours?.toFixed(2) ?? '0.00',
            status: 'WFH',
            checkInLocation: null,
            checkOutLocation: null,
          });
          continue;
        }

        if (dbEntry) {
          const checkInLat = dbEntry.check_in_latitudes?.[0] ?? null;
          const checkInLong = dbEntry.check_in_longitudes?.[0] ?? null;
          const checkOutLat = dbEntry.check_out_latitudes?.[0] ?? null;
          const checkOutLong = dbEntry.check_out_longitudes?.[0] ?? null;
          const worked = Number(dbEntry.total_worked_hours ?? 0);
          const expected = Number(dbEntry.expected_hours ?? 0);

          // Base status from attendance_status (first for the day if any)
          let status: string = dbEntry.attendance_statuses?.[0] || 'Absent';

          // Under-hours (non-weekend, not future) => Regularize
          const underHours = !isWeekend && !isFuture && expected > 0 && worked + 0.01 < expected; // small epsilon
          if (underHours) status = 'Regularize';

          transformed.push({
            day: weekday,
            date: dbEntry.attendance_date,
            hoursWorked: worked.toFixed(2),
            expectedHours: expected.toFixed(2),
            status,
            checkInLocation: checkInLat && checkInLong ? { lat: checkInLat, long: checkInLong } : null,
            checkOutLocation: checkOutLat && checkOutLong ? { lat: checkOutLat, long: checkOutLong } : null,
          });
        } else {
          // No attendance row
          const status = isWeekend ? (isFuture ? 'Incomplete' : 'Approved Off') : (isFuture ? 'Incomplete' : 'Absent');
          transformed.push({
            day: weekday,
            date: formattedDate,
            hoursWorked: '0.00',
            expectedHours: '0.00',
            status,
            checkInLocation: null,
            checkOutLocation: null,
          });
        }
      }

      setAttendanceData(transformed);
      
    };

    fetchAttendance();
  }, [userId, selectedMonth, selectedYear]);

   

  return (
    <div className="flex bg-blue-50 min-h-screen">
      <StaffSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col w-full">
        <Header />
        <div className="p-6 space-y-6">
          {/* Top Cards */}
          <div className="flex gap-4">
            <div className="w-1/2"><TimeTrackerCard /></div>
            <div className="w-1/2"><WorkRequestCard /></div>
          </div>

          {/* Attendance Panel */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Employee Attendance</h2>

              <div className="flex items-center gap-4">
                <div className="flex rounded-full bg-white shadow-inner">
                  <button
                    onClick={() => setViewMode('weekly')}
                    className={`px-4 py-1 rounded-l-full text-sm font-medium transition ${viewMode === 'weekly' ? 'bg-gray-300 text-gray-900' : 'text-gray-400'}`}
                  >Weekly</button>
                  <button
                    onClick={() => setViewMode('monthly')}
                    className={`px-4 py-1 rounded-r-full text-sm font-medium transition ${viewMode === 'monthly' ? 'bg-gray-300 text-gray-900' : 'text-gray-400'}`}
                  >Monthly</button>
                </div>

                <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))} className="rounded px-2 py-1 border">
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i}>
                      {format(new Date(2025, i, 1), 'MMMM')}
                    </option>
                  ))}
                </select>

                <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="rounded px-2 py-1 border">
                  {[2023, 2024, 2025, 2026].map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              {viewMode === 'weekly' ? (
                <AttendanceWeeklyTable
                  data={attendanceData}
                  onRegularize={(date) => setRegularizeDate(date)} // 👈 wire the click
                />
              ) : (
                <>
                  <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-600 mb-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <div key={day}>{day}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-3">
                    {(() => {
                      const firstDay = new Date(selectedYear, selectedMonth, 1)
                      const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
                      const firstDayIndex = (firstDay.getDay() + 6) % 7 // Monday = 0

                      const calendarDays = []
                      for (let i = 0; i < firstDayIndex; i++) calendarDays.push(<div key={`empty-${i}`} />)

                      for (let day = 1; day <= daysInMonth; day++) {
                        const date = new Date(selectedYear, selectedMonth, day)
                        const formatted = format(date, 'yyyy-MM-dd')
                        const found = attendanceData.find(d => d.date === formatted)
                        const isFuture = date > today

                        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
                        const isWeekend = weekday === 'Saturday' || weekday === 'Sunday';

                        let status = 'Absent';
                        if (found) {
                          status = found.status;
                        } else if (isWeekend) {
                          status = isFuture ? 'Incomplete' : 'Approved Off';
                        } else {
                          status = isFuture ? 'Incomplete' : 'Absent';
                        }

                        calendarDays.push(
                          <div key={formatted} className={`rounded-xl border ${getColorBorder(status)} shadow-sm hover:shadow-md flex flex-col justify-between h-24`}>
                            <div className="flex justify-between px-2 pt-2 text-sm font-medium text-gray-800">
                              <span>{day}</span>
                              <span className="text-xs text-gray-500">
                                {found?.checkInLocation ? 'IN' : ''} {found?.checkOutLocation ? 'OUT' : ''}
                              </span>
                            </div>
                            <div className={`text-[13px] rounded-b-xl font-semibold text-white text-center py-1 ${getColorBg(status)}`}>
                              {status}
                            </div>
                          </div>
                        )
                      }

                      return calendarDays
                    })()}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Regularize modal opening (optional; adjust import/path/props to your component) */}
      {/* {regularizeDate && (
        <RegularizeModal
          onClose={() => setRegularizeDate(null)}
          initialDate={regularizeDate}
        />
      )} */}
    </div>
  )
}

export default EmployeeAttendancePage
