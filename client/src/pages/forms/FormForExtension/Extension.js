import React, { useState, useEffect } from 'react';
import './Extension.css';
import StudentSideExtension from './StudentSideExtension';
import SupervisorSideExtension from './SupervisorSideExtension';
import HodSideExtension from './HodSideExtension';
import DrASideExtension from './DrASideExtension';
const ResearchProposalExtensionForm = () => {
  const [formData, setFormData] = useState({
   name:'',
   regno:'',
    dateOfAdmission: '',
    department: '',
    researchTitle: '',
    mobile: '',
    status: '',
    coursework: '',
    supervisors: ['', '', ''],
    extensionEarlier: '',
    extensionPeriodStart: '',
    extensionPeriodEnd: '',
    extensionReason: '',
    hodRecommendation: '',
    hodRemarks: '',
    DrARecommendation: '',
    DrARemarks: '',
    supervisorRecommendations: [
        { recommended: false, notRecommended: false, remarks: '' },
        { recommended: false, notRecommended: false, remarks: '' },
        { recommended: false, notRecommended: false, remarks: '' }
      ]
  });

  const [supervisorProfile, setSupervisorProfile] = useState(1);

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


   const fetchSupervisorProfile = async () => {
      try {
        const response = await fetch('/api/getSupervisorProfile'); // replace with actual endpoint
        const profile = await response.json();
        setSupervisorProfile(profile);
      } catch (error) {
        console.error('Error fetching supervisor profile:', error);
      }
    };

    fetchData();
    fetchSupervisorProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSupervisorChange = (index, field, value) => {
    const updatedSupervisors = [...formData.supervisorRecommendations];
    updatedSupervisors[index][field] = value;
    setFormData({ ...formData, supervisorRecommendations: updatedSupervisors });
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
      hodRecommendation: e.target.value
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
          <h1>Extension for submission of research proposal</h1>
        </div>
        <form onSubmit={handleSubmit} className='extensionSideform'>
        
        <StudentSideExtension formData={formData} handleChange={handleChange} />
          
      {/* Student side ends */}

    

      <SupervisorSideExtension loggedInSupervisor="Supervisor 1" />

     {/* Supervisor Side Ends */}
         
     <HodSideExtension
            formData={formData}
            handleHodRecommendationChange={handleHodRecommendationChange}
          />

     {/* HOD side ends */}
       
     <DrASideExtension
            formData={formData}
            handleDrARecommendationChange={handleDrARecommendationChange}
          />


         
        </form>
      </div>
    </div>
  );
};

export default ResearchProposalExtensionForm;
