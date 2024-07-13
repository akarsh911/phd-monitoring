import React, { useState, useEffect } from 'react';
import './ThesisExtension.css';
import StudentSideThesisExtension from './StudentSideThesisExtension';
import SupervisorSideThesisExtension from './SupervisorSideThesisExtension';
import HoDSideThesisExtension from './HoDSideThesisExtension';
import DrASideThesisExtension from './DrASideThesisExtension';
import DoRDCSideThesisExtension from './DoRDCSideThesisExtension';
import DirectorSideThesisExtension from './DirectorSideThesisExtension';
import DocComSideThesisExtension from './DocComSideThesisExtension';
const ThesisExtensionForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        regno: '',
        dateOfAdmission: '',
        email:'',
        researchTitle: '',
        mobile: '',
        status: '',
        gender:'',
        supervisors: ['', '', ''],
        hodRecommendation: '',
        hodRemarks: '',
        DrARecommendation: '',
        DrARemarks: '',
        supervisorRecommendation: '',
        supervisorRemarks: '',
        DoRDCRecommendation: '',
        DoRDCRemarks: '',
        DirectorRecommendation:'',
        DirectorRemarks:'',
        fatherName: '', // New field for Father's Name
        dateOfThesisExtension: '', // New field for Date of change of Status
        publicationLink: '', // New field for Details of Publication link
        dateOfSynopsisPresentation: '', // New field for Date of Synopsis Presentation
        receiptNumber: '', // New field for Receipt Number
        receiptDate: '', // New field for Receipt Date
      });
      

 
  useEffect(() => {
    // Fetch initial data from the backend API
    const fetchData = async () => {
      try {
        const response = await fetch('');
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
  })


   

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSupRecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      supervisorRecommendation: e.target.value
    }));
  };

  const handleHodRecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      hodRecommendation: e.target.value
    }));
  };
  
  const handleDrARecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      DrARecommendation: e.target.value
    }));
  };

  const handleDoRDCRecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      DoRDCRecommendation: e.target.value
    }));
  };

  const handleDocComRecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      DrARecommendation: e.target.value
    }));
  };

  const handleDirectorRecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      DirectorRecommendation: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  

  return (
    <div className='extensionBody-div'>
      <div className='extensionform-div'>
        <div className='heading'>
          <h1>Extension for Thesis Submission</h1>
        </div>
        <form onSubmit={handleSubmit} className='extensionSideform'>
        
        <StudentSideThesisExtension formData={formData} handleChange={handleChange} />
          
      {/* Student side ends */}

    

      <SupervisorSideThesisExtension
            formData={formData}
            handleSupRecommendationChange={handleSupRecommendationChange}
          />

     {/* Supervisor Side Ends */}

     <DocComSideThesisExtension
            formData={formData}
            handleDocComRecommendationChange={handleDocComRecommendationChange}
          />
     
     {/* DocCom Side Ends */}
         
     <HoDSideThesisExtension
            formData={formData}
            handleHodRecommendationChange={handleHodRecommendationChange}
          />

     {/* HOD side ends */}
       
     <DrASideThesisExtension
            formData={formData}
            handleDrARecommendationChange={handleDrARecommendationChange}
          />

         {/* DrA side ends */}

         <DoRDCSideThesisExtension
            formData={formData}
            handleDoRDCRecommendationChange={handleDoRDCRecommendationChange}
          />
 
           {/* DoRDC side ends */}



<DirectorSideThesisExtension
            formData={formData}
            handleDirectorRecommendationChange={handleDirectorRecommendationChange}
          />
         
        </form>
      </div>
    </div>
  );
};

export default ThesisExtensionForm;
