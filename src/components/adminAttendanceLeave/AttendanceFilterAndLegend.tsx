import React from 'react';
import { FaSearch } from 'react-icons/fa';

const AttendanceFilterAndLegend: React.FC = () => {
  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
      {/* Heading */}
      <h2 className="text-base font-semibold mb-4">Employee Attendance</h2>

      {/* Grid Layout - 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* First Row */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <div className="relative">
            <input
              type="date"
              className="border border-blue-300 rounded-full pl-4 pr-2 py-2 text-gray-300 text-sm w-full focus:ring-blue-500 focus:outline-none"
            />
            
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select className="border border-blue-300 rounded-full px-4 py-2 text-sm w-full text-gray-400 focus:ring-blue-500 focus:outline-none">
            <option>All </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
          <select className="border border-blue-300 rounded-full px-4 text-gray-400 py-2 text-sm w-full focus:ring-blue-500 focus:outline-none">
            <option>All</option>
          </select>
        </div>

        {/* Empty Spacer Column */}
        <div></div>

        {/* Second Row - Search and Legend */}
  {/* Search Bar */}
<div className="col-span-1  rounded-2xl p-2">
  <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
  <div className="relative">
    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 text-sm" />
    <input
      type="text"
      placeholder="Search..."
      className="w-full border border-indigo-50 rounded-lg pl-8 py-2 text-sm focus:ring-blue-500 focus:outline-none"
    />
  </div>
</div>

{/* Legend spanning 2 columns */}
<div className="col-span-2 grid grid-cols-2 items-center text-xs rounded-2xl">
  <div className="flex items-center justify-around ">
    <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
    <p className='ms-2'>Checked In</p>
    <span className="w-3 h-3 rounded-full bg-red-500 inline-block ms-4"></span>
    <p className='ms-2'>Absent</p>
  </div>
  <div className="flex items-center justify-around">
    <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
    <p className='ms-2'>Regularization</p>
    <span className="w-3 h-3 rounded-full bg-blue-500 inline-block ms-4"></span>
    <p className='ms-2'>Approved Off</p>
  </div>
</div>

{/* Empty Spacer with Buttons */}
<div className="col-span-1 flex justify-end items-center space-x-3">

</div>

      </div>
    </div>
  );
};

export default AttendanceFilterAndLegend;
