
import React from 'react';
import './ProgressMonitoring.css';
import { toast } from 'react-toastify';
import { SERVER_URL } from '../../../config';

const DRASideProgress= ({ formData, handleHodRecommendationChange }) => {
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
    <div className='DrASide-form'>
      <div className='data-input' id='appr'>
        <label htmlFor="hodRecommendation">Recommendation of DR(A)</label>
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
        <button className='send' type="submit" onSubmit={submitForm}>Submit</button>
      </div>
    </div>
  );
};

export default DRASideProgress;
