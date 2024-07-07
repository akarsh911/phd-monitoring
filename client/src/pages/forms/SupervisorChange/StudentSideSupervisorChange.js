import {React , useState} from 'react';


import './SupervisorChange.css';

const StudentSideSupervisorChange = ({ formData, handleChange ,handleSelectedSupervisorChange}) => {
    const [supervisors, setSupervisors] = useState([{ name: '' }]);

  
    const addSupervisor = () => {
      setSupervisors([...supervisors, { name: '' }]);
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
            readOnly
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
            readOnly
          />
        </div>
      </div>

      <div className='data-input' id='appr'>
        <label>IRB Completed</label>
        <div >
          <input
            type="radio"
            id="irbYes"
            name="irbCompleted"
            value="yes"
            checked={formData.irbCompleted === 'yes'}
            onChange={handleChange}
            required
          />
          <label htmlFor="irbYes" className='small-label'>Yes</label>
          <input
          
            type="radio"
            id="irbNo"
            name="irbCompleted"
            value="no"
            checked={formData.irbCompleted === 'no'}
            onChange={handleChange}
            required
          />
          <label htmlFor="irbNo" className='small-label'>No</label>
        </div>
      </div>

      {formData.irbCompleted === 'yes' && (
        <div className='data-input'>
          <label htmlFor="researchTitleInput">Title of PHD Thesis</label>
          <input
            type="text"
            id="researchTitleInput"
            name="researchTitle"
            value={formData.researchTitle}
            onChange={handleChange}
            required
          />
        </div>
      )}

<div className='data-input'>
        <label htmlFor="supervisorsInput">Supervisor(s) Allocated</label>
        <input
          type="text"
          id="supervisorsInput"
          name="supervisors"
          value={formData.supervisors.join(', ')}  // Assuming supervisors is an array
          readOnly
          required
        />
      </div>

      <div className='date-input' >
        <label htmlFor="dateAllocatedInput">Date of Allocation of Supervisors</label>
        <input
          type="date"
          id="dateAllocatedInput"
          name="dateAllocated"
          value={formData.dateAllocated}
          readOnly
          required
        />
      </div>

      <div className='data-input'>
        <label htmlFor="preferenceInput">Broad Area of Research</label>
        <input
          type="text"
          id="preferenceInput"
          name="preference"
          value={formData.preference}
          onChange={handleChange}
        /> <input
        type="text"
        id="preferenceInput"
        name="preference"
        value={formData.preference}
        onChange={handleChange}
      />
       <input
          type="text"
          id="preferenceInput"
          name="preference"
          value={formData.preference}
          onChange={handleChange}
        />
      </div>

      

      <div className='data-input' id='appr'>
        <label htmlFor="supervisorName" >Supervisor(s) to be changed</label>
        <div >
          {formData.supervisors.map((supervisor, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`supervisor-${index}`}
                name="supervisor"
                value={supervisor}
                onChange={handleSelectedSupervisorChange}
              />
              <label htmlFor={`supervisor-${index}`} className='small-label'>{supervisor}</label>
            </div>
          ))}
        </div>
      </div>


      <div className='data-input'>
        <label htmlFor="reasonForChangeInput">Reason for Change</label>
        <input
          type="text"
          id="reasonForChangeInput"
          name="reasonForChange"
          value={formData.reasonForChange}
          onChange={handleChange}
          required
        />
      </div>

      <div className='data-input'>
        <label htmlFor="preferenceInput"> Preferences</label>
        <input
          type="text"
          id="preferenceInput"
          name="preference"
          value={formData.preference}
          onChange={handleChange}
        /> <input
        type="text"
        id="preferenceInput"
        name="preference"
        value={formData.preference}
        onChange={handleChange}
      />
       <input
          type="text"
          id="preferenceInput"
          name="preference"
          value={formData.preference}
          onChange={handleChange}
        />
      </div>

      <div className='supervisor-button-div'>
        <button className='send' type="submit">SEND TO HoD and PHD Coordinator</button>
      </div>
    </div>
  );
};

export default StudentSideSupervisorChange;
