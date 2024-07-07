import React, { useState, useEffect } from 'react';
import './SupervisorChange.css';
import StudentSideSupervisorChange from './StudentSideSupervisorChange';
// import PHDCoordinatorSideSupervisorChange from './PHDCoordinatorSideSupervisorChange';
import HoDSideSupervisorChange from './HoDSideSupervisorChange';
import DoRDCSideSupervisorChange from './DoRDCSideSupervisorChange';
import DrASideSupervisorChange from './DrASideSupervisorChange';




const SupervisorChange = () => {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    regno: '',
    gender: '',
    admissionDate: '',
    regno: '',
    irbCompleted: '',
    researchTitle: '',
    supervisorsAllocated: '',
    dateAllocated: '',
    supervisorChange: '',
    reasonForChange: '',
    preference: '',
    selectedSupervisors: [], // Holds the selected supervisors
  newSupervisors: [] ,// Holds the names of the new supervisors
    
    supervisors: ['Sup 1', 'Sup 2', 'Sup 3'],
  
    HoDRecommendation: ''
   
    
  });
const handleSelectedSupervisorChange = (event) => {
    const supervisorName = event.target.value;
  
    // Check if supervisorName is already in selectedSupervisors
    const isSelected = formData.selectedSupervisors.includes(supervisorName);
  
    if (event.target.checked && !isSelected) {
      // Add supervisorName to selectedSupervisors if checked
      const updatedSelectedSupervisors = [...formData.selectedSupervisors, supervisorName];
      setFormData({
        ...formData,
        selectedSupervisors: updatedSelectedSupervisors,
      });
    } else if (!event.target.checked && isSelected) {
      // Remove supervisorName from selectedSupervisors if unchecked
      const updatedSelectedSupervisors = formData.selectedSupervisors.filter(
        (name) => name !== supervisorName
      );
      setFormData({
        ...formData,
        selectedSupervisors: updatedSelectedSupervisors,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(''); // API endpoint
        const data = await response.json();
        setFormData((prevData) => ({ ...prevData, ...data }));

       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  
  



  const handleHoDRecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      HoDRecommendation: e.target.value
    }));
  };

  const handlePHDCoordinatorRecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      HoDRecommendation: e.target.value
    }));
  };


  const handleDoRDCRecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      HoDRecommendation: e.target.value
    }));
  };


  const handleDRARecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      HoDRecommendation: e.target.value
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
          <h1>Request for Change of Supervisor</h1>
        </div>
        <form onSubmit={handleSubmit} className='studentSideform'>
          
        <StudentSideSupervisorChange formData={formData} handleChange={handleChange} 
        handleSelectedSupervisorChange={handleSelectedSupervisorChange}/>


          {/* STUDENT SIDE ENDS */}

     
     {/* <PHDCoordinatorSideSupervisorChange formData={formData} handlePHDCoordinatorRecommendationChange={handlePHDCoordinatorRecommendationChange} />

PHD Coordinator Side Ends */}


          <HoDSideSupervisorChange
            formData={formData}
            handleHoDRecommendationChange={handleHoDRecommendationChange}
            handleChange={handleChange}
          />
{/* HoD SIDE ENDS */}

<DoRDCSideSupervisorChange
            formData={formData}
            handleDoRDCRecommendationChange={handleDoRDCRecommendationChange}
          />

{/* DoRDC side ends */}
<DrASideSupervisorChange
            formData={formData}
            handleDRARecommendationChange={handleDRARecommendationChange}
          />



        </form>
      </div>
    </div>
  );
};

export default SupervisorChange;
