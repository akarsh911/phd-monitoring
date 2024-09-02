
import React from 'react';
import './ListOfExaminer';
import { toast } from 'react-toastify';

const DoRDCSideListOfExaminer= ({ formData, handleHodRecommendationChange }) => {
  const hello = () => {
    localStorage.setItem("datalist", JSON.stringify(formData));
    toast.success("Send to Director successfully");
  }
  return (
    <div className='DoRDCSide-form'>
      <div className='data-input' id='appr'>
        <label htmlFor="hodRecommendation">Recommendation of DoRDC</label>
        
        <div>
          <input
            type="radio"
            id="approved"
            name="hodRecommendation"
            value="approved"
            checked={formData.hodRecommendation === 'approved'}
            onChange={handleHodRecommendationChange}
            // required
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
            // required
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
        <button className='send' type="submit" onClick={hello}>SEND TO Director</button>
      </div>
    </div>
  );
};

export default DoRDCSideListOfExaminer;
