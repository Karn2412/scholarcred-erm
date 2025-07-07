import React, { useState } from "react";
import {  FiRefreshCcw } from "react-icons/fi";

type Props = {
  onClose: () => void;
};

const RegularizeModal: React.FC<Props> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    day: "Friday",
    checkIn: "08:00",
    checkOut: "18:00",
    date: "22-05-2025",
    reason: "Forgot to Checkout",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className=" ms-50 relative w-full max-w-4xl bg-white rounded-3xl p-8 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-2xl text-gray-800 hover:text-black"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Regularize</h2>

        {/* Form Box with gray background */}
        <div className="bg-gray-200 rounded-2xl p-6">
          <form className="grid grid-cols-3 gap-6">
            {/* Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Day <span className="text-red-500">*</span>
              </label>
              <input
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Day"
              />
            </div>

            {/* Check In */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check In Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Check Out */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check Out Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Date"
              />
            </div>

            {/* Reason */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason <span className="text-red-500">*</span>
              </label>
              <input
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Reason"
              />
            </div>
          </form>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => alert("Submitted")}
            className="flex items-center gap-2 bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
          >
            Regularize <FiRefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegularizeModal;
