import React from "react";

const reimbursementData = [
  {
    id: 1,
    type: "Travel",
    date: "18-05-2025",
    description: "Lorem ipsum dolor sit amet, conse....",
    amount: "500",
    status: "Approved",
  },
  {
    id: 2,
    type: "Supplies",
    date: "19-05-2025",
    description: "Lorem ipsum dolor sit amet, conse....",
    amount: "5196",
    status: "Rejected",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "text-green-600";
    case "Rejected":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

const ReimbursementTable: React.FC = () => {
  return (
    <div className="bg-white mt-8 rounded-2xl shadow-sm p-6">
      <h3 className="text-base font-semibold mb-4 text-gray-800">
        Previous Submissions
      </h3>

      {/* Table Head */}
      <div className="grid grid-cols-7 text-xs font-semibold text-gray-500 px-4 pb-2">
        <div>Sl no</div>
        <div>Type of Reimbursement</div>
        <div>Expense Date</div>
        <div>Description</div>
        <div>Amount</div>
        <div>Proof</div>
        <div>Status</div>
      </div>

      {/* Table Rows */}
      <div className="space-y-3">
        {reimbursementData.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-7 items-center bg-blue-50 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all"
          >
            <div>{item.id}</div>
            <div>{item.type}</div>
            <div>{item.date}</div>
            <div className="truncate">{item.description}</div>
            <div>{item.amount}</div>
            <div>
              <button className="px-3 py-1 bg-blue-200 text-sm rounded-full text-gray-700 flex items-center gap-1">
                View <span role="img" aria-label="eye">👁️</span>
              </button>
            </div>
            <div className={`font-medium ${getStatusColor(item.status)}`}>
              {item.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReimbursementTable;

