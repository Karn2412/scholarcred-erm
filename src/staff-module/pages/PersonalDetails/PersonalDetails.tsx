// src/pages/staff/PersonalDetailsPage.tsx
import React, { useState } from 'react';

import StaffSidebar from '../../components/common/StaffSidebar';

import BasicDetailsForm from '../../components/personaldetails/BasicDetailsForm';
import SectionStepper from '../../components/personaldetails/SectionTabs';
import Header from '../../../components/common/Header';


const PersonalDetailsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StaffSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col w-full">
        <Header />

        <main className="p-6">
          <SectionStepper
            currentSection={currentSection}
            onSectionChange={setCurrentSection}
          />

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            {currentSection === 1 && <BasicDetailsForm />}
            {/* {currentSection === 2 && < />}
            {currentSection === 3 && < />} */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PersonalDetailsPage;
