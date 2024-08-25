import React, { useState, useEffect } from 'react';
import './ConstituteOfIrb.css';
import { toast } from 'react-toastify';
import { SERVER_URL } from '../../../config';

const StudentSideIrb = ({ formData }) => {
  const [formValues, setFormValues] = useState(formData);
  const isEditable = !formValues.student_lock;
  const submitStudent=async ()=>
  {
  

        try {
          const response = await fetch(`${SERVER_URL}/forms/irb/constitutuion/submit`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
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
      };
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div className='student-form'>
      {/* <div className='date-input'>
        <label htmlFor="dateInput">Date</label>
        <input
          type="date"
          id="dateInput"
          name="date"
          value={formValues.date}
          onChange={handleChange}
          readOnly={!isEditable}
          required
        />
      </div> */}
      <div className='first'>
      <div className='data-input'>
          <label htmlFor="regnoInput">Roll Number</label>
          <input
            type="number"
            id="regnoInput"
            name="regno"
            value={formValues.regno}
            onChange={handleChange}
            readOnly={!isEditable}
            required
          />
        </div>
        <div className='data-input'>
          <label htmlFor="nameInput">Name</label>
          <input
            type="text"
            id="nameInput"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            readOnly={!isEditable}
            required
          />
        </div>
        
      </div>
      <div className='first'>
        
        <div className='data-input'>
          <label className='bold-label'>Gender</label>
          <input
            type="text"
            id="genderInput"
            name="gender"
            value={formValues.gender}
            onChange={handleChange}
            readOnly={!isEditable}
            required
          />
        </div>
        <div className='data-input'>
          <label htmlFor="departmentInput">Department</label>
          <input
            type="text"
            id="departmentInput"
            name="department"
            value={formValues.department}
            onChange={handleChange}
            readOnly={!isEditable}
            required
          />
        </div>
         
       
       
      </div>
      <div className='date-input'>
        <label htmlFor="admissionDateInput">Date of Admission</label>
          <input
            type="date"
            id="admissionDateInput"
            name="admissionDate"
            value={formValues.admissionDate}
            onChange={handleChange}
            readOnly={!isEditable}
            required
          />
        </div>
      <div className='first'>
        <div className='data-input'>
          <label htmlFor="semesterInput">Semester</label>
          <input
            type="text"
            id="semesterInput"
            name="semester"
            value={formValues.semester}
            onChange={handleChange}
            readOnly={!isEditable}
            required
          />
        </div>
        {/* <div className='data-input'>
          <label htmlFor="sessionInput">Session</label>
          <input
            type="text"
            id="sessionInput"
            name="session"
            value={formValues.session}
            onChange={handleChange}
            readOnly={!isEditable}
            required
          />
        </div> */}
        <div className='data-input'>
        <label htmlFor="cgpaInput">CGPA</label>
        <input
          type="number"
          id="cgpaInput"
          name="cgpa"
          value={formValues.cgpa}
          onChange={handleChange}
          readOnly={!isEditable}
          required
        />
      </div>
      </div>
      
      <div className='data-input'>
        <label htmlFor="chairmanInput">Chairman, Board of Studies of the concerned department</label>
        <input
          type="text"
          id="chairmanInput"
          name="chairman"
          value={formValues.chairman}
          onChange={handleChange}
          readOnly={!isEditable}
          required
        />
      </div>
      <div className='data-input'>
        <label htmlFor="supervisorInput">Supervisor(s)</label>
        <input
          type="text"
          id="supervisorInput"
          name="supervisor"
          value={formValues.supervisor}
          onChange={handleChange}
          readOnly={!isEditable}
          required
        />
      </div>
    {/* {formData.role=='student' &&(
      <div className='supervisor-button-div'>
        <button className='send' type="submit" onClick={submitStudent}>SEND TO SUPERVISOR</button>
      </div>
    )} */}
     <div className='supervisor-button-div'>
        <button className='send' type="submit" onClick={submitStudent}>SEND TO SUPERVISOR</button>
      </div>
    </div>
  );
};

export default StudentSideIrb;
