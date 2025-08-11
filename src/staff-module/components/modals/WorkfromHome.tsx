import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

type Props = {
  onClose: () => void;
};

const WorkFromHome: React.FC<Props> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    day: "Friday",
    location: "Sick Leave",
    duration: "Full Day",
    date: "2025-05-22",
    reason: "Hospital Visit",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Leave Requested:", formData);
    // You can replace this with an API call
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl p-8 shadow-xl mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-2xl text-gray-800 hover:text-black"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Work From Home Request
        </h2>

        {/* Form Box */}
        <div className="bg-gray-200 rounded-2xl p-6">
          <form
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            onSubmit={handleSubmit}
          >
            {/* Day */}
            <div>
              <label
                htmlFor="day"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Day <span className="text-red-500">*</span>
              </label>
              <input
                id="day"
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Day"
                required
              />
            </div>

            {/* Type */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location <span className="text-red-500">*</span>
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
                required
              >
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Earned Leave">Earned Leave</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Duration <span className="text-red-500">*</span>
              </label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
                required
              >
                <option value="Full Day">Full Day</option>
                <option value="Half Day - Morning">Half Day - Morning</option>
                <option value="Half Day - Evening">Half Day - Evening</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            {/* Reason */}
            <div className="md:col-span-2">
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Reason <span className="text-red-500">*</span>
              </label>
              <input
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Reason"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-3 flex justify-center">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Send <FiSend className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkFromHome;
