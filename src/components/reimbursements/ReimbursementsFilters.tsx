import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';

const ReimbursementsFilters: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-between mb-4">
  {/* Search Input with Icon inside */}
  <div className="relative max-w-sm w-full">
    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" />
    <input
      type="text"
      placeholder="Search Submissions..."
      className=" bg-indigo-100 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none w-full"
    />
  </div>

  {/* Update Button */}
  <button className="bg-green-500 text-white flex items-center me-15 px-4 py-2 rounded-full text-sm hover:bg-green-600">
    Update Submissions
    <FiRefreshCw className="ml-2" />
  </button>
</div>

  );
};

export default ReimbursementsFilters;
