import React, { useState, useEffect } from "react";
import './IrbSubmissionSup.css';
import { SERVER_URL } from "../../config";
import { useParams } from "react-router-dom";

const IrbSup = () => {
  const initialFormData = {
    name: '',
    department: '',
    designation: '',
    numberOfStudentsInside: '',
    numberOfStudentsOutside: '',  
    hodRecommendation: '',
    hodRemarks: '',
    draRecommendation: '',
    draRemark: '',
    dordcRecommendation: '',
    dordcRemarks: ''
  };
  
  const initialFormData2 = {
    name: '',
    designation: '',
    institute: '',
    address: '',
    number: '',
    email: ''
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/forms/irb/submission/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            student_id: params.id,
          }),
        });
        const data = await response.json();
        console.log(data);
        setFormData({
          name: data.supervisors[0].name,
          department: data.supervisors[0].department,
          designation: data.supervisors[0].designation,
          numberOfStudentsInside: data.supervisors[0].campus,
          numberOfStudentsOutside: data.supervisors[0].outside,  
          hodRecommendation: data.HODRecommendation,
          hodRemarks: data.HODComments,
          draRecommendation:data.DRARecommendation,
          draRemark: data.DRAComments,
          dordcRecommendation: data.DORDCRecommendation,
          dordcRemarks: data.DORDCComments,
        });
        console.log("formData");
        console.log(formData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [formData, setFormData] = useState(initialFormData);
  const [formData2, setFormData2] = useState(initialFormData2);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleHodRecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      hodRecommendation: e.target.value
    }));
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
const params = useParams();
  return (
    <div className='studentsideBody-div'>
      <div className='studentsideform-div'>
        <div className='heading'>
          {/* <h1>IRB SUBMISSION FORM</h1> */}
        </div>
        <form onSubmit={handleSubmit} >
          {/* <div className="hodSide-form"> */}
       <div className="first">
          <div className='data-input'>
          <label htmlFor="firstNameInput"> Name</label>
          <input
            type="text"
            id="firstNameInput"
            name="firstName"
            value={formData.name}
            readOnly
            required
          />
        </div>
        </div>
        <div className='first'>
        <div className='data-input'>
          <label htmlFor="firstNameInput"> Department</label>
          <input
            type="text"
            id="firstNameInput"
            name="firstName"
            value={formData.department}
            readOnly
            required
          />
        </div>
        <div className='data-input'>
          <label htmlFor="firstNameInput"> Designation</label>
          <input
            type="text"
            id="firstNameInput"
            name="firstName"
            value={formData.designation}
            readOnly
            required
          />
        </div>
          </div>

          <div className='second'>
  <div className='data-input'>
    <label htmlFor="numberInputInside">Total number of students under guidance inside TIET (including this applicant )</label>
    <input
      type="number"
      id="numberInputInside"
      name="numberOfStudentsInside"
      value={formData.numberOfStudentsInside}
      onChange={handleChange}
      required
    />
  </div>
  <div className='data-input'>
    <label htmlFor="numberInputOutside">Total number of students under guidance outside TIET (including this applicant )</label>
    <input
      type="number"
      id="numberInputOutside"
      name="numberOfStudentsOutside"
      value={formData.numberOfStudentsOutside}
      onChange={handleChange}
      required
    />
  </div>
</div>
<div className='supervisor-button-div'>
        <button className='send' type='submit'>Update</button>
      </div>
<div className='supervisor-button-div'>
        <button className='send' type='submit'>SEND TO HOD</button>
      </div>
      {/* </div> */}


      {/* <div className='hodSide-form'> */}
      <div className='data-input' id='appr'>
        <label htmlFor="hodRecommendation">Recommendation of HOD</label>
        <div>
          <input
            type="radio"
            id="approved"
            name="hodRecommendation"
            value="approved"
            checked={formData.hodRecommendation === 'approved'}
            onChange={handleHodRecommendationChange}
            required
          />
          <label htmlFor="approved" className="small-label">Approved</label>
        </div>
        <div>
          <input
            type="radio"
            id="notApproved"
            name="hodRecommendation"
            value="notApproved"
            checked={formData.hodRecommendation === 'notApproved'}
            onChange={handleHodRecommendationChange}
            required
          />
           <label htmlFor="notApproved" className="small-label">Not Approved</label>
        </div>
      </div>
      <div className='data-input'>
        <label htmlFor="HodRemarks">Remarks (if any)</label>
        <input
          type="text"
          id="hodRemarks"
          name="hodRemarks"
          value={formData.hodRemarks}
        />
      </div>
      <div className='supervisor-button-div'>
        <button className='send' type="submit">SEND TO DR(A)</button>
      </div>
    {/* </div> */}


    {/* <div className='DrASide-form'> */}
      <div className='data-input' id='appr'>
        <label htmlFor="hodRecommendation">Recommendation of DR(A)</label>
        <div>
          <input
            type="radio"
            id="approved"
            name="hodRecommendation"
            value="approved"
            checked={formData.draRecommendation === 'approved'}
            onChange={handleHodRecommendationChange}
            required
          />
          <label htmlFor="approved" className="small-label">Approved</label>
        </div>
        <div>
          <input
            type="radio"
            id="notApproved"
            name="hodRecommendation"
            value="notApproved"
            checked={formData.draRecommendation === 'notApproved'}
            onChange={handleHodRecommendationChange}
            required
          />
           <label htmlFor="notApproved" className="small-label">Not Approved</label>
        </div>
      </div>
      <div className='data-input'>
        <label htmlFor="HodRemarks">Remarks (if any)</label>
        <input
          type="text"
          id="hodRemarks"
          name="hodRemarks"
          value={formData.draRemark}
        />
      </div>
      <div className='supervisor-button-div'>
        <button className='send' type="submit">SEND TO DoRDC</button>
      </div>
    {/* </div> */}
    {/* <div className='DoRDCSide-form'> */}
      <div className='data-input' id='appr'>
        <label htmlFor="hodRecommendation">Recommendation of DoRDC</label>
        <div>
          <input
            type="radio"
            id="approved"
            name="hodRecommendation"
            value="approved"
            checked={formData.dordcRecommendation === 'approved'}
            onChange={handleHodRecommendationChange}
            required
          />
          <label htmlFor="approved" className="small-label">Approved</label>
        </div>
        <div>
          <input
            type="radio"
            id="notApproved"
            name="hodRecommendation"
            value="notApproved"
            checked={formData.dordcRecommendation === 'notApproved'}
            onChange={handleHodRecommendationChange}
            required
          />
           <label htmlFor="notApproved" className="small-label">Not Approved</label>
        </div>
      </div>
      <div className='data-input'>
        <label htmlFor="HodRemarks">Remarks (if any)</label>
        <input
          type="text"
          id="hodRemarks"
          name="hodRemarks"
          value={formData.dordcRemarks}
        />
      </div>
      <div className='supervisor-button-div'>
        <button className='send' type='submit'>SUBMIT</button>
      </div>
    
    {/* </div> */}
        
        </form>
        </div>
    </div>

        // {/* second part */}

      //   {/* <div className='small-heading'>
      //     <h2>To be filled if supervisor is from outside TIET</h2>
      //   </div>
      //   <form onSubmit={handleSubmit} id="form2" className='irbSubSupform'>
      //     <div className='first'>
      //     <div className='data-input'>
      //     <label htmlFor="firstNameInput"> Name</label>
      //     <input
      //       type="text"
      //       id="firstNameInput"
      //       name="firstName"
      //       value={formData.firstName}
      //       readOnly
      //       required
      //     />
      //   </div>
      //   <div className='data-input'>
      //     <label htmlFor="firstNameInput"> Designation</label>
      //     <input
      //       type="text"
      //       id="firstNameInput"
      //       name="firstName"
      //       value={formData.firstName}
      //       readOnly
      //       required
      //     />
      //   </div>
      //   <div className='data-input'>
      //     <label htmlFor="firstNameInput"> Name of Institute</label>
      //     <input
      //       type="text"
      //       id="firstNameInput"
      //       name="firstName"
      //       value={formData.firstName}
      //       readOnly
      //       required
      //     />
      //   </div>
      //     </div>
      //     <div className='data-input'>
      //       <label htmlFor="addressInput">Address for correspondence</label>
      //       <input
      //         type="text"
      //         id="addressInput"
      //         name="address"
      //         value={formData2.address}
      //         onChange={handleChange}
      //         required
      //       />
      //     </div>
      //     <div className='first'>
      //       <div className='data-input'>
      //         <label htmlFor="numberInput">Contact Number</label>
      //         <input
      //           type="tel"
      //           id="numberInput"
      //           name="number"
      //           value={formData2.number}
      //           onChange={handleChange}
      //           required
      //         />
      //       </div>
      //       <div className='data-input'>
      //         <label htmlFor="emailInput">Email</label>
      //         <input
      //           type="text"
      //           id="emailInput"
      //           name="email"
      //           value={formData2.email}
      //           onChange={handleChange}
      //           required
      //         />
      //       </div>
      //       <div className='upload-input'>
      //         <label>
      //           Upload NOC
      //           <input
      //             type="file"
      //             id='upload-noc'
      //             onChange={handleFileChange}
      //           />
      //         </label>
      //       </div>
      //     </div>

      //     <div className='addmore-button'>
      //       <button className='addmore' onClick={handleAddMoreForm2}>Add more +</button>
      //     </div>
      //   </form> */
      //  }
  );
};

export default IrbSup;