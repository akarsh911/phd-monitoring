import React, { useState, useEffect } from 'react';
import './StatusChange.css';
import StudentSideStatusChange from './StudentSideStatusChange';
import SupervisorSideStatusChange from './SupervisorSideStatusChange';
import HoDSideStatusChange from './HoDSideStatusChange';
import DrASideStatusChange from './DrASideStatusChange';
import DoRDCSideStatusChange from './DoRDCSideStatusChange';
import DirectorSideStatusChange from './DirectorSideStatusChange';
const StatusChangeForm = () => {
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
        DirectorRecommendation:'',
        DirectorRemarks:'',
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
          <h1>Application for Change of Status</h1>
        </div>
        <form onSubmit={handleSubmit} className='extensionSideform'>
        
        <StudentSideStatusChange formData={formData} handleChange={handleChange} />
          
      {/* Student side ends */}

    

      <SupervisorSideStatusChange
            formData={formData}
            handleSupRecommendationChange={handleSupRecommendationChange}
          />

     {/* Supervisor Side Ends */}
         
     <HoDSideStatusChange
            formData={formData}
            handleHodRecommendationChange={handleHodRecommendationChange}
          />

     {/* HOD side ends */}
       
     <DrASideStatusChange
            formData={formData}
            handleDrARecommendationChange={handleDrARecommendationChange}
          />

         {/* DrA side ends */}

         <DoRDCSideStatusChange
            formData={formData}
            handleDoRDCRecommendationChange={handleDoRDCRecommendationChange}
          />
 
           {/* DoRDC side ends */}


{/* if second extension */}
<DirectorSideStatusChange
            formData={formData}
            handleDirectorRecommendationChange={handleDirectorRecommendationChange}
          />
         
        </form>
      </div>
    </div>
  );
};

export default StatusChangeForm;
