// PHDCoordinatorRecommendationSection.js
import React from 'react';
import './SupervisorChange';

const PHDCoordinatorSideSupervisorChange= ({ formData, handlePHDCoordinatorRecommendationChange }) => {
  return (
    <div className='PHDCoordinatorSide-form'>
      <div className='data-input' id='appr'>
        <label htmlFor="PHDCoordinatorRecommendation">Recommendation of PHD Coordinator</label>
        <div>
          <input
            type="radio"
            id="approved"
            name="PHDCoordinatorRecommendation"
            value="approved"
            checked={formData.PHDCoordinatorRecommendation === 'approved'}
            onChange={handlePHDCoordinatorRecommendationChange}
            required
          />
          <label htmlFor="approved" className="small-label">Approved</label>
        </div>
        <div>
          <input
            type="radio"
            id="notApproved"
            name="PHDCoordinatorRecommendation"
            value="notApproved"
            checked={formData.PHDCoordinatorRecommendation === 'notApproved'}
            onChange={handlePHDCoordinatorRecommendationChange}
            required
          />
           <label htmlFor="notApproved" className="small-label">Not Approved</label>
        </div>
      </div>
      <div className='data-input'>
        <label htmlFor="PHDCoordinatorRemarks">Remarks (if any)</label>
        <input
          type="text"
          id="PHDCoordinatorRemarks"
          name="PHDCoordinatorRemarks"
          value={formData.PHDCoordinatorRemarks}
        />
      </div>
      <div className='supervisor-button-div'>
        <button className='send' type="submit">SEND TO HoD</button>
      </div>
    </div>
  );
};

export default PHDCoordinatorSideSupervisorChange;
