// HodRecommendationSection.js
import React, { useState } from 'react';
import './ProgressMonitoring.css';
import { toast } from 'react-toastify';
import { SERVER_URL } from '../../../config';


const HodSideProgress= ({ formData, handleHodRecommendationChange }) => {
  
const [approval, setApproval] = useState('');
const handleHODReviewChange = (e) => {
  console.log(e.target.value);
  setApproval(e.target.value);
}

const submitForm = async (e) => {
  e.preventDefault();
  const data={
    progress:approval,
    student_id:formData.regno,
  }

  try {
    const response = await fetch(
      `${SERVER_URL}/presentation/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      const data = await response.json();
      toast.success("Successfully updated preferences");
    } else {
      const msg = await response.json();
      toast.error(msg.message);
      throw response;
    }
  } catch (error) {
    console.error(error);
  }
}
  return (
    <div className='hodSide-form'>
      <div className='data-input' id='appr'>
        <label htmlFor="hodRecommendation">Recommendation of HOD</label>
        <div>
          <input
            type="radio"
            id="approved"
            name="hodRecommendation"
            value="satisfactory"
            checked={approval === 'satisfactory'}
            onChange={handleHODReviewChange}
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
            checked={approval === 'not satisfactory'}
            onChange={handleHODReviewChange}
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
        <button className='send' type="submit" onClick={submitForm}>SEND TO DoRDC</button>
      </div>
    </div>
  );
};

export default HodSideProgress;
