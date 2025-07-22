import React from 'react';

interface BasicDetailsFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

const BasicDetailsForm: React.FC<BasicDetailsFormProps> = ({ formData, setFormData }) => {
  const pillInput =
    'w-full px-4 py-2 border-2 border-blue-400 rounded-full focus:outline-none focus:border-blue-500';

  const pillSelect =
    'w-full px-4 py-2 border-2 border-blue-400 rounded-full bg-white focus:outline-none focus:border-blue-500 appearance-none';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-h-screen overflow-y-auto">
      <form className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="date_of_birth"
              placeholder="dd-mm-yyyy"
              className={pillInput}
              value={formData.date_of_birth || ''}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="age"
              placeholder="00"
              className={pillInput}
              value={formData.age || ''}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PAN <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="pan_no"
              placeholder="XXXXXXXXXX"
              className={pillInput}
              value={formData.pan_no || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Father's Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="father_name"
              placeholder="Father's Name"
              className={pillInput}
              value={formData.father_name || ''}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Differently Abled Type
            </label>
            <select
              name="differently_abled_type"
              className={pillSelect}
              value={formData.differently_abled_type || 'Not'}
              onChange={handleChange}
            >
              <option>Not</option>
              <option>Visually Impaired</option>
              <option>Hearing Impaired</option>
              <option>Physically Handicapped</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Personal Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="personal_email"
              placeholder="xxxx@gmail.com"
              className={pillInput}
              value={formData.personal_email || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Address Row 1 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address Line 1
          </label>
          <input
            type="text"
            name="address_line1"
            placeholder="Address line 1"
            className={pillInput}
            value={formData.address_line1 || ''}
            onChange={handleChange}
          />
        </div>

        {/* Address Row 2 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address Line 2
          </label>
          <input
            type="text"
            name="address_line2"
            placeholder="Address line 2"
            className={pillInput}
            value={formData.address_line2 || ''}
            onChange={handleChange}
          />
        </div>

        {/* City, State, Pincode */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              className={pillInput}
              value={formData.city || ''}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <select
              name="state"
              className={pillSelect}
              value={formData.state || ''}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              <option>Kerala</option>
              <option>Tamil Nadu</option>
              <option>Karnataka</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              className={pillInput}
              value={formData.pincode || ''}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicDetailsForm;
