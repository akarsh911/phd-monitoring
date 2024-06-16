import React from 'react';
import { useState } from 'react';
import './IrbSubmission.css';

const Irb = () => {
  const [formData, setFormData] = useState({
    name: '',
    regno:'',
    admissionDate: '',
    department: '',
    cgpa: '',
    title: '',
    address:'',
    telephoneNumber:'',
    number:'',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]:value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };



  return (
    <div className='irbSubbody-div'>
  <div className='irbSubform-div'>
    <div className='heading'>
    <h1>IRB SUBMISSION FORM</h1>
    </div>
    <form onSubmit={handleSubmit} className='irbSubform'>
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
        <div className='data-input'>
          <label htmlFor="cgpaInput">CGPA</label>
          <input
            type="number"
            step="0.01"
            id="cgpaInput"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleChange}
            required
          />
        </div>
        </div>
        <div className='date-input'>
          <label htmlFor="dateInput">Date of Admission</label>
          <input
            type="date"
            id="dateInput"
            name="date"
            value={formData.date}
            onChange={handleChange}
            
            required
          />
        </div>
       
        <div className='first'>
        <div className='data-input'>
          <label htmlFor="titleInput">Title of PHD Thesis</label>
          <input
            type="text"
            id="titleInput"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
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
          <label htmlFor="telephonenumberInput">Email</label>
          <input
            type="tel"
            id="telephonenumberInput"
            name="telephone-number"
            value={formData.telephoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className='data-input'>
          <label htmlFor="numberInput">Mobile</label>
          <input
            type="tel"
            id="numberInput"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </div>
        </div>
        <div className='button-div'>
        <button className='upload-button' type="submit">UPLOAD IRB PDF</button>
        <button className='send-button' type="submit">SEND TO SUPERVISOR</button>
        </div>
      </form>
  </div>
    </div>
  );
};

export default Irb;