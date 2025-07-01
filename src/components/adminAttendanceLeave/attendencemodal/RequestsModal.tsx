import React, { useState } from "react";

const RequestsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Regularization Requests");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Sample data for different request types
  const regularizationData = [
    {
      day: "Friday",
      date: "22-05-2025",
      attendance: "8:35",
      reason: "Forgot to Checkout",
      status: "pending"
    },
    {
      day: "Thursday",
      date: "21-05-2025",
      attendance: "9:15",
      reason: "Network Issue",
      status: "pending"
    },
    {
      day: "Wednesday",
      date: "20-05-2025",
      attendance: "8:45",
      reason: "System Error",
      status: "pending"
    }
  ];

  const leaveData = [
    {
      day: "Friday",
      date: "22-05-2025",
      type: "Sick Leave",
      duration: "Full Day",
      attendance: "--",
      reason: "Hospital Visit",
      status: "pending"
    },
    {
      day: "Friday",
      date: "22-05-2025",
      type: "Sick Leave",
      duration: "Full Day",
      attendance: "--",
      reason: "Hospital Visit",
      status: "pending"
    },
    {
      day: "Friday",
      date: "22-05-2025",
      type: "Sick Leave",
      duration: "Full Day",
      attendance: "--",
      reason: "Hospital Visit",
      status: "approved"
    }
  ];

  const wfhData = [
    {
      day: "Monday",
      date: "25-05-2025",
      type: "Work From Home",
      duration: "Full Day",
      attendance: "--",
      reason: "Personal Work",
      status: "pending"
    },
    {
      day: "Tuesday",
      date: "26-05-2025",
      type: "Work From Home",
      duration: "Half Day",
      attendance: "--",
      reason: "Home Maintenance",
      status: "pending"
    },
     {
      day: "Tuesday",
      date: "26-05-2025",
      type: "Work From Home",
      duration: "Half Day",
      attendance: "--",
      reason: "Home Maintenance",
      status: "approved"
    }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case "Leave Requests":
        return leaveData;
      case "Work From Home Requests":
        return wfhData;
      default:
        return regularizationData;
    }
  };

  const renderRegularizationRequest = (item: any, index: number) => (
    <div
      key={index}
      className="bg-[#f1f3ff] rounded-lg p-4 mb-4 flex justify-between items-center h-20"
    >
      <div className="flex-1 text-sm">
        {/* Row 1 - Day and Attendance */}
        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-semibold">Day :</span> {item.day}
          </p>
          <div className="flex items-center">
            <span className="font-semibold">Attendance :</span>&nbsp;{item.attendance}
            <span className="relative mx-2 w-40 h-1 bg-orange-400 rounded-full">
              <span className="absolute left-0 top-[-2px] w-2 h-2 bg-orange-500 rounded-full"></span>
              <span className="absolute right-0 top-[-2px] w-2 h-2 bg-orange-500 rounded-full"></span>
            </span>
            --
          </div>
        </div>

        {/* Row 2 - Date and Reason */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          <p>
            <span className="font-semibold">Date :</span> {item.date}
          </p>
          <p>
            <span className="font-semibold">Reason :</span> {item.reason}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 ml-4">
        <button className="bg-green-500 text-white text-xs px-4 py-1 rounded hover:bg-green-600">
          Approve
        </button>
        <button className="bg-red-500 text-white text-xs px-4 py-1 rounded hover:bg-red-600">
          Reject
        </button>
      </div>
    </div>
  );



  const renderLeaveRequest = (item: any, index: number) => (
    <div
      key={index}
      className="bg-[#f1f3ff] rounded-lg p-4 mb-4 flex justify-between items-center h-20"
    >
      <div className="flex-1 text-sm grid grid-cols-4 gap-4">

        {/* Column 1: Day (top) + Date (below) */}
        <div className="flex flex-col">
          <p>
            <span className="font-semibold">Day :</span> {item.day}
          </p>
          <p>
            <span className="font-semibold">Date :</span> {item.date}
          </p>
        </div>

        {/* Column 2: Type (top) + Duration (below) */}
        <div className="flex flex-col">
          <p>
            <span className="font-semibold">Type :</span> {item.type}
          </p>
          <p>
            <span className="font-semibold">Duration :</span> {item.duration}
          </p>
        </div>

        {/* Column 3: Attendance + Progress Bar + Reason (below) */}
        <div className="flex flex-col">
          <div className=" flex items-center">
            <span className="font-semibold whitespace-nowrap">Attendance :</span>
            <span className="whitespace-nowrap"> -- </span>
            <span className="relative mx-2 w-40 h-1 bg-blue-400 rounded-full">
              <span className="absolute left-0 top-[-2px] w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="absolute right-0 top-[-2px] w-2 h-2 bg-blue-500 rounded-full"></span>
            </span>
            <span className="whitespace-nowrap"> -- </span>
          </div>

          <p>
            <span className="font-semibold">Reason :</span> {item.reason}
          </p>
        </div>

        {/* Column 4: Buttons */}
        <div className="flex gap-2 items-center">
          {item.status === "approved" ? (
            <span className="text-green-600 text-sm font-medium">Approved</span>
          ) : (
            <>
              <button className="bg-green-500 text-white text-xs px-4 py-1 rounded hover:bg-green-600">
                Approve
              </button>
              <button className="bg-red-500 text-white text-xs px-4 py-1 rounded hover:bg-red-600">
                Reject
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );


  const renderWFHRequest = (item: any, index: number) => (
   <div
      key={index}
      className="bg-[#f1f3ff] rounded-lg p-4 mb-4 flex justify-between items-center h-20"
    >
      <div className="flex-1 text-sm grid grid-cols-4 gap-4">

        {/* Column 1: Day (top) + Date (below) */}
        <div className="flex flex-col">
          <p>
            <span className="font-semibold">Day :</span> {item.day}
          </p>
          <p>
            <span className="font-semibold mt-5">Date :</span> {item.date}
          </p>
        </div>

        {/* Column 2: Type (top) + Duration (below) */}
        <div className="flex flex-col">
          <p>
            <span className="font-semibold">Location :</span> {item.type}
          </p>
          <p>
            <span className="font-semibold">Duration :</span> {item.duration}
          </p>
        </div>

        {/* Column 3: Attendance + Progress Bar + Reason (below) */}
        <div className="flex flex-col">
          <div className=" flex items-center">
            <span className="font-semibold whitespace-nowrap">Attendance :</span>
            <span className="whitespace-nowrap"> -- </span>
            <span className="relative mx-2 w-40 h-1 bg-green-400 rounded-full">
              <span className="absolute left-0 top-[-2px] w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="absolute right-0 top-[-2px] w-2 h-2 bg-green-500 rounded-full"></span>
            </span>
            <span className="whitespace-nowrap"> -- </span>
          </div>

          <p>
            <span className="font-semibold">Reason :</span> {item.reason}
          </p>
        </div>

        {/* Column 4: Buttons */}
        <div className="flex gap-2 items-center">
          {item.status === "approved" ? (
            <span className="text-grayl-600 text-sm font-medium">Approved</span>
          ) : (
            <>
              <button className="bg-green-500 text-white text-xs px-4 py-1 rounded hover:bg-green-600">
                Approve
              </button>
              <button className="bg-red-500 text-white text-xs px-4 py-1 rounded hover:bg-red-600">
                Reject
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );

  const renderRequest = (item: any, index: number) => {
    switch (activeTab) {
      case "Leave Requests":
        return renderLeaveRequest(item, index);
      case "Work From Home Requests":
        return renderWFHRequest(item, index);
      default:
        return renderRegularizationRequest(item, index);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      {/* Modal Box with Inside Blur */}
      <div className="relative rounded-2xl w-full max-w-5xl p-6 shadow-xl backdrop-blur-md bg-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
        >
          ✖
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-semibold mb-4">Requests</h2>

        {/* Tabs */}
        <div className="flex space-x-4 mb-4">
          {["Regularization Requests", "Leave Requests", "Work From Home Requests"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === tab
                  ? "bg-blue-100 text-blue-600 border border-blue-400"
                  : "bg-gray-100 text-gray-600"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Request Content */}
        <div className="bg-[#eeeeee] p-4 rounded-xl max-h-[400px] overflow-y-auto">
          {getCurrentData().map((item, index) => renderRequest(item, index))}
        </div>

        {/* Footer Buttons */}
        <div className="mt-4 flex justify-center gap-4">
          <button className="bg-green-500 text-white text-sm px-6 py-2 rounded hover:bg-green-600">
            Approve All
          </button>
          <button className="bg-red-500 text-white text-sm px-6 py-2 rounded hover:bg-red-600">
            Reject All
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestsModal;