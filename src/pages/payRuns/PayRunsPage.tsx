import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import PayRunsFilters from '../../components/payruns/PayRunsFilters';
import PayRunsTable from '../../components/payruns/PayRunsTable';


const PayRunsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1">
        <Header />

        <div className="p-9 bg-indigo-50 ">
          <div className='bg-white p-5'>
            <h2 className="text-lg font-semibold mb-4">Upcoming Pay Runs</h2>

          <PayRunsFilters />
          <PayRunsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayRunsPage;
