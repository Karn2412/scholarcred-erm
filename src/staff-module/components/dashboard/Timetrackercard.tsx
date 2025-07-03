import React, { useState } from 'react';

const TimeTrackerCard: React.FC = () => {
  const MIN = 8 * 60;
  const MAX = 18 * 60;
  const [time, setTime] = useState(15 * 60 + 20);

  const formatTime = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}:${m.toString().padStart(2, '0')}`;
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

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg col-span-2">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Time Tracker (Avg of last 5 days)
      </h2>

      <div className="flex bg-gray-100 items-center px-4">
        {/* Left label */}
        <span className="text-xs font-medium text-gray-600">
          {formatTime(MIN)}
        </span>

        {/* Slider */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={5}
          value={time}
          onChange={e => setTime(+e.target.value)}
          style={trackStyle}
          className="mx-4 flex-1 h-2 rounded-lg appearance-none cursor-pointer"
        />

        {/* Right label */}
        <span className="text-xs font-medium text-gray-600">
          {formatTime(MAX)}
        </span>

        {/* Vertical buttons */}
        <div className="flex flex-col ml-6 space-y-2">
          <button className="py-2 px-4 rounded-lg bg-gray-200 text-gray-600 text-sm font-medium">
            Check In
          </button>
          <button className="py-2 px-4 rounded-lg bg-green-500 text-white text-sm font-medium">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeTrackerCard;

