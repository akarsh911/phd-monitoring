import React, { useState, useEffect } from 'react';
import './ThesisSub.css';
import StudentSideThesis from './StudentSideThesis';
import SupervisorSideThesis from './SupervisorSideThesis';
import HoDSideThesis from './HoDSideThesis';
import DrASideThesis from './DrASideThesis';
import DoRDCSideThesis from './DoRDCSideThesis';
const ThesisSubForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        regno: '',
        dateOfAdmission: '',
        email:'',
        researchTitle: '',
        mobile: '',
        status: '',
        supervisors: ['', '', ''],
        hodRecommendation: '',
        hodRemarks: '',
        DrARecommendation: '',
        DrARemarks: '',
        supervisorRecommendation: '',
        supervisorRemarks: '',
        DoRDCRecommendation: '',
        DoRDCRemarks: '',
        fatherName: '', // New field for Father's Name
        dateOfStatusChange: '', // New field for Date of change of Status
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  

  return (
    <div className='extensionBody-div'>
      <div className='extensionform-div'>
        <div className='heading'>
          <h1>Thesis Submission Form</h1>
        </div>
        <form onSubmit={handleSubmit} className='extensionSideform'>
        
        <StudentSideThesis formData={formData} handleChange={handleChange} />
          
      {/* Student side ends */}

    

      <SupervisorSideThesis
            formData={formData}
            handleSupRecommendationChange={handleSupRecommendationChange}
          />

     {/* Supervisor Side Ends */}
         
     <HoDSideThesis
            formData={formData}
            handleHodRecommendationChange={handleHodRecommendationChange}
          />

     {/* HOD side ends */}
       
     <DrASideThesis
            formData={formData}
            handleDrARecommendationChange={handleDrARecommendationChange}
          />

         {/* DrA side ends */}

         <DoRDCSideThesis
            formData={formData}
            handleDoRDCRecommendationChange={handleDoRDCRecommendationChange}
          />
         
        </form>
      </div>
    </div>
  );
};

export default ThesisSubForm;
