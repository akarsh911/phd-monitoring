import React, { useState, useEffect } from 'react';
import './SupAllocation.css';
import StudentSideSupAllocation from './StudentSideSupAllocation';
// import PhDCoordSideSupAllocation from './PhDCoordSideSupAllocation';
// import HoDSideSupAllocation from './HoDSideSupAllocation';

const SupAllocation = () => {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    regno: '',
    gender: '',
    admissionDate: '',
    regno: '',
    department: '',
    semester: '',
    session: '',
    cgpa: '',
    chairman: '',
    supervisor: '',
    experts: ['', '', ''],
    nominees: ['', '', ''],
    chairmanExperts: [''],
    hodRecommendation: '',
    supervisorRecommendation: '',
    expertfromIRB: '',
    nomineeDoRDC: '',
    previousQuantumSupAllocation: '',
    increaseInQuantumSupAllocation: '',
    totalQuantumSupAllocation: '',
  });

  const [options, setOptions] = useState({
    experts: [],
    nominees: [],
    chairmanExpertsOptions: [] 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(''); // API endpoint
        const data = await response.json();
        setFormData((prevData) => ({ ...prevData, ...data }));

        setOptions({
          experts: data.expertsOptions || [],
          nominees: data.nomineesOptions || [],
          chairmanExpertsOptions: data.chairmanExpertsOptions || [] 
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleExpertChange = (index, value) => {
    setFormData((prevData) => {
      const newExperts = [...prevData.experts];
      newExperts[index] = value;
      return { ...prevData, experts: newExperts };
    });
  };

  const handleNomineeChange = (index, value) => {
    setFormData((prevData) => {
      const newNominees = [...prevData.nominees];
      newNominees[index] = value;
      return { ...prevData, nominees: newNominees };
    });
  };

  const handleChairmanExpertChange = (index, value) => {
    setFormData((prevData) => {
      const newChairmanExperts = [...prevData.chairmanExperts];
      newChairmanExperts[index] = value;
      return { ...prevData, chairmanExperts: newChairmanExperts };
    });
  };

  const addChairmanExpert = () => {
    setFormData((prevData) => ({
      ...prevData,
      chairmanExperts: [...prevData.chairmanExperts, '']
    }));
  };

  const handleHodRecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      hodRecommendation: e.target.value
    }));
  };

  const handlePhDCoordRecommendationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      supervisorRecommendation: value,
    }));
  };

  const handleDocComRecommendationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDoRDCRecommendationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDRARecommendationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData((prevData) => ({ ...prevData, date: today }));

    const fetchData = async () => {
      try {
        const response = await fetch(''); // API 
        const data = await response.json();
        setFormData((prevData) => ({ ...prevData, ...data }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className='studentSidebody-div'>
      <div className='studentSideform-div'>
        <div className='heading'>
          <h1>Supervisor Allocation</h1>
        </div>
        <form onSubmit={handleSubmit} className='studentSideform'>
          
        <StudentSideSupAllocation formData={formData} />


          {/* STUDENT SIDE ENDS */}

          {/* <PhDCoordSideSupAllocation formData={formData} handlePhDCoordRecommendationChange={handlePhDCoordRecommendationChange} /> */}
         
     {/* PhD Coordinator SIDE ENDS */}
     
     

          {/* <HoDSideSupAllocation
            formData={formData}
            handleHodRecommendationChange={handleHodRecommendationChange}
          /> */}
{/* HOD SIDE ENDS */}


        </form>
      </div>
    </div>
  );
};

export default SupAllocation;
