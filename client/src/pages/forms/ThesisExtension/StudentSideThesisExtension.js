import { useState,React }  from 'react';
import './ThesisExtension.css';

const StudentSideThesisExtension = ({ formData, handleChange }) => {
  const [extensionAvailed, setExtensionAvailed] = useState('');
  const [showExtensionPeriod, setShowExtensionPeriod] = useState(false);

  const handleThesisExtensionChange = (e) => {
    setExtensionAvailed(e.target.value);
    if (e.target.value === 'Yes') {
      setShowExtensionPeriod(true);
    } else {
      setShowExtensionPeriod(false);
    }
  };
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
            type="email"  
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
      
      <div className="first">
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
        <label htmlFor="statusInput">Gender</label>
        <input
          type="text"
          id="statusInput"
          name="status"
          value={formData.gender}
          readOnly
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
<div className="first">
<div className='date-input'>
        <label htmlFor="irbMeetingDateInput">Date of Synopsis meeting</label>
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
      <div className='data-input' >
  <label className='bold-label'>Extension availed if any earlier</label>
  <select name="extensionAvailed" onChange={handleThesisExtensionChange} required>
    <option value="">Select an option</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>

{showExtensionPeriod && (
 <div className='first'>
    <div className='data-input' id= 'period' >
      <label className='bold-label'>Period of Extension</label>
      <select name="extensionPeriod" required>
        <option value="">Select a period</option>
        <option value="6">6 years</option>
        <option value="7">7 years</option>
        {formData.gender === 'Female' && (
          <>
            <option value="8">8 years</option>
            <option value="9">9 years</option>
            <option value="10">10 years</option>
          </>
        )}
      </select>
    </div>
   <div className='data-input'>
   <label htmlFor="proofOfExtension">Attach proof of previous Extension </label>
   <label htmlFor="proofOfExtension" className='small-label'>(Letter issued by DR(A))</label>
   <input
     type="file"
     id="proofOfExtension"
     name="proofOfExtension"
     accept=".pdf"
     required
   />
 </div>
 </div>
)}
       
     
    
   
   
      <div className="first">
       <div className='data-input' >
  <label className='bold-label'>Required Period of Extension</label>
  <select name="requiredPeriodOfExtension" required>
    <option value="">Select a period</option>
    <option value="6">6 years</option>
    <option value="7">7 years</option>
    {formData.gender === 'Female' && (
      <>
        <option value="8">8 years</option>
        <option value="9">9 years</option>
        <option value="10">10 years</option>
      </>
    )}
  </select>
</div>
</div>


      
     
      
      
      
     
      
     
      <div className='supervisor-button-div'>
        <button className='send' type="submit">SEND TO SUPERVISOR</button>
      </div>
    </div>
  );
};

export default StudentSideThesisExtension;
