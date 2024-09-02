import { useState,React }  from 'react';
import './StatusChange.css';
import { toast } from 'react-toastify';

const StudentSideStatusChange = ({ formData, handleChange }) => {
  const [statusChange, setstatusChange] = useState(null);
  const handlestatusChange = (event) => {
    setstatusChange(event.target.value);
  };
  const submitData = async () => {
    toast.success('sent to supervisor');
    localStorage.setItem('datalist', JSON.stringify(formData));
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
        <div className='date-input'>
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
        <label htmlFor="researchTitleInput">Title of PhD Thesis</label>
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
  <label htmlFor="statusChangeDropdown" className='bold-label'>Change of Status availed if any earlier</label>
  <select
    id="statusChangeDropdown"
    name="statusChange"
    value={statusChange}
    onChange={handlestatusChange}
    required
  >
    <option value="">Select an option</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>

      {statusChange === "Yes" && (
         <div className='supervisor-button-div'>
         <button  type="submit">Attach copy of proof</button>
       </div>
    
      )}
<div className="first">
<div className='date-input'>
        <label htmlFor="irbMeetingDateInput">Date and year of previous extension</label>
        <input
          type="date"
          id="previousExtensionDateInput"
          name="previousExtensionDate"
          value={formData.previousExtensionDate}
          required
        />
      </div>

      <div className='date-input'>
        <label htmlFor="irbMeetingDateInput">Date of IRB meeting</label>
        <input
          type="date"
          id="irbMeetingDateInput"
          name="irbMeetingDate"
          value={formData.irbMeetingDate}
          readOnly
          required
        />
      </div>
      </div>
      <div className='data-input'>
  <label htmlFor="statusChangeDropdown" className='bold-label'>Required Change of Status</label>
  <select
    id="statusChangeDropdown"
    name="statusChange"
    value={statusChange}
    onChange={handlestatusChange}
    required
  >
    <option value="">Select an option</option>
    <option value="Yes">Regular to Part Time</option>
    <option value="No">Part Time to Regular</option>
  </select>
</div>
      
     
    
     
      
      
      
     
      
     
      <div className='supervisor-button-div'>
        <button className='send' type="submit" onClick={submitData}>SEND TO SUPERVISOR</button>
      </div>
    </div>
  );
};

export default StudentSideStatusChange;
