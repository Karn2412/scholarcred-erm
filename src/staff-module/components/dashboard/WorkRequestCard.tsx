import React from 'react';
import { FiHome } from 'react-icons/fi'
import { BiCalendarCheck } from 'react-icons/bi'
import { MdOutlineAccessTime } from 'react-icons/md'

const WorkRequestCard: React.FC = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Work Related Requests
      </h2>

     <div className="flex">
        {/* Left column: buttons with icons */}
        <div className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 bg-blue-900 text-white text-xs font-medium px-4 py-2 rounded-lg">
            <FiHome className="text-xl" />
            <span>Work From Home Request</span>
          </button>

          <button className="flex items-center space-x-2 ms-11 w-40 bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded-lg">
            <BiCalendarCheck className="text-xl" />
            <span>Leave Request</span>
          </button>

          <button className="flex items-center space-x-2 ms-21 w-30 bg-orange-500 text-white text-xs font-medium px-4 py-2 rounded-lg">
            <MdOutlineAccessTime className="text-xl" />
            <span>Regularize</span>
          </button>
        </div>

        {/* Right column: text content */}
        <div className="ml-8 flex-1 space-y-3 text-sm text-gray-700">
          <p>
            You’ve submitted{' '}
            <span className="font-medium">2 leave requests</span> and{' '}
            <span className="font-medium">1 work-from-home request</span> this
            month.
          </p>
          <p className="text-green-700">
            All requests are up to date — no pending approvals at the moment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkRequestCard;
