import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useUser } from '../../context/UserContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useUser(); // 👈 get userData from context
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const hideSearchBarRoutes = ['/employees'];
  const shouldHideSearchBar = hideSearchBarRoutes.includes(location.pathname);

  // Logout function
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    } else {
      localStorage.removeItem('userData'); // clear cached data
      navigate('/login');
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 border-b border-gray-200 space-y-4 sm:space-y-0">
      {/* Title */}
      <h3 className="text-lg font-semibold capitalize">
        {location.pathname === '/employees/add'
          ? 'Employee'
          : location.pathname.includes('employees')
          ? 'Employees'
          : location.pathname.includes('attendance')
          ? 'Attendance And Leave'
          : location.pathname.includes('pay')
          ? 'Pay Runs'
          : location.pathname.includes('reimbursements')
          ? 'Reimbursements'
          : location.pathname.includes('templates')
          ? 'Templates'
          : location.pathname.includes('settings')
          ? 'Settings'
          : location.pathname.includes('personal-details')
          ? 'Personal Details'
          : location.pathname.includes('pay-slips')
          ? 'Pay Slips'
          : 'Dashboard'}
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

        {/* Profile Info with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <img
              src="https://www.profilebakery.com/wp-content/uploads/2023/04/LINKEDIN-Profile-Picture-AI-400x400.jpg"
              alt="Profile"
              className="rounded-full w-[30px] h-[30px]"
            />
            <div>
              <p className="text-sm font-medium">{userData?.name || 'Loading...'}</p>
              <p className="text-xs text-gray-500">{userData?.role || 'User'}</p>
            </div>
          </div>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-10">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
