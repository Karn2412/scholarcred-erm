import React from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
  
const Header = () => {
  const location = useLocation();

  // Define pages where search bar should be hidden
 const hideSearchBarRoutes = ['/employees'];
const shouldHideSearchBar = hideSearchBarRoutes.includes(location.pathname);


  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 border-b border-gray-200 space-y-4 sm:space-y-0">
      {/* Title */}
      <h3 className="text-lg font-semibold capitalize">
        {location.pathname === '/employees/add'
          ? 'Employee'
          : location.pathname.includes('employees')
          ? 'Employees'
          : location.pathname ==="/attendance"
          ? 'Attendance And Leave'
          :  location.pathname.includes('attendance')
          ? 'Attendance And Leave'
          : location.pathname ==="/payruns"
          ? 'Pay Runs'
          :  location.pathname.includes('pay')
          ? 'Pay Runs'
          : location.pathname ==="/reimbursements"
          ? 'Reimbursements'
          :  location.pathname.includes('reimbursements')
          ?  'Reimbursements':'dashboard'
          }
      </h3>

      {/* Right Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 w-full sm:w-auto">
        {/* Search Bar */}
        {!shouldHideSearchBar && (
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded w-full sm:w-auto">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Category..."
              className="bg-transparent outline-none w-full"
            />
          </div>
        )}

        {/* Notification Icon */}
        <FaBell className="text-gray-600" />

        {/* Profile Info */}
        <div className="flex items-center space-x-2">
          <img
            src="https://www.profilebakery.com/wp-content/uploads/2023/04/LINKEDIN-Profile-Picture-AI-400x400.jpg"
            alt="Profile"
            className="rounded-full w-[30px] h-[30px]"
          />
          <div>
            <p className="text-sm font-medium">Robert Shah</p>
            <p className="text-xs text-gray-500">HR Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
