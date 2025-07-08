import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard';
import EmployeesPage from './pages/employee/Employee';
import AddEmployeePage from './pages/employee/AddEmployeePage';
import AttendanceAndLeavePage from './pages/attendence/AttendanceAndLeavePage';
import EmployeeAttendanceDetailPage from './components/adminAttendanceLeave/EmployeeAttendanceDetailPage';

import ReimbursementsPage from './pages/reimbursements/ReimbursementsPage';
import SubmissionDetailsPage from './pages/reimbursements/SubmissionDetailsPage';
import TemplatesPage from './pages/templates/TemplatesPage';
import SettingsDepartmentsPage from './pages/settings/SettingsDepartmentsPage';
import StaffDashboard from './staff-module/pages/dashboard/StaffDashboard';
import PersonalDetailsPage from './staff-module/pages/PersonalDetails/PersonalDetails';

import EmployeeAttendancePage from './staff-module/pages/Attendance and leave page/Employeeattendence';
import PayRunsPage from './staff-module/pages/payslip/PayRunsPageStaff';
import ReimbursementPage from './staff-module/pages/reimbursments/StaffReimbursementPage';
import PayRunsPageAdmin from './pages/payRuns/PayRunsPageAdmin';


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/employees/add" element={<AddEmployeePage />} />
        <Route path="/attendance" element={<AttendanceAndLeavePage />} />
        <Route path="/attendance-detail/:id" element={<EmployeeAttendanceDetailPage />} />
        <Route path="/payruns" element={<PayRunsPageAdmin />} />
        <Route path="/reimbursements" element={<ReimbursementsPage />} />
        <Route path="/reimbursements/:employeeId" element={<SubmissionDetailsPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/settings" element={<SettingsDepartmentsPage />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/staff/personal-details" element={<PersonalDetailsPage/>} />
        <Route path="/staff/attendance" element={<EmployeeAttendancePage/>} />
        <Route path="/staff/pay-slips" element={<PayRunsPage/>} />
        <Route path="/staff/reimbursements" element={<ReimbursementPage />} />

    </Routes>
  );
};


export default App
