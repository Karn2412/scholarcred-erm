import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const PersonalDetailsCard = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-2xl shadow col-span-3">
      <h2 className="font-semibold text-sm mb-6">View Your Personal Details</h2>

      <div className="grid grid-cols-3 gap-6 text-sm">
        {/* Row 1: Employee Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-600">
            Employee Name <span className="text-red-500">*</span>
          </label>
          <input type="text" placeholder="First Name" className="w-full border border-blue-400 rounded-full px-4 py-2 outline-none" />
        </div>
        <div className="pt-6">
          <input type="text" placeholder="Middle Name" className="w-full border border-blue-400 rounded-full px-4 py-2 outline-none" />
        </div>
        <div className="pt-6">
          <input type="text" placeholder="Last Name" className="w-full border border-blue-400 rounded-full px-4 py-2 outline-none" />
        </div>

        {/* Row 2: Employee ID & Date of Joining */}
        <div>
          <label className="block mb-1 font-medium text-gray-600">
            Employee ID <span className="text-red-500">*</span>
          </label>
          <input value="50000000" className="w-full border border-blue-400 rounded-full px-4 py-2 outline-none" />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-600">
            Date of Joining <span className="text-red-500">*</span>
          </label>
          <input placeholder="dd--mm--yyyy" className="w-full border border-blue-400 rounded-full px-4 py-2 outline-none" />
        </div>
        <div />

        {/* Row 3: Email & Mobile */}
        <div>
          <label className="block mb-1 font-medium text-gray-600">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input value="abcde@scholarcred.com" className="w-full border border-blue-400 rounded-full px-4 py-2 outline-none" />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-600">Mobile Number</label>
          <input value="+91 9898989898" className="w-full border border-blue-400 rounded-full px-4 py-2 outline-none" />
        </div>
        <div />

        {/* Row 4: Checkbox */}
        <div className="col-span-3 flex items-center space-x-2 text-xs text-gray-600">
          <input type="checkbox" className="accent-blue-500 w-4 h-4" />
          <span>Employee is a director/person with substantial interest in the company.</span>
          <FaExclamationCircle className="text-gray-400 text-sm" />
        </div>

        {/* Row 5: Gender, Work Location, Designation */}
        <div>
          <label className="block mb-1 font-medium text-gray-600">Gender <span className="text-red-500">*</span></label>
          <select className="w-full border border-blue-400 rounded-full px-4 py-2 outline-none">
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-600">Work Location <span className="text-red-500">*</span></label>
          <select className="w-full border border-blue-400 rounded-full px-4 py-2 outline-none">
            <option>Head Office (SDC 4 Tower A)</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-600">Designation <span className="text-red-500">*</span></label>
          <select className="w-full border border-blue-400 rounded-full px-4 py-2 outline-none">
            <option>Enter Designation</option>
          </select>
        </div>

        {/* Row 6: Department, Reporting Manager */}
        <div>
          <label className="block mb-1 font-medium text-gray-600">Department <span className="text-red-500">*</span></label>
          <select className="w-full border border-blue-400 rounded-full px-4 py-2 outline-none">
            <option>Education Loan Customer Support</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-600">Reporting Manager <span className="text-red-500">*</span></label>
          <input value="John Doe" className="w-full border border-blue-400 rounded-full px-4 py-2 outline-none" />
        </div>
        <div />
      </div>
    </div>
  );
};

export default PersonalDetailsCard;
