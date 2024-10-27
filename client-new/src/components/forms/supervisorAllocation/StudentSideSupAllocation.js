import {React , useState} from 'react';


import './SupAllocation.css';

const StudentSideSupAllocation = ({ formData, handleChange }) => {
   

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
       <div className="first">
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
        <div className='data-input'>
  <label htmlFor="preferenceInput1">Select Three Broad Areas of Research</label>

  <select
    id="preferenceInput1"
    name="preference1"
    value={formData.preference1}
    onChange={handleChange}
  >
    <option value="">Select an area</option>
  
  </select>

  <select
    id="preferenceInput2"
    name="preference2"
    value={formData.preference2}
    onChange={handleChange}
  >
    <option value="">Select an area</option>
   
  </select>

  <select
    id="preferenceInput3"
    name="preference3"
    value={formData.preference3}
    onChange={handleChange}
  >
    <option value="">Select an area</option>
  
  </select>
</div>
<div className="data-input">
<label>Select 5 tentative names of Supervisors in order</label>
            <select name="teacher1" value={formData.teacher1} onChange={handleChange}>
                <option value="">Select Teacher 1</option>
                {/* Add teacher options here */}
            </select><br />
            <select name="teacher2" value={formData.teacher2} onChange={handleChange}>
                <option value="">Select Teacher 2</option>
                {/* Add teacher options here */}
            </select><br />
            <select name="teacher3" value={formData.teacher3} onChange={handleChange}>
                <option value="">Select Teacher 3</option>
                {/* Add teacher options here */}
            </select><br />
            <select name="teacher4" value={formData.teacher4} onChange={handleChange}>
                <option value="">Select Teacher 4</option>
                {/* Add teacher options here */}
            </select><br />
            <select name="teacher5" value={formData.teacher5} onChange={handleChange}>
                <option value="">Select Teacher 5</option>
                {/* Add teacher options here */}
            </select><br />
            </div>

            <div className='supervisor-button-div'>
        <button className='send' type="submit">Submit</button>
      </div>
      

     
    </div>
  );
};

export default StudentSideSupAllocation;
