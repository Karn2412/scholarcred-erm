import React, { useState } from 'react';
import { supabase } from '../../../supabaseClient';

const AddEmployeeForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    number: '',
    gender: 'Male',
    dateOfJoining: '',
    designation: '',
    department: 'HR',
    levels: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session?.access_token) {
      console.error('Session error or missing token:', sessionError?.message);
      return;
    }

    const accessToken = session.access_token;

    const fullName = `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim();
    const formattedDate = new Date(formData.dateOfJoining).toISOString().split('T')[0];

    const requestBody = {
      email: formData.email,
      password: formData.password,
      name: fullName,
      number: formData.number,
      levels: Number(formData.levels),
      gender: formData.gender,
      date_of_joining: formattedDate,
      designation: formData.designation,
      department: formData.department,
      company_id: "abf5c8bd-d12f-45c3-b148-b45f79c8e382", // Replace with actual admin company_id dynamically if needed
    };

    const response = await fetch('https://weomenwupoiizjjmrvjw.supabase.co/functions/v1/add-employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(requestBody)
    });

    const result = await response.json();
    if (!response.ok) {
      console.error('Edge Function Error:', result.error);
    } else {
      alert('Employee added successfully!');
      console.log(result);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-sm">
      <div className="space-y-6 pr-6">
        {/* Employee Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Employee Name <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full" />
            <input type="text" name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full" />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full" />
          </div>
        </div>

        {/* Employee ID (optional) and Date of Joining */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Joining <span className="text-red-500">*</span>
            </label>
            <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full" />
          </div>
        </div>

        {/* Work Email and Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Email <span className="text-red-500">*</span>
            </label>
            <input type="email" name="email" placeholder="abc@company.com" value={formData.email} onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full" />
          </div>
        </div>

        {/* Gender and Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender <span className="text-red-500">*</span>
            </label>
            <select name="gender" value={formData.gender} onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full bg-white">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input type="text" name="number" placeholder="+91 9876543210" value={formData.number} onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full" />
          </div>
        </div>

        {/* Designation and Department */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Designation
            </label>
            <input type="text" name="designation" placeholder="e.g. Software Engineer" value={formData.designation} onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department <span className="text-red-500">*</span>
            </label>
            <select name="department" value={formData.department} onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full bg-white">
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="IT">IT</option>
              <option value="Customer Support">Customer Support</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
            Add Employee
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddEmployeeForm;
