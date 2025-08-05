import React, { useState, useEffect } from 'react';
import { useUser } from '../../../context/UserContext';
import { supabase } from '../../../supabaseClient';

const TimeTrackerCard: React.FC = () => {
  const MIN = 8 * 60;
  const MAX = 18 * 60;
  const [time, setTime] = useState(15 * 60 + 20);
  const [todayRecord, setTodayRecord] = useState<any>(null);
  const { userData } = useUser();

  const formatTime = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}:${m.toString().padStart(2, '0')}`;
  };

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const trackPercent = ((time - MIN) / (MAX - MIN)) * 100;
  const trackStyle = {
    background: `linear-gradient(to right,
      #12D790 0%,
      #12D790 ${trackPercent}%,
      #E5E7EB ${trackPercent}%,
      #E5E7EB 100%
    )`,
  };

  const today = new Date().toISOString().split('T')[0];

  const fetchTodayAttendance = async () => {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('user_id', userData.id)
      .gte('check_in_time', `${today}T00:00:00`)
      .lt('check_in_time', `${today}T23:59:59`)
      .order('check_in_time', { ascending: false });

    if (error && error.code !== 'PGRST116') {
      console.error('Attendance fetch error:', error.message);
    } else {
      // Find the most recent record that is not yet checked out
      const activeRecord = data && Array.isArray(data)
        ? data.find((record) => !record.check_out_time)
        : null;
      setTodayRecord(activeRecord || null);
    }
  };

  useEffect(() => {
    if (userData?.id) {
      fetchTodayAttendance();
    }
  }, [userData?.id]);

  // 🟢 Check In
  const handleCheckIn = async () => {
    if (todayRecord && !todayRecord.check_out_time) {
      alert("You must check out before checking in again.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const { data: statusData, error: statusError } = await supabase
        .from("attendance_status")
        .select("id")
        .eq("status", "Checked In")
        .single();

      if (statusError || !statusData) {
        console.error("Error fetching status_id:", statusError);
        return;
      }

      const { error } = await supabase.from("attendance").insert({
        user_id: userData.id,
        company_id: userData.company_id,
        check_in_time: new Date().toISOString(),
        check_in_latitude: latitude,
        check_in_longitude: longitude,
        updated_by: userData.id,
        status_id: statusData.id,
      });

      if (error) {
        console.error("Check-in failed:", error);
      } else {
        console.log("Checked in successfully");
        fetchTodayAttendance();
      }
    });
  };

  // 🔴 Check Out
  const handleCheckOut = async () => {
    if (!todayRecord) return alert("You haven't checked in yet.");

    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const { data: statusData, error: statusError } = await supabase
        .from("attendance_status")
        .select("id")
        .eq("status", "Checked Out")
        .single();

      if (statusError || !statusData) {
        console.error("Could not fetch 'Checked Out' status ID:", statusError);
        return;
      }

      const { error } = await supabase
        .from("attendance")
        .update({
          check_out_time: new Date().toISOString(),
          status_id: statusData.id,
          check_out_latitude: latitude,
          check_out_longitude: longitude,
        })
        .eq("id", todayRecord.id);

      if (error) {
        alert("Check Out failed");
        console.error(error.message);
      } else {
        alert("Checked Out successfully");
        fetchTodayAttendance();
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg col-span-2">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Time Tracker (Avg of last 5 days)
      </h2>

      <div className="flex bg-gray-100 items-center px-4 py-4 rounded-xl">
        <span className="text-xs font-medium text-gray-600">{formatTime(MIN)}</span>

        <input
          type="range"
          min={MIN}
          max={MAX}
          step={5}
          value={time}
          onChange={(e) => setTime(+e.target.value)}
          style={trackStyle}
          className="mx-4 flex-1 h-2 rounded-lg appearance-none cursor-pointer"
        />

        <span className="text-xs font-medium text-gray-600">{formatTime(MAX)}</span>

        <div className="flex gap-2 ml-4">
          <button
            onClick={handleCheckIn}
            disabled={!!todayRecord && !todayRecord.check_out_time}
            className="py-2 px-4 rounded-lg bg-gray-200 text-gray-600 text-sm font-medium disabled:opacity-50"
          >
            {todayRecord && !todayRecord.check_out_time ? 'Already Checked In' : 'Check In'}
          </button>

          <button
            onClick={handleCheckOut}
            disabled={!todayRecord || !!todayRecord.check_out_time}
            className="py-2 px-4 rounded-lg bg-green-500 text-white text-sm font-medium disabled:opacity-50"
          >
            {todayRecord && !todayRecord.check_out_time ? 'Check Out' : 'No Active Check-in'}
          </button>
        </div>
      </div>

      {/* Display timestamps */}
      <div className="mt-4 text-sm text-gray-700">
        {todayRecord?.check_in_time && (
          <p>
            ✅ Checked in at:{' '}
            <span className="font-semibold">{formatDateTime(todayRecord.check_in_time)}</span>
          </p>
        )}
        {todayRecord?.check_out_time && (
          <p>
            ⛔ Checked out at:{' '}
            <span className="font-semibold">{formatDateTime(todayRecord.check_out_time)}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default TimeTrackerCard;
