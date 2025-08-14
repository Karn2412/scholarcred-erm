import { useState } from 'react';
import Header from '../../../components/common/Header';
import StaffSidebar from '../../components/common/StaffSidebar';
import TimeTrackerCard from '../../components/dashboard/Timetrackercard';
import ReimbursementRequestCard from '../../components/dashboard/ReimbursementRequestCard';
import AttendanceChartCard from '../../components/dashboard/AttendanceChartCard';
import WorkRequestCard from '../../components/dashboard/WorkRequestCard';
import PersonalDetailsCard from '../../components/dashboard/PersonalDetailsCard';
import { supabase } from '../../../supabaseClient';



const StaffDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div className="flex">
      <StaffSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col w-full">
        <Header />
        <div className="p-6  bg-blue-50">
          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <TimeTrackerCard />
            <ReimbursementRequestCard 
           />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <AttendanceChartCard present={75} absent={25} />
            <WorkRequestCard />
          </div>

          <PersonalDetailsCard />
        </div>
      </div>
    </div>
  );
};
export default StaffDashboard;





