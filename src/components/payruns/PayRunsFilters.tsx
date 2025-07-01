import React from "react";
import { FaSearch, FaHistory } from "react-icons/fa";

const PayRunsFilters: React.FC = () => {
  return (
    <div className="flex items-start justify-between w-full mb-4">
      
      {/* Left Section */}
      <div className="flex flex-col gap-3">
        
        {/* First Row - Date Range and Pay Range */}
        <div className="flex gap-6">
          
          {/* Date Range */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div className="flex items-center border border-blue-300 rounded-full px-4 py-2 text-sm w-64">
              <input
                type="text"
                placeholder="dd--mm--yyyy"
                className="flex-1 bg-transparent focus:outline-none"
              />
              <span className="text-gray-500 cursor-pointer">📅</span>
            </div>
          </div>

          {/* Pay Range */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Pay Range</label>
            <select className="border border-blue-300 rounded-full px-4 py-2 text-sm text-gray-500 w-64 focus:outline-none">
              <option className="text-gray-500">All</option>
              <option className="text-gray-500">0 - 1 Lakh</option>
              <option className="text-gray-500">1 Lakh - 2 Lakh</option>
            </select>
          </div>
        </div>

        {/* Second Row - Search */}
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 text-sm w-60 mt-1">
          <FaSearch className="text-red-500 mr-2 text-xs" />
          <input
            type="text"
            placeholder="Search...."
            className="flex-1 bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Right Side - Show Past Button */}
      <button className="flex items-center bg-[#00AEEF] text-white px-4 py-2 rounded-full text-sm mt-6">
        Show Past
        <FaHistory className="ml-1 text-xs" />
      </button>
    </div>
  );
};

export default PayRunsFilters;

