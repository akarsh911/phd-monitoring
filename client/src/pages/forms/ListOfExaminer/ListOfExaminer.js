import React, { useState, useEffect } from 'react';
import './ListOfExaminer.css';
import SupSideListOfExaminer from './SupSideListOfExaminer';
 import DirectorSideListOfExaminer from './DirectorSideListOfExaminer';
 import DoRDCSideListOfExaminer from './DoRDCSideListOfExaminer';



const ListOfExaminer = () => {
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
    previousQuantumListOfExaminer: '',
    increaseInQuantumListOfExaminer: '',
    totalQuantumListOfExaminer: '',
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

  const handleSupRecommendationChange = (e) => {
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
          <h1>List of Panel of Examiners</h1>
        </div>
        <form onSubmit={handleSubmit} className='studentSideform'>


          <SupSideListOfExaminer formData={formData} handleChange={handleChange} />
         
     {/* SUPERVISOR SIDE ENDS */}
     


         

<DoRDCSideListOfExaminer
            formData={formData}
            handleDoRDCRecommendationChange={handleDoRDCRecommendationChange}
          />

{/* DoRDC side ends */}
<DirectorSideListOfExaminer
            formData={formData}
            handleDRARecommendationChange={handleDRARecommendationChange}/>

        </form>
      </div>
    </div>
  );
};

export default ListOfExaminer;
