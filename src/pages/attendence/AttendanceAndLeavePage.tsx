import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import AttendanceFilterAndLegend from '../../components/adminAttendanceLeave/AttendanceFilterAndLegend';
import AttendanceTable from '../../components/adminAttendanceLeave/AttendanceTable';

const AttendanceAndLeavePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const attendanceData = [
    { id: 1, name: 'Corey Baptista', department: 'Ostrobyte Overseas', designation: 'UI UX Designer', checkIn: '9:30', status: 'Checked In', checkOut: '18:30' },
    { id: 2, name: 'Aspen Siphorn', department: 'Ostrobyte Overseas', designation: 'UI UX Designer', checkIn: '--', status: 'Absent', checkOut: '--' },
    { id: 3, name: 'Zain Workman', department: 'Ostrobyte Overseas', designation: 'UI UX Designer', checkIn: '8:35', status: 'Checked In', checkOut: '--' },
    { id: 4, name: 'Hanna Siphorn', department: 'Ostrobyte Overseas', designation: 'UI UX Designer', checkIn: '10:00', status: 'Regularization', checkOut: '--' },
    { id: 5, name: 'Ahmad Aminoff', department: 'Ostrobyte Overseas', designation: 'UI UX Designer', checkIn: '7:00', status: 'Checked In', checkOut: '--' },
    { id: 6, name: 'Lincoln Bator', department: 'Ostrobyte Overseas', designation: 'UI UX Designer', checkIn: '6:00', status: 'Checked In', checkOut: '--' },
    { id: 7, name: 'Jocelyn Schleifer', department: 'Ostrobyte Overseas', designation: 'UI UX Designer', checkIn: '12:15', status: 'Checked In', checkOut: '--' },
    { id: 8, name: 'Dulce Vetrov', department: 'Ostrobyte Overseas', designation: 'UI UX Designer', checkIn: '--', status: 'Approved Off', checkOut: '--' },
  ];

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1">
        <Header />

        <div className="p-6">
          <AttendanceFilterAndLegend />
          <AttendanceTable attendanceData={attendanceData} />
        </div>
      </div>
    </div>
  );
};

export default AttendanceAndLeavePage;
