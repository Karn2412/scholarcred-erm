// src/pages/AddEmployeePage.tsx
import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import { FaBars } from 'react-icons/fa';
import AddEmployeeStepper from '../../components/adminEmployee/addemployee/AddEmployeeStepper';
import AddEmployeeForm from '../../components/adminEmployee/addemployee/AddEmployeeForm';
import SalaryDetails from '../../components/adminEmployee/addemployee/SalaryDetails';
import AssetAllocationForm from '../../components/adminEmployee/addemployee/AssetAllocationForm';
import PaymentInformationForm from '../../components/adminEmployee/addemployee/PaymentInformationForm';

const AddEmployeePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AddEmployeeForm />;
      case 2:
        return <SalaryDetails />;
      // Future: Add other step components here
      case 3:
        return <AssetAllocationForm />;
      case 4:
        return <PaymentInformationForm />;
        
        default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden flex justify-between items-center bg-white p-4 border-b border-gray-200">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-700 text-xl">
            <FaBars />
          </button>
          <h2 className="text-lg font-semibold">Add Employee</h2>
        </div>

        {/* Top Header */}
        <Header  />

        {/* Main Content */}
        <main className="p-6 overflow-auto space-y-6">
          <div className="bg-white p-6 rounded-md shadow-sm">
            <AddEmployeeStepper 
             onStepChange={(step) => setCurrentStep(step)}
            currentStep={currentStep} />

            {/* Dynamic Step Form */}
            {renderStep()}

            {/* Navigation Buttons
            <div className="flex justify-end mt-6 gap-4">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
                >
                  Back
                </button>
              )}
              {currentStep < 4 && (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Next
                </button>
              )}
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddEmployeePage;
