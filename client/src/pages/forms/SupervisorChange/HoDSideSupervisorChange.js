// HodRecommendationSection.js
import React from 'react';
import './SupervisorChange';

const HodSideSupervisorChange= ({ formData, handleHodRecommendationChange, handleChange }) => {
  return (
    <div className='hodSide-form'>
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
      <label>Allot new Supervisor</label>
    {formData.selectedSupervisors.map((selectedSupervisor, index) => (
      <div key={index}>
        <label htmlFor={`newSupervisor-${index}`}> {selectedSupervisor}:</label>
        <input
          type="text"
          id={`newSupervisor-${index}`}
          name="newSupervisor"
          value={formData.newSupervisors[index] || ''}
          onChange={handleChange}
        />
      </div>
    ))}
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
        <button className='send' type="submit">Send to DoRDC</button>
      </div>
    </div>
  );
};

export default HodSideSupervisorChange;
