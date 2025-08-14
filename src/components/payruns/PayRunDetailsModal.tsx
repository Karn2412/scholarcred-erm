import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

interface AttendanceDetail {
  attendance_date: string;
  total_worked_hours: number;
  expected_hours: number;
}

export default function PayRunDetailsModal({ userId, month, onClose }: any) {
  const [details, setDetails] = useState<AttendanceDetail[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const startDate = `${month}-01`;
      const endDate = `${month}-31`;

      const { data, error } = await supabase
        .from("employee_attendance_summary")
        .select(`
          attendance_date,
          total_worked_hours,
          expected_hours
        `)
        .eq("user_id", userId)
        .gte("attendance_date", startDate)
        .lte("attendance_date", endDate);

      if (error) {
        console.error("Error fetching details:", error);
        return;
      }

      setDetails(data || []);
    };

    fetchDetails();
  }, [userId, month]);
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-lg font-bold mb-4">Attendance Breakdown</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Worked Hours</th>
              <th className="p-2 text-left">Expected Hours</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {details.map((d) => {
              let status = "Absent";
              if (d.total_worked_hours >= d.expected_hours) status = "Worked";
              else if (d.total_worked_hours > 0) status = "Incomplete";

              return (
                <tr key={d.attendance_date}>
                  <td className="p-2">{d.attendance_date}</td>
                  <td className="p-2">{d.total_worked_hours}</td>
                  <td className="p-2">{d.expected_hours}</td>
                  <td
                    className={`p-2 ${
                      status === "Worked"
                        ? "text-green-600"
                        : status === "Incomplete"
                        ? "text-orange-500"
                        : "text-red-500"
                    }`}
                  >
                    {status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
