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

<div className='date-input'>
        <label htmlFor="irbMeetingDateInput">Date of pre Synopsis meeting</label>
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
      <div className='data-input' id='appr'>
      <label className='bold-label'>Extension availed if any earlier</label>
      <div>
        <input
          type="radio"
          id="extensionYes"
          name="extensionAvailed"
          value="Yes"
          onChange={handleThesisExtensionChange}
          required
        />
        <label htmlFor="extensionYes" className="small-label">Yes</label>
      </div>
      <div>
        <input
          type="radio"
          id="extensionNo"
          name="extensionAvailed"
          value="No"
          onChange={handleThesisExtensionChange}
          required
        />
        <label htmlFor="extensionNo" className="small-label">No</label>
      </div>
      </div>

      {showExtensionPeriod && (
        <div className='data-input' id='appr'>
          <label className='bold-label'>Period of Extension</label>
          <div>
            <input
              type="radio"
              id="extension6"
              name="extensionPeriod"
              value="6"
              required
            />
            <label htmlFor="extension6" className="small-label">6 years</label>
          </div>
          <div>
            <input
              type="radio"
              id="extension7"
              name="extensionPeriod"
              value="7"
              required
            />
            <label htmlFor="extension7" className="small-label">7 years</label>
          </div>
          {formData.gender === 'Female' && (
            <>
              <div>
                <input
                  type="radio"
                  id="extension8"
                  name="extensionPeriod"
                  value="8"
                  required
                />
                <label htmlFor="extension8" className="small-label">8 years</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="extension9"
                  name="extensionPeriod"
                  value="9"
                  required
                />
                <label htmlFor="extension9" className="small-label">9 years</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="extension10"
                  name="extensionPeriod"
                  value="10"
                  required
                />
                <label htmlFor="extension10" className="small-label">10 years</label>
              </div>
            </>
          )}
        </div>
      )}
    
    <div className='upload-input'>
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
      
      <div className='data-input' id='appr'>
  <label className='bold-label'> Required Period of Extension</label>
  <div>
    <input
      type="radio"
      id="extension6"
      name="requiredPeriodOfExtension"
      value="6"
      required
    />
    <label htmlFor="extension6" className="small-label">6 years</label>
  </div>
  <div>
    <input
      type="radio"
      id="extension7"
      name="requiredPeriodOfExtension"
      value="7"
      required
    />
    <label htmlFor="extension7" className="small-label">7 years</label>
  </div>
  {formData.gender === 'Female' && (
    <>
      <div>
        <input
          type="radio"
          id="extension8"
          name="requiredPeriodOfExtension"
          value="8"
          required
        />
        <label htmlFor="extension8" className="small-label">8 years</label>
      </div>
      <div>
        <input
          type="radio"
          id="extension9"
          name="requiredPeriodOfExtension"
          value="9"
          required
        />
        <label htmlFor="extension9" className="small-label">9 years</label>
      </div>
      <div>
        <input
          type="radio"
          id="extension10"
          name="requiredPeriodOfExtension"
          value="10"
          required
        />
        <label htmlFor="extension10" className="small-label">10 years</label>
      </div>
    </>
  )}
</div>

      
     
      
      
      
     
      
     
      <div className='supervisor-button-div'>
        <button className='send' type="submit">SEND TO SUPERVISOR</button>
      </div>
    </div>
  );
};

export default StudentSideThesisExtension;
