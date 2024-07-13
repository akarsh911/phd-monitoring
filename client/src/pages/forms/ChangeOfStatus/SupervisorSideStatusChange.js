import './StatusChange.css'; 
import React from 'react';

const SupervisorSideStatusChange = ({ formData, handleSupRecommendationChange }) => {
  return (
    <div className='supervisorSide-form'>
      <div className='data-input' id='appr'>
        <label htmlFor="supervisorRecommendation">Recommendation of Supervisor</label>
        <div>
          <input
            type="radio"
            id="supervisorApproved"
            name="supervisorRecommendation"
            value="approved"
            checked={formData.supervisorRecommendation === 'approved'}
            onChange={handleSupRecommendationChange}
            required
          />
          <label htmlFor="supervisorApproved" className="small-label">Approved</label>
        </div>
        <div>
          <input
            type="radio"
            id="supervisorNotApproved"
            name="supervisorRecommendation"
            value="notApproved"
            checked={formData.supervisorRecommendation === 'notApproved'}
            onChange={handleSupRecommendationChange}
            required
          />
          <label htmlFor="supervisorNotApproved" className="small-label">Not Approved</label>
        </div>
      </div>
      <div className='data-input'>
        <label htmlFor="supervisorRemarks">Remarks (if any)</label>
        <input
          type="text"
          id="supervisorRemarks"
          name="supervisorRemarks"
          value={formData.supervisorRemarks}
        />
      </div>
      <div className='supervisor-button-div'>
        <button className='send' type="submit">SEND TO HoD</button>
      </div>
    </div>
  );
};

export default SupervisorSideStatusChange;
