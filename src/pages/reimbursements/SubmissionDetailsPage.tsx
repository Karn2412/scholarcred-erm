import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import EmployeeDetailsCard from '../../components/reimbursements/EmployeeDetailsCard';
import SubmissionTable from '../../components/reimbursements/SubmissionTable';
import { useParams } from 'react-router-dom';



const SubmissionDetailsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
   const { employeeId } = useParams<{ employeeId: string }>();
    
   
      

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1">
        <Header />

        <div className="p-4">
          {/* Page Heading */}
          <h2 className="text-lg font-semibold mb-4">Submissions</h2>

          <div className='p-6 bg-indigo-50'>
            {/* Employee Info */}
          <EmployeeDetailsCard
            name="Corey Baptista"
            department="Ostrobyte Overseas"
            designation="UI UX Designer"
            avatar="https://randomuser.me/api/portraits/men/32.jpg"
          />

          {/* Table */}
          <SubmissionTable />
          </div>
           
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailsPage;
