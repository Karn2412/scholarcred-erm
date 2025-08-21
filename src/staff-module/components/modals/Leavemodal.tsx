import React, { useState } from "react";
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
    duration: "",
    start_date: "",
    end_date: "",
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
      // Determine start and end date
      let startDate = formData.start_date;
      let endDate = formData.end_date || formData.start_date; // if single day leave

      const { error: insertErr } = await supabase
        .from("attendance_requests")
        .insert([
          {
            request_type: "LEAVE",
            start_date: startDate,
            end_date: endDate,
            reason: formData.reason,
            company_id: userData.company_id,
            user_id: userData.id,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="relative w-full max-w-4xl bg-white rounded-3xl p-8 shadow-xl">
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
          <form className="grid grid-cols-3 gap-6" onSubmit={handleSubmit}>
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
                required
              >
                <option value="">Select Duration</option>
                <option value="single">Single Day</option>
                <option value="multiple">Multiple Days</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
                className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* End Date */}
            {formData.duration === "multiple" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  required={formData.duration === "multiple"}
                  className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            )}

            {/* Reason */}
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason <span className="text-red-500">*</span>
              </label>
              <input
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Reason for leave"
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-3 mt-6 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {loading
                  ? "Submitting..."
                  : <>Request Leave <FiSend className="w-4 h-4" /></>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestModal;
