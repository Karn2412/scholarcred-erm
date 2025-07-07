import React from 'react';


const ReimbursementRequestCard: React.FC = () => {

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Reimbursement Request
      </h2>

     <div className='bg-gray-100 p-6'>
       <button className="inline-flex items-center bg-blue-200 text-blue-800 text-sm font-medium px-4 py-2 rounded-lg mb-4">
        Requests
        <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600 text-xs font-bold">
          2
        </span>
      </button>

      <div className="flex items-center justify-between text-sm text-gray-700">
        <p>2 requests need admin approval</p>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-blue-600 hover:underline">
            View Now
          </a>
          <button className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
      </div>
     </div>
    

    </div>
  );
};

export default ReimbursementRequestCard;
