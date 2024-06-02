import React from 'react';
import './ConstituteOfIrb.css';
const StudentSideIrb = ({ formData }) => {
  return (
    <div className='student-form'>
      <div className='date-input'>
        <label htmlFor="dateInput">Date</label>
        <input
          type="date"
          id="dateInput"
          name="date"
          value={formData.date}
          readOnly
          required
        />
      </div>
      <div className='first'>
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
        <div className='data-input'>
          <label className='bold-label'>Gender</label>
          <input
            type="text"
            id="genderInput"
            name="gender"
            value={formData.gender}
            readOnly
            required
          />
        </div>
      </div>
      <div className='first'>
        <div className='date-input'>
          <label htmlFor="admissionDateInput">Date of Admission</label>
          <input
            type="date"
            id="admissionDateInput"
            name="admissionDate"
            value={formData.admissionDate}
            readOnly
            required
          />
        </div>
        <div className='data-input'>
          <label htmlFor="regnoInput">Registration Number</label>
          <input
            type="number"
            id="regnoInput"
            name="regno"
            value={formData.regno}
            readOnly
            required
          />
        </div>
      </div>
      <div className='first'>
        <div className='data-input'>
          <label htmlFor="semesterInput">Semester</label>
          <input
            type="text"
            id="semesterInput"
            name="semester"
            value={formData.semester}
            readOnly
            required
          />
        </div>
        <div className='data-input'>
          <label htmlFor="sessionInput">Session</label>
          <input
            type="text"
            id="sessionInput"
            name="session"
            value={formData.session}
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
        <label htmlFor="cgpaInput">CGPA</label>
        <input
          type="number"
          step="0.01"
          id="cgpaInput"
          name="cgpa"
          value={formData.cgpa}
          readOnly
          required
        />
      </div>
      <div className='data-input'>
        <label htmlFor="chairmanInput">Chairman, Board of Studies of the concerned department</label>
        <input
          type="text"
          id="chairmanInput"
          name="chairman"
          value={formData.chairman}
          readOnly
          required
        />
      </div>
      <div className='data-input'>
        <label htmlFor="supervisorInput">Supervisor(s)</label>
        <input
          type="text"
          id="supervisorInput"
          name="supervisor"
          value={formData.supervisor}
          readOnly
          required
        />
      </div>
      <div className='supervisor-button-div'>
        <button className='send' type="submit">SEND TO SUPERVISOR</button>
      </div>
    </div>
  );
};

export default StudentSideIrb;
