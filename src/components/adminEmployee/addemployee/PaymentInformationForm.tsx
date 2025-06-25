import React, { useState } from 'react';
import { FaUniversity, FaMoneyCheckAlt, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';

const PaymentInformationForm: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('Bank Transfer');

  const handleSelect = (method: string) => {
    setSelectedMethod(method);
  };

  const paymentMethods = [
    {
      title: 'Bank Transfer (manual process)',
      description: 'Download Bank Advice and process the payment through your bank',
      value: 'Bank Transfer',
      icon: <FaUniversity className="text-blue-500 text-2xl" />,
    },
    {
      title: 'Cheque',
      description: 'Download Bank Advice and process the payment through your bank',
      value: 'Cheque',
      icon: <FaMoneyCheckAlt className="text-blue-500 text-2xl" />,
    },
    {
      title: 'Cash',
      description: 'Download Bank Advice and process the payment through your bank',
      value: 'Cash',
      icon: <FaMoneyBillWave className="text-blue-500 text-2xl" />,
    },
  ];

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm max-w-3xl mx-auto ms-4">
      <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
      <p className="text-sm text-gray-600 mb-4">Choose which payment method is preferred:</p>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.value}
            className={`flex items-center w-3/4 justify-between p-4 rounded-md  cursor-pointer ${
              selectedMethod === method.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-b-blue-200'
            }`}
            onClick={() => handleSelect(method.value)}
          >
            {/* Left Side: Icon + Details */}
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-full border border-blue-300">
                {method.icon}
              </div>
              <div>
                <div className="font-medium text-gray-800">{method.title}</div>
                <div className="text-sm text-gray-500">{method.description}</div>
              </div>
            </div>

            {/* Right Side: Check Circle */}
            <div>
              {selectedMethod === method.value ? (
                <FaCheckCircle className="text-blue-600 text-xl" />
              ) : (
                <div className="h-5 w-5 rounded-full border border-gray-400"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md ms-100 mt-6 ">
        Select Preference
      </button>
    </div>
  );
};

export default PaymentInformationForm;
