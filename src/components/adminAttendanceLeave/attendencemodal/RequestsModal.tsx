import React, { useState } from "react";

const RequestsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Regularization Requests");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
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
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === tab
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
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="bg-[#f1f3ff] rounded-lg p-4 mb-4 flex justify-between items-center"
            >
              <div className="flex-1 text-sm space-y-1">
                <div className="flex justify-between">
                  <p>
                    <span className="font-semibold">Day :</span> Friday
                  </p>
                  <div className="flex-col gap-1.5">
                    <div className="flex items-center me-60">
                    <span className="font-semibold">Attendance :</span>&nbsp;8:35
                    <span className="relative mx-2 w-40 h-1 bg-orange-400 rounded-full">
                      <span className="absolute left-0 top-[-2px] w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span className="absolute right-0 top-[-2px] w-2 h-2 bg-orange-500 rounded-full"></span>
                    </span>
                    --
            
                  </div>
                  <p className="" style={{marginTop:"30px"}}>
                  
                </p>
                  </div>
                </div>
              <div className="flex justify-between">
  <p>
    <span className="font-semibold">Date :</span> 22-05-2025
  </p>
  <p className="me-90">
    <span className="font-semibold">Reason :</span> Forgot to Checkout
  </p>
</div>

              </div>

              <div className="flex gap-2 ml-4">
                <button className="bg-green-500 text-white text-xs px-4 py-1 rounded hover:bg-green-600">
                  Approve
                </button>
                <button className="bg-red-500 text-white text-xs px-4 py-1 rounded hover:bg-red-600">
                  Reject
                </button>
              </div>
            </div>
          ))}
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
