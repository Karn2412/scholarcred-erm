import React from 'react';

const SalaryDetailsForm: React.FC = () => {
  return (
    <div className="w-full ">
      {/* Top Heading */}
      <h2 className="text-center text-gray-700 font-semibold mb-6">Particulars</h2>

      {/* Grid with 3 columns - Last column stays blank */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-5 rounded-4xl bg-indigo-50 ">
      
        {/* Left Column */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Joining <span className="text-red-500">*</span></label>
          <input type="date" className="w-full px-3 py-2 border border-blue-300 rounded-full focus:ring-2 focus:ring-indigo-500" />
        </div>

        {/* Middle Column */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly CTC (In INR)</label>
          <input type="text" placeholder="16,000" className="w-full px-3 py-2 border border-blue-300 rounded-full focus:ring-2 focus:ring-indigo-500" />
        </div>

      
        <div></div>

        {/* Left */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Whether the employee is PF covered?</label>
          <div className="flex space-x-4 mt-2">
            <label className="flex items-center space-x-2">
              <input type="radio" name="pf" defaultChecked className="text-indigo-600 focus:ring-indigo-500" />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="pf" className="text-indigo-600 focus:ring-indigo-500" />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Middle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Whether the employee is ESI covered?</label>
          <div className="flex space-x-4 mt-2">
            <label className="flex items-center space-x-2">
              <input type="radio" name="esi" defaultChecked className="text-indigo-600 focus:ring-indigo-500" />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="esi" className="text-indigo-600 focus:ring-indigo-500" />
              <span>No</span>
            </label>
          </div>
        </div>

        
        <div></div>

        {/* Left */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Method of Regime for IT <span className="text-red-500">*</span></label>
          <select className="w-full px-3 py-2 border border-blue-300 rounded-full focus:ring-2 focus:ring-indigo-500">
            <option>New Regime</option>
            <option>Old Regime</option>
          </select>
        </div>

        {/* Middle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rent Paid As Per Employee Declaration</label>
          <input type="text" placeholder="16,000" className="w-full px-3 py-2 border border-blue-300 rounded-full focus:ring-2 focus:ring-indigo-500" />
        </div>

        {/* Right - Empty */}
        <div></div>

        {/* Left */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Deduction <span className="text-red-500">*</span></label>
          <input type="date" className="w-full px-3 py-2 border border-blue-300 rounded-full focus:ring-2 focus:ring-indigo-500" />
        </div>

        {/* Middle & Right - Empty */}
        <div ></div>
        <div></div>
      </div>

      {/* CTC Earnings Table */}
      <div className="mt-6  rounded-md overflow-hidden">
  <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
    <thead className="bg-gray-50 text-gray-700">
      <tr className=''>
        <th className="px-4 py-2">Earnings</th>
        <th className="px-4 py-2">% Earnings on CTC</th>
        <th className="px-4 py-2">Amount</th>
      </tr>
    </thead>
    <tbody className='gap-1'>
      <tr className="bg-blue-50 rounded-lg ">
        <td className="px-4 py-2">Basic Salary &amp; DA</td>
        <td className="px-4 py-2">55.00%</td>
        <td className="px-4 py-2">10,450.00</td>
      </tr>
      <tr className="bg-indigo-50 rounded-lg">
        <td className="px-4 py-2">HRA</td>
        <td className="px-4 py-2">27.50%</td>
        <td className="px-4 py-2">5,500.00</td>
      </tr>
      <tr className="bg-blue-50 rounded-lg">
        <td className="px-4 py-2">Special Allowance</td>
        <td className="px-4 py-2">17.50%</td>
        <td className="px-4 py-2">1,250.00</td>
      </tr>
      {/* Total Row */}
      <tr className="bg-blue-300 font-semibold">
        <td className="px-4 py-2">Gross Earnings</td>
        <td className="px-4 py-2"></td>
        <td className="px-4 py-2">17,200.00</td>
      </tr>
    </tbody>
  </table>
</div>

    </div>
  );
};

export default SalaryDetailsForm;
