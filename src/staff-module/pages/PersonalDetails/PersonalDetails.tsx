import React, { useEffect, useState } from 'react';
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
  const [usersdocuments, setDocuments] = useState<any>({
    panCardUrl: '',
    aadhaarCardUrl: '',
    blankChequeUrl: '',
    documents: [],
  });

 const handleSubmit = async () => {
  try {
    const { data: authUser } = await supabase.auth.getUser();
    const userId = authUser?.user?.id;

    if (!userId) {
      alert("User not logged in");
      return;
    }

    const uploadFile = async (file: File, path: string) => {
      const { data, error } = await supabase.storage
        .from('usersdocuments')
        .upload(path, file, { cacheControl: '3600', upsert: true });
      if (error) throw error;
      return data?.path
        ? supabase.storage.from('usersdocuments').getPublicUrl(data.path).data.publicUrl
        : null;
    };

    const panImagePath = usersdocuments.panCard instanceof File
      ? await uploadFile(usersdocuments.panCard, `pan/${Date.now()}_${usersdocuments.panCard.name}`)
      : usersdocuments.panCardUrl;

    const aadhaarImagePath = usersdocuments.aadhaarCard instanceof File
      ? await uploadFile(usersdocuments.aadhaarCard, `aadhaar/${Date.now()}_${usersdocuments.aadhaarCard.name}`)
      : usersdocuments.aadhaarCardUrl;

    const blankChequePath = usersdocuments.blankCheque instanceof File
      ? await uploadFile(usersdocuments.blankCheque, `cheque/${Date.now()}_${usersdocuments.blankCheque.name}`)
      : usersdocuments.blankChequeUrl;

   const documentList = [
  { name: 'Upload PAN Card', url: panImagePath },
  { name: 'Upload Aadhaar Card', url: aadhaarImagePath },
  { name: 'Upload Blank Cheque', url: blankChequePath },
  ...(usersdocuments.documents || []).map((doc: any) => {
    if (doc.file instanceof File) {
      const path = `documents/${Date.now()}_${doc.file.name}`;
      return uploadFile(doc.file, path).then((url) => ({ name: doc.name, url }));
    }
    return Promise.resolve({ name: doc.name, url: doc.url });
  }),
];

const uploadedDocs = await Promise.all(documentList);

    const { error } = await supabase.from('users_personal_details').upsert({
      id: userId,
      date_of_birth: basicDetails.date_of_birth,
      age: basicDetails.age,
      pan_no: basicDetails.pan_no,
      fathers_name: basicDetails.father_name,
      personal_email: basicDetails.personal_email,
      address_1: basicDetails.address_line1,
      address_2: basicDetails.address_line2,
      differently_abled: basicDetails.differently_abled_type,
      city: basicDetails.city,
      state: basicDetails.state,
      pincode: basicDetails.pincode,
      full_name: bankingDetails.name,
      account_number: bankingDetails.accountNumber,
      ifsc_code: bankingDetails.ifscCode,
      bank_name: bankingDetails.bankName,
      branch_name: bankingDetails.branchName,
      documents: documentList,
    }, { onConflict: 'id' });

    if (error) throw error;

    alert('Details submitted/updated successfully!');
  } catch (error) {
    console.error('Submit Error:', error);
    alert('Submission failed.');
  }
};


  useEffect(() => {
    const fetchPersonalDetails = async () => {
      const { data: authUser } = await supabase.auth.getUser();
      const userId = authUser?.user?.id;

      if (!userId) return;

      const { data, error } = await supabase
        .from('users_personal_details')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setBasicDetails({
          date_of_birth: data.date_of_birth,
          age: data.age,
          pan_no: data.pan_no,
          father_name: data.fathers_name,
          personal_email: data.personal_email,
          address_line1: data.address_1,
          address_line2: data.address_2,
          differently_abled_type: data.differently_abled,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
        });

        setBankingDetails({
          accountNumber: data.account_number,
          name: data.full_name,
          ifscCode: data.ifsc_code,
          bankName: data.bank_name,
          branchName: data.branch_name,
        });

        setDocuments({
          panCardUrl: data.pan_img,
          aadhaarCardUrl: data.aadhar_img,
          blankChequeUrl: data.bank_img,
          documents: data.documents || [], // ✅ load JSONB documents
        });

        console.log('Fetched Personal Details:', data);
      }

      if (error) console.error('Fetch personal details error:', error);
    };

    fetchPersonalDetails();
  }, []);

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
              {currentSection === 3 && <DocumentUploadForm formData={usersdocuments} setFormData={setDocuments} />}
            </div>

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
