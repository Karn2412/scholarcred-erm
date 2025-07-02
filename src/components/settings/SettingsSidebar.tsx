import React from 'react';
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaLayerGroup,
  FaUserTie,
  FaBalanceScale,
  FaMoneyBillWave,
  FaFileAlt,
  FaPercentage,
  FaCalendarAlt,
  FaClock,
} from 'react-icons/fa';

const menuItems = [
  { name: 'Organisational Profile', icon: <FaBuilding /> },
  { name: 'Work Locations', icon: <FaMapMarkerAlt /> },
  { name: 'Departments', icon: <FaLayerGroup /> },
  { name: 'Designations', icon: <FaUserTie /> },
  { name: 'Statutory Components', icon: <FaBalanceScale /> },
  { name: 'Salary Components', icon: <FaMoneyBillWave /> },
  { name: 'Salary Templates', icon: <FaFileAlt /> },
  { name: 'Taxes', icon: <FaPercentage /> },
  { name: 'Pay Schedule', icon: <FaCalendarAlt /> },
  { name: 'Leave & Attendance', icon: <FaClock /> },
];

const SettingsSidebar: React.FC = () => {
  return (
    <div className="bg-indigo-50 rounded-lg mt-4 shadow p-4 w-full">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`py-2 px-3 text-gray-600 text-sm rounded hover:bg-gray-100 cursor-pointer flex items-center space-x-2 ${
            item.name === 'Organisational Profile' ? 'bg-gray-100' : ''
          }`}
        >
          {item.icon}
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SettingsSidebar;
