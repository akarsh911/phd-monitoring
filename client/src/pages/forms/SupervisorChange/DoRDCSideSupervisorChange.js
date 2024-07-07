
import React from 'react';
import './SupervisorChange';

const DoRDCSideSupervisorChange= ({ formData, handleHodRecommendationChange }) => {
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
    </div>
  );
};

export default DoRDCSideSupervisorChange;
