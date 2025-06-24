import React from 'react';
import { MdLocationOn, MdApartment } from 'react-icons/md';
import { FaUserTie } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';

const EmployeeFilters = () => {
  const filters = [
    { label: 'Select Work Location', color: 'bg-purple-100', icon: <MdLocationOn className="text-purple-600 text-lg" /> },
    { label: 'Select Department', color: 'bg-blue-100', icon: <MdApartment className="text-blue-600 text-lg" /> },
    { label: 'Select Designation', color: 'bg-red-100', icon: <FaUserTie className="text-red-600 text-lg" /> },
    { label: 'More Filters', color: 'bg-pink-100', icon: <FiFilter className="text-pink-600 text-lg" /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {filters.map((filter, i) => (
        <button
          key={i}
          className={`flex items-center justify-between ${filter.color} px-4 py-2 rounded text-sm font-medium shadow`}
        >
          <div className="flex items-center gap-2">
            {filter.icon}
            {filter.label}
          </div>
          <span className="text-lg">⌵</span>
        </button>
      ))}
    </div>
  );
};

export default EmployeeFilters;

