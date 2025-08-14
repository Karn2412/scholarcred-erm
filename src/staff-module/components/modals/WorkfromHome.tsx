import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useUser } from "../../../context/UserContext";
import { supabase } from "../../../supabaseClient";

type Props = {
  onClose: () => void;
};

const WorkFromHomeRequestModal: React.FC<Props> = ({ onClose }) => {
  const { userData } = useUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    duration: "",
    date: "",
    reason: "",
  });

  if (!userData || !userData.company_id || !userData.id) {
    console.error("Missing user or company info");
    alert("Please log in again.");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.duration || !formData.date || !formData.reason) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const payload = {
      company_id: userData.company_id,
      user_id: userData.id,
      request_type: "WFH",
      start_date: formData.date,
      end_date: formData.date,
      reason: `${formData.reason} (${formData.duration})`,
      status: "PENDING", // optional, defaults to PENDING
    };

    try {
      const { error } = await supabase
        .from("attendance_requests")
        .insert([payload]);

      if (error) throw error;

      console.log("✅ WFH request submitted");
      setFormData({ duration: "", date: "", reason: "" });
      onClose();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl p-8 shadow-xl mx-4">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-2xl text-gray-800 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Work From Home Request
        </h2>
        <div className="bg-gray-200 rounded-2xl p-6">
          <form className="grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={handleSubmit}>
            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration <span className="text-red-500">*</span>
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800"
              >
                <option value="">Select duration</option>
                <option value="Full Day">Full Day</option>
                <option value="Half Day - Morning">Half Day - Morning</option>
                <option value="Half Day - Evening">Half Day - Evening</option>
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
                className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800"
              />
            </div>

            {/* Reason */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason <span className="text-red-500">*</span>
              </label>
              <input
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400 px-4 py-2 text-sm text-gray-800"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-3 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
              >
                {loading ? "Submitting..." : <>Send <FiSend className="w-4 h-4" /></>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkFromHomeRequestModal;
