import React, { useState } from 'react';
import StaffSidebar from '../../components/common/StaffSidebar';
import BasicDetailsForm from '../../components/personaldetails/BasicDetailsForm';
import SectionStepper from '../../components/personaldetails/SectionTabs';
import Header from '../../../components/common/Header';
import BankingDetailsForm from '../../components/personaldetails/BankingDetailForm';
import DocumentUploadForm from '../../components/personaldetails/DocumentUploadForm';
import { supabase } from '../../../supabaseClient';

const PersonalDetailsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);

  // Step-wise form states
  const [basicDetails, setBasicDetails] = useState<any>({});
  const [bankingDetails, setBankingDetails] = useState<any>({});
  const [documents, setDocuments] = useState<any>({});

  // 👇 Final Submit Handler
  const handleSubmit = async () => {
    try {
      // 1. Upload each file to Supabase Storage
      const uploadFile = async (file: File, path: string) => {
        const { data, error } = await supabase.storage
          .from('documents')
          .upload(path, file, {
            cacheControl: '3600',
            upsert: true,
          });
        if (error) throw error;
        return data?.path;
      };

      const panImagePath = documents.panCard && await uploadFile(documents.panCard, `pan/${Date.now()}_${documents.panCard.name}`);
      const aadhaarImagePath = documents.aadhaarCard && await uploadFile(documents.aadhaarCard, `aadhaar/${Date.now()}_${documents.aadhaarCard.name}`);
      const blankChequePath = documents.blankCheque && await uploadFile(documents.blankCheque, `cheque/${Date.now()}_${documents.blankCheque.name}`);

      // 2. Insert into Supabase table
      const { error } = await supabase.from('user_details').insert({
        ...basicDetails,
        ...bankingDetails,
        pan_image_url: panImagePath,
        aadhaar_image_url: aadhaarImagePath,
        cheque_image_url: blankChequePath,
        created_at: new Date(),
      });

      if (error) throw error;

      alert('Submitted successfully!');
    } catch (error) {
      console.error('Submit Error:', error);
      alert('Submission failed.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StaffSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col w-full">
        <Header />

        <main className="p-6 bg-blue-50">
          <div className="bg-white p-4">
            <SectionStepper currentSection={currentSection} onSectionChange={setCurrentSection} />

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              {currentSection === 1 && <BasicDetailsForm formData={basicDetails} setFormData={setBasicDetails} />}
              {currentSection === 2 && <BankingDetailsForm formData={bankingDetails} setFormData={setBankingDetails} />}
              {currentSection === 3 && <DocumentUploadForm formData={documents} setFormData={setDocuments} />}
            </div>

            {/* Submit Button */}
            {currentSection === 3 && (
              <div className="mt-6 text-right">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
                >
                  Submit Details
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PersonalDetailsPage;
