import React from 'react';
import './ThesisSub.css';

const StudentSideThesis = ({ formData, handleChange }) => {
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
      
      <div className='data-input'>
        <label htmlFor="fatherNameInput">Father's Name</label>
        <input
          type="text"
          id="fatherNameInput"
          name="fatherName"
          value={formData.fatherName}  
          required
        />
      </div>
     
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
        <label htmlFor="addressInput">Address for correspondence</label>
        <input
          type="text"
          id="addressInput"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className='first'>
        <div className='data-input'>
          <label htmlFor="emailInput">Email</label>
          <input
            type="email"  // Changed to type="email" assuming it's for email input
            id="emailInput"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='data-input'>
          <label htmlFor="mobileInput">Mobile No.</label>
          <input
            type="tel"
            id="mobileInput"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className='data-input'>
        <label htmlFor="titleInput">Title of PhD Thesis</label>
        <input
          type="text"
          id="titleInput"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className='data-input'>
        <label htmlFor="supervisorsInput">Supervisor(s)</label>
        <input
          type="text"
          id="supervisorsInput"
          name="supervisors"
          value={formData.supervisors.join(', ')}  // Assuming supervisors is an array
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
        <label htmlFor="dateOfStatusChangeInput">Date of change of Status</label>
        <input
          type="date"
          id="dateOfStatusChangeInput"
          name="dateOfStatusChange"
          value={formData.dateOfStatusChange}
          readOnly
          required
        />
      </div>
      
      <div className='data-input'>
        <label htmlFor="publicationDetailsInput">
          <a href={formData.publicationLink} target="_blank" rel="noopener noreferrer">
            Details of Publication
          </a>
        </label>
      </div>
      
      <div className='data-input'>
        <label htmlFor="dateOfSynopsisPresentationInput">Date of Synopsis Presentation</label>
        <input
          type="date"
          id="dateOfSynopsisPresentationInput"
          name="dateOfSynopsisPresentation"
          value={formData.dateOfSynopsisPresentation}
          readOnly
          required
        />
      </div>
      
      <div className='first'>
        <div className='data-input'>
          <label htmlFor="thesisExamFeeInput">Thesis Examination Fee:</label>
          {/* Add appropriate input fields for thesis examination fee */}
        </div>
       
        <div className='data-input'>
          <label htmlFor="receiptNumberInput">Receipt Number</label>
          <input
            type="text"
            id="receiptNumberInput"
            name="receiptNumber"
            value={formData.receiptNumber}
            readOnly
            required
          />
        
        
        <div className='data-input'>
          <label htmlFor="receiptDateInput">Date</label>
          <input
            type="date"
            id="receiptDateInput"
            name="receiptDate"
            value={formData.receiptDate}
            readOnly
            required
          />
          </div>
        </div>
      </div>
     
      <div className='supervisor-button-div'>
        <button className='send' type="submit">SEND TO SUPERVISOR</button>
      </div>
    </div>
  );
};

export default StudentSideThesis;
