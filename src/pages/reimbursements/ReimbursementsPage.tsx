import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import ReimbursementsFilters from '../../components/reimbursements/ReimbursementsFilters';
import ReimbursementsTable from '../../components/reimbursements/ReimbursementsTable';



const ReimbursementsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1">
        <Header />

        <div className="p-6  bg-indigo-50 h-screen">
         <div className='p-3 bg-white h-screen'>
             {/* Title */}
          <h2 className="text-lg font-semibold mb-4">Submissions</h2>

          {/* Filters */}
          <ReimbursementsFilters />

          {/* Table */}
          <ReimbursementsTable />
         </div>
        </div>
      </div>
    </div>
  );
};

export default ReimbursementsPage;
