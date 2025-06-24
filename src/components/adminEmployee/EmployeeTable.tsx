import React, { useEffect, useState } from 'react';
import EmployeeRow from './EmployeeRow';

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  status: string;
}

const EmployeeTable = () => {

    const [data, setData] = useState<Employee[]>([]);

     useEffect(() => {
    // Simulate API call or async fetch
    const fetchData = async () => {
      const dummyData: Employee[] = [
        {
          id: 1,
          name: 'Neha Thomas',
          email: 'neha@scholarcred.com',
          department: 'Educational Loan Customer Support',
          status: 'Active',
        },
        {
          id: 2,
          name: 'Gokul Ajit',
          email: 'gokul.a@scholarcred.com',
          department: '',
          status: 'Incomplete',
        },
      ];
      setTimeout(() => setData(dummyData), 300); // Simulate delay
    };

    fetchData();
  }, []);
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="min-w-full text-sm mt-4">
        <thead className="bg-gray-50 text-gray-500 font-medium">
          <tr>
            <th className="px-4 py-2 text-left">Profile</th>
            <th className="px-4 py-2 text-left">Employee Name</th>
            <th className="px-4 py-2 text-left">Work Email</th>
            <th className="px-4 py-2 text-left">Department</th>
            <th className="px-4 py-2 text-left">Employee Status</th>
            <th className="px-4 py-2 text-left">View More</th>
          </tr>
        </thead>
        <tbody >
            {data.map((emp) => (
    <EmployeeRow key={emp.id} employee={emp} />
  ))}
        </tbody>
      </table>

     
<div className="relative py-6">
  {/* Fading Line Above */}
  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent z-0 mt-5" ></div>

  {/* Spacer */}
  <div className="h-1"></div>

  {/* Text on top of fading background */}
  <p className="text-center text-sm text-gray-500 z-10 relative">End of results</p>
</div>
    </div>
  );
};

export default EmployeeTable;
