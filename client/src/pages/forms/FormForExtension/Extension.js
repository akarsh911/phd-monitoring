import React, { useState, useEffect } from 'react';
import './Extension.css';
import StudentSideExtension from './StudentSideExtension';
import SupervisorSideExtension from './SupervisorSideExtension';
import HodSideExtension from './HodSideExtension';
import DrASideExtension from './DrASideExtension';
import { SERVER_URL } from '../../../config';
import { useParams } from 'react-router-dom';

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

        const response = await fetch(`${SERVER_URL}/forms/research/extension`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ 
            student_id: params.id
          })
        });
        if(response.ok)
          {
            let  data = await response.json();
            data=data.form;
            console.log(data);
            const recommended=[];
            data?.supervisorApprovals?.forEach((supervisor) => {
              recommended.push({ status: supervisor.status, remarks: supervisor.comments,name:supervisor.name });
            });
            if(data.supervisors?.length>data.supervisorApprovals?.length)
            {

              let diff=data.supervisors.length-data.supervisorApprovals?.length;
              for(let i=0;i<diff;i++)
              {
                recommended.push({ status: false, remarks: '' });
              }
            }
           
            setFormData({
              name:data.name,
              regno:data.roll_no,
              dateOfAdmission: data.date_of_registration,
              department: data.department,
              researchTitle: data.phd_title,
              mobile: data.phone,
              status: "Full Time",
              coursework: "CSE",
              supervisors: data.supervisors?.map((supervisor) => supervisor.name),
              extensionEarlier: "N/A",
              extensionPeriodStart: data.start_date,
              extensionPeriodEnd: data.end_date,
              extensionReason: data.reason,
              hodRecommendation: data.hod_approval=="accepted"? "Approved" : "Not Approved",
              hodRemarks: data.HODComments,
              DrARecommendation: data.dra_approval? "Approved" : "Not Approved",
              DrARemarks: data.DRAComments,
              role: data.role,
              supervisorRecommendations: recommended,
              student_lock: data.student_lock,
              supervisor_lock: data.supervisor_lock,
              hod_lock: data.hod_lock,
              dra_lock: data.dra_lock,
            });
            setSupervisorProfile(data.user_name);

          }
          else{
            alert("Error fetching data");
          }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };


    fetchData();
  
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

  
  const params= useParams();
  return (
    <div className='extensionBody-div'>
      <div className='extensionform-div'>
        <div className='heading'>
          <h1>Extension for submission of research proposal</h1>
        </div>
        {/* <form onSubmit={handleSubmit} className='extensionSideform'> */}
        
        {formData.role === 'student' && <StudentSideExtension formData={formData} handleChange={handleChange} />}
       
      {formData.role === 'faculty' && (
          <div className='supervisor-form'>
            <StudentSideExtension formData={formData} handleChange={handleChange} />
            <SupervisorSideExtension  formData={formData} loggedInSupervisor={supervisorProfile}  />
          </div>
        )}

        { formData.role === 'hod' && (
          <div className='hod-form'>
            <StudentSideExtension formData={formData} handleChange={handleChange} />
            <SupervisorSideExtension  formData={formData} loggedInSupervisor={supervisorProfile}  />
            <HodSideExtension
              formData={formData}
              handleHodRecommendationChange={handleHodRecommendationChange}
            />
          </div>
        )}

{ formData.role === 'dra' && (
          <div className='dra-form'>
            <StudentSideExtension formData={formData} handleChange={handleChange} />
            <SupervisorSideExtension  formData={formData} loggedInSupervisor="Supervisor 1"  />
            <HodSideExtension
              formData={formData}
              handleHodRecommendationChange={handleHodRecommendationChange}
            />
            <DrASideExtension
              formData={formData}
              handleDrARecommendationChange={handleDrARecommendationChange}
            />
          </div>
        )}
        
      </div>
    </div>
  );
};

export default ResearchProposalExtensionForm;
