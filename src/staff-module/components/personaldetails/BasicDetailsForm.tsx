import React from 'react';

const BasicDetailsForm: React.FC = () => {
  const pillInput =
    'w-full px-4 py-2 border-2 border-blue-400 rounded-full focus:outline-none focus:border-blue-500';

  const pillSelect =
    'w-full px-4 py-2 border-2 border-blue-400 rounded-full bg-white focus:outline-none focus:border-blue-500 appearance-none';

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-h-screen overflow-y-auto">
      {/* Section Title */}
      

      <form className="space-y-6">

        {/* Row 1: Date of Birth, Age, PAN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="dd--mm--yyyy"
                className={`${pillInput} pr-10`}
              />
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age <span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="00" className={pillInput} />
          </div>

          {/* PAN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PAN <span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="XXXXXXXXXX" className={pillInput} />
          </div>
        </div>

        {/* Row 2: Father's Name, Differently Abled Type, Personal Email */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Father's Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Father's Name <span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="XXXXXXXXXX" className={pillInput} />
          </div>

          {/* Differently Abled Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Differently Abled Type
            </label>
            <div className="relative">
              <select className={pillSelect}>
                <option>Not</option>
                <option>Visually Impaired</option>
                <option>Hearing Impaired</option>
                <option>Physically Handicapped</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Personal Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Personal Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="xxxx@gmail.com"
              className={pillInput}
            />
          </div>
        </div>

        {/* Row 3: Address Line 1 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address Line 1
          </label>
          <input
            type="text"
            placeholder="Address line 1"
            className={pillInput}
          />
        </div>

        {/* Row 4: Address Line 2 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address Line 2
          </label>
          <input
            type="text"
            placeholder="Address line 2"
            className={pillInput}
          />
        </div>

        {/* Row 5: City, State, Pincode */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input type="text" placeholder="City" className={pillInput} />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <div className="relative">
              <select className={pillSelect}>
                <option>Select State</option>
                <option>Kerala</option>
                <option>Tamil Nadu</option>
                <option>Karnataka</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pincode
            </label>
            <input type="text" placeholder="Pincode" className={pillInput} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicDetailsForm;
