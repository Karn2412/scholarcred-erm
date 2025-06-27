import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard';
import EmployeesPage from './pages/employee/Employee';
import AddEmployeePage from './pages/employee/AddEmployeePage';
import AttendanceAndLeavePage from './pages/attendence/AttendanceAndLeavePage';
import EmployeeAttendanceDetailPage from './components/adminAttendanceLeave/EmployeeAttendanceDetailPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/employees/add" element={<AddEmployeePage />} />
        <Route path="/attendance" element={<AttendanceAndLeavePage />} />
        <Route path="/employee-attendance-detail" element={<EmployeeAttendanceDetailPage />} />

    </Routes>
  );
};


export default App
