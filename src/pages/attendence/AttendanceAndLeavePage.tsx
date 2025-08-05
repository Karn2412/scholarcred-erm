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

      // Get the admin's company ID
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('company_id')
        .eq('id', userId)
        .single();

      if (userError || !userData?.company_id) return;

      const companyId = userData.company_id;

      // Get all attendance records for that company
      const { data: attendance, error } = await supabase
        .from("attendance")
        .select(`
          id,
          check_in_time,
          check_out_time,
          attendance_status(status),
          users(name, email, designation, company_id)
        `)
        .order('check_in_time', { ascending: false });

      if (error) {
        console.error('Attendance fetch error:', error);
        return;
      }

      // Filter attendance by matching company_id
      const filtered = attendance.filter((a) => a.users?.company_id === companyId);

      // Transform for table
      const formatted = filtered.map((a) => ({
        id: a.id,
        name: a.users?.name ?? 'Unknown',
        email: a.users?.email ?? '—',
        designation: a.users?.designation ?? '—',
        department: a.users?.company_id ?? '—',
        checkIn: a.check_in_time ? new Date(a.check_in_time).toLocaleTimeString() : '--',
        checkOut: a.check_out_time ? new Date(a.check_out_time).toLocaleTimeString() : '--',
        status: a.attendance_status?.status ?? 'Unknown',
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
