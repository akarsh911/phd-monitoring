import { useState,React }  from 'react';
import './ThesisExtension.css';

const StudentSideThesisExtension = ({ formData, handleChange }) => {
  const [ThesisExtension, setThesisExtension] = useState(null);

  const handleThesisExtension = (event) => {
    setThesisExtension(event.target.value);
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
      {/* <div className='data-input' id='gender'>
      <label className='bold-label'>Gender</label>
      <div>
        <input
          type="radio"
          id="genderMale"
          name="gender"
          value="Male"
          checked={gender === 'Male'}
          readOnly
        />
        <label htmlFor="genderMale" className="small-label">Male</label>
      </div>
      <div>
        <input
          type="radio"
          id="genderFemale"
          name="gender"
          value="Female"
          checked={gender === 'Female'}
          readOnly
        />
        <label htmlFor="genderFemale" className="small-label">Female</label>
      </div>
    </div>
       */}

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
  <label className='bold-label'>Required Change of Status</label>
  <div>
    <input
      type="radio"
      id="RequiredThesisExtensionRegularToPartTime"
      name="RequiredThesisExtension"
      value="Regular to Part-Time"
      onChange={handleThesisExtension}
      required
    />
    <label htmlFor="RequiredThesisExtensionRegularToPartTime" className="small-label">Regular to Part-Time</label>
  </div>
  <div>
    <input
      type="radio"
      id="RequiredThesisExtensionPartTimeToRegular"
      name="RequiredThesisExtension"
      value="Part-Time to Regular"
      onChange={handleThesisExtension}
      required
    />
    <label htmlFor="RequiredThesisExtensionPartTimeToRegular" className="small-label">Part-Time to Regular</label>
  </div>
</div>

      
     
      
     
      
      
      
     
      
     
      <div className='supervisor-button-div'>
        <button className='send' type="submit">SEND TO SUPERVISOR</button>
      </div>
    </div>
  );
};

export default StudentSideThesisExtension;
