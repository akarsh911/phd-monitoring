import './ThesisSub.css';
import React from 'react';


const DoRDCSideThesis = ({ formData, handleDoRDCRecommendationChange }) => {
  return (
    <div className='DoRDCSide-form'>
      <div className='data-input' id='appr'>
        <label htmlFor="DoRDCRecommendation">Recommendation of DoRDC</label>
        <div>
          <input
            type="radio"
            id="approved"
            name="DoRDCRecommendation"
            value="approved"
            checked={formData.DoRDCRecommendation === 'approved'}
            onChange={handleDoRDCRecommendationChange}
            required
          />
          <label htmlFor="approved" className="small-label">Approved</label>
        </div>
        <div>
          <input
            type="radio"
            id="notApproved"
            name="DoRDCRecommendation"
            value="notApproved"
            checked={formData.DoRDCRecommendation === 'notApproved'}
            onChange={handleDoRDCRecommendationChange}
            required
          />
           <label htmlFor="notApproved" className="small-label">Not Approved</label>
        </div>
      </div>
      <div className='data-input'>
        <label htmlFor="DoRDCRemarks">Remarks (if any)</label>
        <input
          type="text"
          id="DoRDCRemarks"
          name="DoRDCRemarks"
          value={formData.DoRDCRemarks}
        />
      </div>
      <div className='supervisor-button-div'>
        <button className='send' type="submit">SUBMIT</button>
      </div>
    </div>
  );
};

export default DoRDCSideThesis;
