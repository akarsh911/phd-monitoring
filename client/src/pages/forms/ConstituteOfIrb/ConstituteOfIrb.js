import React, { useState, useEffect } from 'react';
import './ConstituteOfIrb.css';
import StudentSideIrb from './StudentSideIrb'; 
import SupSideIrb from './SupSideIrb';
import HodSideIrb from './HodSideIrb';
import DoRDCSideIrb from './DoRDCSideIrb';

const Irb = () => {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
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
    nomineeDoRDC: ''
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

  const handleRecommendationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      supervisorRecommendation : value
    }));
  }

  const handleDoRDCChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
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
          <h1>CONSTITUTE OF INSTITUTE RESEARCH BOARD</h1>
        </div>
        <form onSubmit={handleSubmit} className='studentSideform'>
          
        <StudentSideIrb formData={formData} />


          {/* STUDENT SIDE ENDS */}
          
          <div className='supervisor-form'>
            <SupSideIrb
              formData={formData}
              options={options}
              handleExpertChange={handleExpertChange}
              handleNomineeChange={handleNomineeChange}
              handleRecommendationChange={handleRecommendationChange}
            />
          </div>


          {/* SUPERVISOR SIDE ENDS */}

      <HodSideIrb
            formData={formData}
            options={options}
            handleExpertChange={handleExpertChange}
            handleChairmanExpertChange={handleChairmanExpertChange}
            addChairmanExpert={addChairmanExpert}
            handleHodRecommendationChange={handleHodRecommendationChange}
          />
{/* HOD SIDE ENDS */}

<DoRDCSideIrb
              formData={formData}
              options={options}
              handleDoRDCChange={handleDoRDCChange}
            />

{/* DoRDC side ends */}


        </form>
      </div>
    </div>
  );
};

export default Irb;
