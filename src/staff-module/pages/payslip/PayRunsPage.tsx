import React, { useState } from "react";
import PaySlipCard from "../../components/payslip/PaySlipCard";
import { FaDownload } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import StaffSidebar from "../../components/common/StaffSidebar";
import Header from "../../../components/common/Header";

const PayRunsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <StaffSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <div className="p-6  bg-blue-50 ">
          {/* Title and Filters */}
          <div className=" p-5 flex justify-between items-start mb-6 bg-white rounded-b-lg ">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Upcoming Pay Runs
              </h2>
              <label className="text-sm text-gray-600 block mb-1">
                Display Months
              </label>
              <div className="border px-4 py-2 rounded-full w-fit text-sm text-gray-700 bg-white flex items-center gap-2">
                JAN - MAR
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7v4l3 3 3-3V7"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4h16v16H4z"
                  />
                </svg>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-1">
              <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-green-700">
                <FaDownload className="w-4 h-4" />
                Download All
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-blue-600">
                <HiOutlineViewGrid className="w-5 h-5" />
                View All
              </button>
            </div>
          </div>

          {/* PaySlip Cards */}
          <div className="bg-gray-200 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <PaySlipCard month="JAN" isAvailable={true} />
              <PaySlipCard month="FEB" isAvailable={false} />
              <PaySlipCard month="MAR" isAvailable={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayRunsPage;
