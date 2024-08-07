
import React, { useEffect, useState } from 'react';
import './Extension.css';
import { toast } from 'react-toastify';
import { SERVER_URL } from '../../../config';

const StudentSideExtension = ({ formData, handleChange }) => {

  const [studentLock, setStudentLock] = useState(false);

  useEffect(() => {

    setStudentLock(formData.student_lock);
    console.log(studentLock);
  }, [formData]);
  


  const sendToSupervisor = async() => {
    try {
      const response = await fetch(`${SERVER_URL}/forms/research/extension/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          start:formData.extensionPeriodStart,
          end:formData.extensionPeriodEnd,
          reason:formData.extensionReason
        })
      });
      // const response=await

      if (response.ok) {
        const data = await response.json();
        console.log(data);
       if(data)
        toast.success("Success Submitting form")
      } else {
        var msg=await response.json()
        
        toast.error(msg.message);
        throw response;
      }

     
    } catch (error) {
      console.log("Error has occurred:", error);
      if (error instanceof Response) {
        error.json().then(data => {
          if (error.status === 422) {
            alert(data.message);
          } else if (error.status === 401) {
            alert("Invalid email or password");
          } else if (error.status === 500) {
            alert("Server error. Please try again later.");
          }
        }).catch(jsonError => {
          console.error('Error parsing JSON:', jsonError);
        });
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }


  return (
    <div className='student-form'>
       
       <div className='first'>
      <div className='data-input'>
          <label htmlFor="regnoInput">Roll Number</label>
          <input
            type="number"
            id="regnoInput"
            name="regno"
            value={formData.regno}

            readOnly
            required
          />
        </div>
        <div className='data-input'>
          <label htmlFor="nameInput">Name</label>
          <input
            type="text"
            id="nameInput"
            name="name"
            value={formData.name}
            readOnly
            required
          />
        </div>
        </div>
      <div className='first'>
        <div className='data-input'>
          <label htmlFor="dateOfAdmissionInput">Date of Admission</label>
          <input
            type="date"
            id="dateOfAdmissionInput"
            name="dateOfAdmission"
            value={formData.dateOfAdmission}
            readOnly
            required
          />
        </div>
        <div className='data-input'>
          <label htmlFor="departmentInput">Department</label>
          <input
            type="text"
            id="departmentInput"
            name="department"
            value={formData.department}
            readOnly
            required
          />
        </div>
      </div>
      <div className='data-input'>
        <label htmlFor="mobileInput">Mobile Number</label>
        <input
          type="text"
          id="mobileInput"
          name="mobile"
          value={formData.mobile}
          readOnly
          required
        />
      </div>
      <div className='data-input'>
        <label htmlFor="researchTitleInput">Title of Phd Thesis</label>
        <input
          type="text"
          id="researchTitleInput"
          name="researchTitle"
          value={formData.researchTitle}
          readOnly
          required
        />
      </div>
      <div className='data-input'>
        <label htmlFor="statusInput">Status of student at time of admission</label>
        <input
          type="text"
          id="statusInput"
          name="status"
          value={formData.status}
          readOnly
          required
        />
      </div>
      <div className='data-input'>
        <label htmlFor="courseworkInput">Required coursework</label>
        <input
          type="text"
          id="courseworkInput"
          name="coursework"
          value={formData.coursework}
          readOnly
          required
        />
      </div>
      <div className='data-input'>
        <label htmlFor="supervisorsInput">Supervisor(s)</label>
        <input
          type="text"
          id="supervisorsInput"
          name="supervisors"
          value={formData.supervisors?.join(', ')}
          readOnly
          required
        />
      </div>
      <div className='data-input'>
        <label htmlFor="extensionEarlierInput">Extension availed if any earlier (For submission of research proposal)</label>
        <input
          type="text"
          id="extensionEarlierInput"
          name="extensionEarlier"
          value={formData.extensionEarlier}
          readOnly
          required
        />
      </div>
      <div className='data-input'>
        <label>
          Period of extension required (IN MONTHS)
          <input type="date" name="extensionPeriodStart"  {...studentLock ? { readOnly: true } : {}}  value={formData.extensionPeriodStart} onChange={handleChange} /> to
          <input type="date" name="extensionPeriodEnd"  {...studentLock ? { readOnly: true } : {}} value={formData.extensionPeriodEnd} onChange={handleChange} />
        </label>
      </div>
      <div className='data-input'>
        <label>
          Reason for Extension
          <input name="extensionReason"  {...studentLock ? { readOnly: true } : {}}  value={formData.extensionReason} onChange={handleChange} />
        </label>
      </div>
      {!studentLock && ( <div className='supervisor-button-div'>
        <button className='send' type="submit" onClick={sendToSupervisor}>SEND TO SUPERVISOR</button>
      </div>)}
     
    </div>
  );
};

export default StudentSideExtension;
