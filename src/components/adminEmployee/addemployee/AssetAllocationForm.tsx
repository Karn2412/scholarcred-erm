import React from 'react';

const AssetAllocationForm: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-md shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Choose which all assets would be required :</h2>

      {/* 5 Column Grid: 2 cols → Checkboxes, 2 cols → Input, 1 col → empty */}
      <div className="grid grid-cols-5 gap-2 mb-6">

        {/* Left 2 Columns: Checkboxes */}
        <div className="col-span-2 grid grid-cols-2 gap-1">
          <div className="space-y-1">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 text-blue-600" /> <span>Phone</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 text-blue-600" /> <span>Laptop</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 text-blue-600" /> <span>Headset</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 text-blue-600" /> <span>Stand</span>
            </label>
          </div>

          <div className="space-y-1">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 text-blue-600" /> <span>Charger</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 text-blue-600" /> <span>Camera</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 text-blue-600" /> <span>Mic</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 text-blue-600" /> <span>Sim Card</span>
            </label>
          </div>
        </div>

        {/* Middle 2 Columns: Unique Assets Input */}
        <div className="col-span-2 flex flex-col justify-start">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mention any unique assets (If any)
          </label>
          <input
            type="text"
            placeholder="Lorem Ipsum"
            className="w-full px-3 py-3 border border-blue-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Last 1 Column: Left Empty for right side spacing */}
        <div></div>

      </div>

      {/* Info Note */}
      <div className="text-sm text-gray-600 flex items-center mb-4">
        <span>Kindly note that all assets requested need approval from admin</span>
        <svg
          className="h-4 w-4 text-yellow-500 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 6a9 9 0 110 18 9 9 0 010-18z" />
        </svg>
      </div>

      {/* Submit Button */}
      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">
        Submit Request
      </button>
    </div>
  );
};

export default AssetAllocationForm;
