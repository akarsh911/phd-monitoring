
import React from 'react';
import './Extension.css';

const StudentSideExtension = ({ formData, handleChange }) => {
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
        <label htmlFor="researchTitleInput">Title of research Proposal</label>
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
        <label htmlFor="supervisorsInput">Name of Supervisors</label>
        <input
          type="text"
          id="supervisorsInput"
          name="supervisors"
          value={formData.supervisors.join(', ')}
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
          <input type="date" name="extensionPeriodStart" value={formData.extensionPeriodStart} onChange={handleChange} /> to
          <input type="date" name="extensionPeriodEnd" value={formData.extensionPeriodEnd} onChange={handleChange} />
        </label>
      </div>
      <div className='data-input'>
        <label>
          Reason for Extension
          <input name="extensionReason" value={formData.extensionReason} onChange={handleChange} />
        </label>
      </div>
      <div className='supervisor-button-div'>
        <button className='send' type="submit">SEND TO SUPERVISOR</button>
      </div>
    </div>
  );
};

export default StudentSideExtension;
