import React, { useState } from 'react';
import './IrbSubmissionSup.css';

const Irb = () => {
  const initialFormData = {
    name: '',
    department: '',
    designation: '',
    numberOfStudentsInside: '',
    numberOfStudentsOutside: '',  
  };
  
  const initialFormData2 = {
    name: '',
    designation: '',
    institute: '',
    address: '',
    number: '',
    email: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formData2, setFormData2] = useState(initialFormData2);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleChange = (e, formId) => {
    const { name, value } = e.target;
    if (formId === "form1") {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    } else {
      setFormData2(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleAddMoreForm1 = () => {
    setFormData(initialFormData);
    setSelectedFile(null);
  };

  const handleAddMoreForm2 = () => {
    setFormData2(initialFormData2);
    setSelectedFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedFile);
  };

  return (
    <div className='irbSubSupbody-div'>
      <div className='irbSubSupform-div'>
        <div className='heading'>
          <h1>IRB SUBMISSION FORM</h1>
        </div>
        <div className='small-heading'>
          <h2>To be filled by supervisors from TIET</h2>
        </div>
        <form onSubmit={handleSubmit} id="form1" className='irbSubSupform'>
          <div className='first'>
            <div className='data-input'>
              <label htmlFor="nameInput">Name</label>
              <select
                id="nameInput"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              >
                <option value="">Select Name</option>
              </select>
            </div>
            <div className='data-input'>
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
            <div className='data-input'>
              <label htmlFor="designationInput">Designation</label>
              <select
                id="designationInput"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              >
                <option value="">Select Designation</option>
              </select>
            </div>
          </div>

          <div className='second'>
            <div className='data-input'>
              <label htmlFor="numberInput">Total number of students under guidance inside TIET (including this applicant )</label>
              <select
                id="numberInput"
                name="numberOfStudentsInside"
                value={formData.numberOfStudentsInside}
                onChange={handleChange}
                required
              >
                <option value="">Select Number</option>
              </select>
            </div>
            <div className='data-input'>
              <label htmlFor="numberInput">Total number of students under guidance outside TIET (including this applicant )</label>
              <select
                id="numberInput"
                name="numberOfStudentsOutside"
                value={formData.numberOfStudentsOutside}
                onChange={handleChange}
                required
              >
                <option value="">Select Number</option>
              </select>
            </div>
          </div>

          <div className='addmore-button'>
            <button className='addmore' onClick={handleAddMoreForm1}>Add more +</button>
          </div>
        </form>

        {/* second part */}

        <div className='small-heading'>
          <h2>To be filled if supervisor is from outside TIET</h2>
        </div>
        <form onSubmit={handleSubmit} id="form2" className='form'>
          <div className='first'>
            <div className='data-input'>
              <label htmlFor="nameInput">Name</label>
              <select
                id="nameInput"
                name="name"
                value={formData2.name}
                onChange={handleChange}
                required
              >
                <option value="">Select Name</option>
              </select>
            </div>
            <div className='data-input'>
              <label htmlFor="designationInput">Designation</label>
              <select
                id="designationInput"
                name="designation"
                value={formData2.designation}
                onChange={handleChange}
                required
              >
                <option value="">Select Designation</option>
              </select>
            </div>
            <div className='data-input'>
              <label htmlFor="departmentInput">Name of Institute</label>
              <select
                id="instituteInput"
                name="institute"
                value={formData2.institute}
                onChange={handleChange}
                required
              >
                <option value="">Select Institute</option>
              </select>
            </div>
          </div>
          <div className='data-input'>
            <label htmlFor="addressInput">Address for correspondence</label>
            <input
              type="text"
              id="addressInput"
              name="address"
              value={formData2.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className='first'>
            <div className='data-input'>
              <label htmlFor="numberInput">Contact Number</label>
              <input
                type="tel"
                id="numberInput"
                name="number"
                value={formData2.number}
                onChange={handleChange}
                required
              />
            </div>
            <div className='data-input'>
              <label htmlFor="emailInput">Email</label>
              <input
                type="text"
                id="emailInput"
                name="email"
                value={formData2.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='upload-input'>
              <label>
                Upload NOC
                <input
                  type="file"
                  id='upload-noc'
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <div className='addmore-button'>
            <button className='addmore' onClick={handleAddMoreForm2}>Add more +</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Irb;