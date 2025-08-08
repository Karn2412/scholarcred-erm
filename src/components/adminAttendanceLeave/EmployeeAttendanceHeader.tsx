import React, { useState, type Dispatch, type SetStateAction } from 'react';
import RequestsModal from './attendencemodal/RequestsModal';

interface EmployeeAttendanceHeaderProps {
  viewMode: 'weekly' | 'monthly';
  setViewMode: Dispatch<SetStateAction<'weekly' | 'monthly'>>;
  employeeName: string;
  department: string;
  designation: string;
  showRequestsButton?: boolean;
}

const EmployeeAttendanceHeader: React.FC<EmployeeAttendanceHeaderProps> = ({
  viewMode,
  setViewMode,
  employeeName,
  department,
  designation,
  showRequestsButton = false,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {/* Heading + Switch + Legend */}
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Employee Attendance</h2>

        <div className="flex items-center space-x-6">
          <div className="flex space-x-0">
            <button
              className={`px-3 py-1 text-xs rounded-lg ${viewMode === 'weekly' ? 'bg-gray-300 text-black' : 'bg-gray-100 text-gray-500'}`}
              onClick={() => setViewMode('weekly')}
            >
              Weekly
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-lg ${viewMode === 'monthly' ? 'bg-gray-300 text-black' : 'bg-gray-100 text-gray-500'}`}
              onClick={() => setViewMode('monthly')}
            >
              Monthly
            </button>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>Checked In</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>Absent</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-orange-400 rounded-full mr-1"></span>Regularization</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>Approved Off</div>
          </div>
        </div>
      </div>

      {/* Info Row */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="grid grid-cols-4 gap-4 mb-2 items-center">
          <p className="text-xs text-gray-600">Employee Name</p>
          <p className="text-xs text-gray-600">Department</p>
          <p className="text-xs text-gray-600">Designation</p>

          {/* Requests Button (optional) */}
          <div className="flex justify-end">
            {showRequestsButton && (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs"
              >
                Requests
                <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px]">
                  2
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            readOnly
            value={employeeName}
            className="border border-blue-300 rounded-full px-4 py-2 text-sm text-gray-700"
          />
          <input
            type="text"
            readOnly
            value={department}
            className="border border-blue-300 rounded-full px-4 py-2 text-sm text-gray-700"
          />
          <input
            type="text"
            readOnly
            value={designation}
            className="border border-blue-300 rounded-full px-4 py-2 text-sm text-gray-700"
          />
          <div></div>
        </div>
      </div>

      {showModal && <RequestsModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default EmployeeAttendanceHeader;
