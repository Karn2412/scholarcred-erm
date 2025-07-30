import React, { useState } from "react";
import { supabase } from "../../../supabaseClient";

const AddEmployeeForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    number: "",
    gender: "Male",
    dateOfJoining: "",
    designation: "",
    department: "HR",
    role_name: "staff" // ✅ Added role field
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        alert("Session not found. Please login again.");
        return;
      }

      const accessToken = session.access_token;
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("Failed to get current user.");
        return;
      }

      const { data: roleRecord, error: roleError } = await supabase
        .from("user_roles")
        .select("company_id, roles(role)")
        .eq("id", user.id)
        .single();

      if (roleError || !roleRecord) {
        alert("User role not found.");
        return;
      }

      if (roleRecord.roles.role !== "admin") {
        alert("You are not an admin.");
        return;
      }

      const companyId = roleRecord.company_id;
      const fullName = `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim();
      const formattedDate = new Date(formData.dateOfJoining)
        .toISOString()
        .split("T")[0];

      const requestBody = {
        email: formData.email,
        password: formData.password,
        name: fullName,
        number: formData.number,
        gender: formData.gender,
        date_of_joining: formattedDate,
        designation: formData.designation,
        department: formData.department,
        company_id: companyId,
        role_name: formData.role_name,
      };

      const response = await fetch(
        "https://xdcbcvvlbyizxhrbramv.supabase.co/functions/v1/my-function",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(`❌ Failed: ${result.error}`);
      } else {
        alert("✅ Employee added successfully!");
        setFormData({
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          password: "",
          number: "",
          gender: "Male",
          dateOfJoining: "",
          designation: "",
          department: "HR",
          role_name: "user",
        });
      }
    } catch (err: any) {
      alert("Unexpected error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-sm">
      <div className="space-y-6 pr-6">
        {/* ✅ Employee Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Employee Name <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full"
            />
            <input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              value={formData.middleName}
              onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full"
            />
          </div>
        </div>

        {/* ✅ Date of Joining */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Joining <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full"
            />
          </div>
        </div>

        {/* ✅ Email & Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="abc@company.com"
              value={formData.email}
              onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full"
            />
          </div>
        </div>

        {/* ✅ Gender & Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full bg-white"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="number"
              placeholder="+91 9876543210"
              value={formData.number}
              onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full"
            />
          </div>
        </div>

        {/* ✅ Designation & Department */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              placeholder="e.g. Software Engineer"
              value={formData.designation}
              onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-blue-400 rounded-full bg-white"
            >
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="IT">IT</option>
              <option value="Customer Support">Customer Support</option>
            </select>
          </div>
        </div>

        {/* ✅ Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            name="role_name"
            value={formData.role_name}
            onChange={handleChange}
            className="w-3/4 px-3 py-2 border border-blue-400 rounded-full bg-white"
          >
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* ✅ Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Add Employee
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddEmployeeForm;

