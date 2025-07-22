import React, { useEffect, useState } from 'react';


import { useUser } from '../../context/UserContext';
import EmployeeRow from './EmployeeRow';
import { supabase } from '../../supabaseClient';

interface Employee {
  id: string;
  name: string;
  email: string;
  number: string;

}

const EmployeeTable = () => {
  const [data, setData] = useState<Employee[]>([]);
  
  
  const { userData } = useUser(); // contains company_id from admin table
console.log('userData in EmployeeTable:', userData);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!userData?.company_id) return;

      const { data, error } = await supabase
      
      
        .from('user_with_email')
        .select('id, name, email, number') 
        .eq('company_id', userData.company_id);
        
        console.log('Fetching employees for company:', userData.company_id);
        
      if (error) {
        console.error('Error fetching employees:', error.message);
        return;
      }

      setData(data || []);
    };

    fetchEmployees();
  }, [userData]);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="min-w-full text-sm mt-4">
        <thead className="bg-gray-50 text-gray-500 font-medium">
          <tr>
            <th className="px-4 py-2 text-left">Employee id</th>
            <th className="px-4 py-2 text-left">Employee Name</th>
            <th className="px-4 py-2 text-left">Work Email</th>
            <th className="px-4 py-2 text-left">Mobile number</th>
            <th className="px-4 py-2 text-left">Employee Status</th>
            <th className="px-4 py-2 text-left">View More</th>
          </tr>
        </thead>
        <tbody>
          {data.map((emp) => (
            <EmployeeRow key={emp.id} employee={emp} />
          ))}
        </tbody>
      </table>

      <div className="relative py-6">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent z-0 mt-5"></div>
        <div className="h-1"></div>
        <p className="text-center text-sm text-gray-500 z-10 relative">End of results</p>
      </div>
    </div>
  );
};

export default EmployeeTable;
