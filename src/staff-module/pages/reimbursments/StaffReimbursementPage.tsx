// src/pages/staff/ReimbursementPage.tsx
import React, { useState } from 'react';
import Header from '../../../components/common/Header';
import StaffSidebar from '../../components/common/StaffSidebar';
import ReimbursementTable from '../../components/staff reimbursement/StaffReimbursementTable';


const ReimbursementPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex  bg-blue-50 min-h-screen">
      <StaffSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col w-full">
        <Header />

        <main className="p-6">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Type of Reimbursement <span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-blue-400 rounded-full px-4 py-2 text-sm outline-none">
                  <option>Please pick a type</option>
                  <option>Travel</option>
                  <option>Supplies</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Expense Date <span className="text-red-500">*</span>
                </label>
                <input type="date" className="w-full border border-blue-400 rounded-full px-4 py-2 text-sm outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Amount <span className="text-red-500">*</span>
                </label>
                <input type="number" placeholder="XXXXXXXXXXXX" className="w-full border border-blue-400 rounded-full px-4 py-2 text-sm outline-none" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea className="w-full border border-blue-400 rounded-2xl px-4 py-2 text-sm outline-none" rows={3} placeholder="Description..." />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Upload Listed Documents <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded-full hover:bg-blue-600">
                  Upload Files
                </button>
                <div className="bg-blue-100 px-3 py-1 rounded-full text-sm text-blue-700">
                  Image2347.jpg <span className="ml-2 cursor-pointer">&#10005;</span>
                </div>
              </div>
            </div>

            <div className="text-end">
              <button className="bg-green-600 text-white px-6 py-2 text-sm rounded-full hover:bg-green-700">
                Apply For Reimbursement
              </button>
            </div>
          </div>

          {/* Table Section */}
          <div className="mt-6">
            <ReimbursementTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReimbursementPage;
