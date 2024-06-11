
import React from 'react';
import './ProgressMonitoring.css';

const DRASideProgress= ({ formData, handleHodRecommendationChange }) => {
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
   
    </div>
  );
};

export default DRASideProgress;
