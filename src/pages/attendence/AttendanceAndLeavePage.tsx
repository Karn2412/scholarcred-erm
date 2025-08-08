import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import AttendanceFilterAndLegend from '../../components/adminAttendanceLeave/AttendanceFilterAndLegend';
import AttendanceTable from '../../components/adminAttendanceLeave/AttendanceTable';
import { supabase } from '../../supabaseClient';

const AttendanceAndLeavePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchAttendance = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const userId = session?.user?.id;
    if (!userId) return;

    // Step 1: Get admin's company_id from public.users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('company_id')
      .eq('id', userId)
      .single();

    if (userError || !userData?.company_id) return;

    const companyId = userData.company_id;

    // Step 2: Get all users in the same company
    const { data: companyUsers, error: companyUsersError } = await supabase
      .from('users')
      .select('id')
      .eq('company_id', companyId);

    if (companyUsersError || !companyUsers) return;

    const userIds = companyUsers.map((u) => u.id);

    // Step 3: Fetch attendance for those user IDs
    const { data: attendance, error: attendanceError } = await supabase
      .from('employee_attendance_summary')
      .select(`
        user_id,
        name,
        attendance_date,
        total_worked_hours,
        expected_hours,
        check_in_latitudes,
        check_in_longitudes,
        check_out_latitudes,
        check_out_longitudes,
        attendance_statuses
      `)
      .in('user_id', userIds)
      .order('attendance_date', { ascending: false });

    if (attendanceError) {
      console.error('Attendance fetch error:', attendanceError);
      return;
    }

    const formatted = attendance.map((a) => ({
      user_id: a.user_id,
      name: a.name ?? 'Unknown',
      attendance_date: a.attendance_date,
      total_worked_hours: a.total_worked_hours,
      expected_hours: a.expected_hours,
      check_in_latitudes: a.check_in_latitudes || [],
      check_in_longitudes: a.check_in_longitudes || [],
      check_out_latitudes: a.check_out_latitudes || [],
      check_out_longitudes: a.check_out_longitudes || [],
      attendance_statuses: a.attendance_statuses || [],
    }));

    setAttendanceData(formatted);
    setLoading(false);
  };

  fetchAttendance();
}, []);


  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1">
        <Header />

        <div className="p-6">
          <AttendanceFilterAndLegend />
          {loading ? (
            <div className="text-center mt-10 text-gray-500">Loading attendance...</div>
          ) : (
            <AttendanceTable attendanceData={attendanceData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceAndLeavePage;
