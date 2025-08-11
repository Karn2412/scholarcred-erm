import React, { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { useUser } from "../../../context/UserContext";
import { supabase } from "../../../supabaseClient";

type Props = {
  onClose: () => void;
};

const LeaveRequestModal: React.FC<Props> = ({ onClose }) => {
  const { userData } = useUser();
  if (!userData) {
    console.error("User data not found");
    return null;
  }

  const [formData, setFormData] = useState({
    day: "",
    type: "",
    duration: "",
    date: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Insert directly into leave_request
      const { error: insertErr } = await supabase
        .from("leave_request")
        .insert([
          {
            date: formData.date,
            type: formData.type,
            reason: formData.reason,
            company_id: userData.company_id,
            user_id: userData.id,
            duration: formData.duration,
            day: formData.day || null,
          },
        ]);

      if (insertErr) throw insertErr;

      console.log("Leave request submitted successfully!");
      onClose();
    } catch (err: any) {
      console.error("Submit error:", err);
      alert(err.message || "Failed to submit leave request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="ms-50 relative w-full max-w-4xl bg-white rounded-3xl p-8 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-2xl text-gray-800 hover:text-black"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Leave Request
        </h2>

        {/* Form Box */}
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

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Paid Leave">Paid Leave</option>
                <option value="Maternity Leave">Maternity Leave</option>
                <option value="Paternity Leave">Paternity Leave</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration <span className="text-red-500">*</span>
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select Duration</option>
                <option value="Full Day">Full Day</option>
                <option value="Half Day - Morning">Half Day - Morning</option>
                <option value="Half Day - Afternoon">Half Day - Afternoon</option>
                <option value="Multiple Days">Multiple Days</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
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
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {loading ? "Submitting..." : <>Request Leave <FiSend className="w-4 h-4" /></>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestModal;
