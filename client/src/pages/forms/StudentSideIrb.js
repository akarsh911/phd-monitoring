import React from 'react';
import { useState } from 'react';
import './StudentSideIrb.css';

const Irb = () => {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    gender: '',
    admissionDate: '',
    department: '',
    semester: '',
    session: '',
    cgpa: '',
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
    <div className='body-div'>
  <div className='form-div'>
    <div className='heading'>
    <h1>CONSTITUTE OF INSTITUTE RESEARCH BOARD</h1>
    </div>
    <form onSubmit={handleSubmit} className='form'>
    
        <div className='date-input'>
          <label htmlFor="dateInput">Date:</label>
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
          <label htmlFor="nameInput">Name:</label>
          <input
            type="text"
            id="nameInput"
            name="name"
            value={formData.name}
            onChange={handleChange}
        
            required
          />
        </div>
        <div className='gender-input'>
          <label className='bold-label'>Gender:</label>
          <label className='gender-label'>
            <input
            
              type="checkbox"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
            />{' '}
            Male
          </label>
          <label  className='gender-label'>
            <input
              type="checkbox"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            />{' '}
            Female
          </label>
        </div>
        </div>
        <div className='first'>
        <div className='date-input'>
          <label htmlFor="admissionDateInput">Date of Admission:</label>
          <input
            type="date"
            id="admissionDateInput"
            name="admissionDate"
            value={formData.admissionDate}
            onChange={handleChange}
            required
          />
        </div>
        <div class='data-input'>
  <label htmlFor="departmentInput">Department:</label>
  <select
    id="departmentInput"
    name="department"
    value={formData.department}
    onChange={handleChange}
    required
  >
    <option value="">Select Department</option>
  
  </select>
</div>

        </div>
        <div className='first'>
        <div className='data-input'>
          <label htmlFor="semesterInput">Semester:</label>
          <input
            type="text"
            id="semesterInput"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
          />
        </div>
        <div className='data-input'>
          <label htmlFor="sessionInput">Session:</label>
          <input
            type="text"
            id="sessionInput"
            name="session"
            value={formData.session}
            onChange={handleChange}
            required
          />
        </div>
        </div>
        <div className='data-input'>
          <label htmlFor="cgpaInput">CGPA:</label>
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
        <div className='hod-button-div'>
        <button className='send' type="submit">SEND TO HOD</button>
        </div>
      </form>
  </div>
    </div>
  );
};

export default Irb;