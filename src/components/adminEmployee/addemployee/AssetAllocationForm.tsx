import React from 'react';

const AssetAllocationForm: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-5 rounded-4xl bg-white">
      {/* Left Side (2 cols for checkboxes) */}
      <div className="col-span-1 md:col-span-1 grid grid-cols-2 gap-2">
        <div className="space-y-2">
          {['Phone', 'Laptop', 'Headset', 'Stand'].map((item) => (
            <label key={item} className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 text-blue-600" /> <span>{item}</span>
            </label>
          ))}
        </div>

        <div className="space-y-2">
          {['Charger', 'Camera', 'Mic', 'Sim Card'].map((item) => (
            <label key={item} className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 text-blue-600" /> <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Middle (for input box) */}
      <div className="col-span-1 md:col-span-1 flex flex-col justify-start">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mention any unique assets (If any)
        </label>
        <input
          type="text"
          placeholder="Lorem Ipsum"
          className="w-full px-3 py-3 border border-blue-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right side - Empty column (optional, for spacing consistency) */}
      <div></div>

      {/* Full width note and button spanning all 3 columns */}
      <div className="col-span-full">
        <div className="text-sm text-gray-600 flex items-center mb-4 mt-4">
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

        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default AssetAllocationForm;
