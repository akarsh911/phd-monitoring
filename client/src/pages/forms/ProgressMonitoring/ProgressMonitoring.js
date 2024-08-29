import React, { useState, useEffect } from 'react';
import './ProgressMonitoring.css';
import StudentSideProgress from './StudentSideProgress';
import DRASideProgress from './DrASideProgress';
import HodSideProgress from './HodSideProgress';
import DoRDCSideProgress from './DoRDCSideProgress';
import SupervisorSideProgress from './SupervisorSideProgress';
import DocComSideProgress from './DocComSideProgress';
import { SERVER_URL } from "../../../config";
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import StatusModal from "../Modal/Modal";

const ProgressMonitoring = () => {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    regno: '',
    gender: '',
    admissionDate: '',
    department: '',
    semester: '',
    session: '',
    cgpa: '',
    chairman: '',
    supervisor: '',
    hodRecommendation: '',
    supervisorRecommendation: '',
    expertfromIRB: '',
    nomineeDoRDC: '',
    previousQuantumProgress: '',
    increaseInQuantumProgress: '',
    totalQuantumProgress: '',
    date_of_irb: '',
    period_of_report: '',
    phd_title: '',
    prev_progress: 0,
    publications: [],
    supervisorReviews: [],
    extentions: [],
    status: '',
    HODComments: '',
    DORDCComments: '',
    DRAComments: '',
    student_lock: false,
    hod_lock: false,
    supervisor_lock: false,
    dordc_lock: false,
    dra_lock: false,
    role: 'dra'
  });

  const [options, setOptions] = useState({
    experts: [],
    nominees: [],
    chairmanExpertsOptions: []
  });
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data");
      try {
        const response = await fetch(`${SERVER_URL}/presentation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            student_id: params.id,
          }), // Replace with actual id
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          
        setFormData((prevData) => ({
          ...prevData,
          date: new Date().toISOString().split('T')[0],
          name: data.name,
          regno: data.roll_no,
          admissionDate: data.date_of_registration,
          department: data.department,
          period_of_report: data.period_of_report,
          phd_title: data.phd_title,
          date_of_irb: new Date(data.date_of_irb)
          .toISOString()
          .split("T")[0],
          prev_progress: data.prev_progress,
          publications: data.publications,
          supervisorReviews: data.supervisorReviews,
          status: data.status,
          HODComments: data.HODComments,
          DORDCComments: data.DORDCComments,
          extentions:data.extention,
          DRAComments: data.DRAComments,
          student_lock: data.student_lock,
          hod_lock: data.hod_lock,
          supervisor_lock: data.supervisor_lock,
          dordc_lock: data.dordc_lock,
          dra_lock: data.dra_lock,
          role: data.role,
        }));

        setOptions({
          experts: data.expertsOptions || [],
          nominees: data.nomineesOptions || [],
          chairmanExpertsOptions: data.chairmanExpertsOptions || []
        });
      }
      else{
        toast.error("Error fetching data"); 
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const handleHodRecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      hodRecommendation: e.target.value
    }));
  };

  const handleSupRecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      supervisorRecommendation: e.target.value
    }));
  };

  const handleDocComRecommendationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDoRDCRecommendationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDRARecommendationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic
  };



  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='extensionBody-div'>
      <div className='extensionform-div'>
        <div className='heading'>
          <h1>Progress Monitoring</h1>
          <div className='top-button'>
          <button onClick={openModal}>View Status</button>
          {isModalOpen && <StatusModal closeModal={closeModal} />}
        </div>
        </div>
        <form onSubmit={handleSubmit} className='studentSideform'>
        {formData.role === "student" && (
            <StudentSideProgress formData={formData} />
          )}
          {formData.role === "supervisor" && (
            <div>
              <StudentSideProgress formData={formData} />
              <SupervisorSideProgress formData={formData} handleSupRecommendationChange={handleSupRecommendationChange} />
              </div>
          )}
          {formData.role === "doccom" && (
            <div>
              <StudentSideProgress formData={formData} />
              <SupervisorSideProgress formData={formData} handleSupRecommendationChange={handleSupRecommendationChange} />
              <DocComSideProgress formData={formData} handleDocComRecommendationChange={handleDocComRecommendationChange} />
              </div>
          )}
          {formData.role === "hod" && (
            <div>
              <StudentSideProgress formData={formData} />
              <SupervisorSideProgress formData={formData} handleSupRecommendationChange={handleSupRecommendationChange} />
              <DocComSideProgress formData={formData} handleDocComRecommendationChange={handleDocComRecommendationChange} />
              <HodSideProgress formData={formData} handleHodRecommendationChange={handleHodRecommendationChange} />
              </div>
            
          )}
          {formData.role === "dordc" && (
            <div>
              <StudentSideProgress formData={formData} />
              <SupervisorSideProgress formData={formData} handleSupRecommendationChange={handleSupRecommendationChange} />
              <DocComSideProgress formData={formData} handleDocComRecommendationChange={handleDocComRecommendationChange} />
              <HodSideProgress formData={formData} handleHodRecommendationChange={handleHodRecommendationChange} />
              <DoRDCSideProgress formData={formData} handleDoRDCRecommendationChange={handleDoRDCRecommendationChange} />
              </div>
          )}
          {formData.role === "dra" && (
            <div>
              <StudentSideProgress formData={formData} />
              <SupervisorSideProgress formData={formData} handleSupRecommendationChange={handleSupRecommendationChange} />
              <DocComSideProgress formData={formData} handleDocComRecommendationChange={handleDocComRecommendationChange} />
              <HodSideProgress formData={formData} handleHodRecommendationChange={handleHodRecommendationChange} />
              <DoRDCSideProgress formData={formData} handleDoRDCRecommendationChange={handleDoRDCRecommendationChange} />
              <DRASideProgress formData={formData} handleDRARecommendationChange={handleDRARecommendationChange} />
              </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProgressMonitoring;
