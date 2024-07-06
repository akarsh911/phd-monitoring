import './ThesisExtension.css';
import React from 'react';


const DirectorSideThesisExtension = ({ formData, handleDirectorRecommendationChange }) => {
  return (
    <div className='supervisorSide-form'>
      <div className='data-input' id='appr'>
        <label htmlFor="DirectorRecommendation">Recommendation of Director</label>
        <div>
          <input
            type="radio"
            id="approved"
            name="DirectorRecommendation"
            value="approved"
            checked={formData.DirectorRecommendation === 'approved'}
            onChange={handleDirectorRecommendationChange}
            required
          />
          <label htmlFor="approved" className="small-label">Approved</label>
        </div>
        <div>
          <input
            type="radio"
            id="notApproved"
            name="DirectorRecommendation"
            value="notApproved"
            checked={formData.DirectorRecommendation === 'notApproved'}
            onChange={handleDirectorRecommendationChange}
            required
          />
           <label htmlFor="notApproved" className="small-label">Not Approved</label>
        </div>
      </div>
      <div className='data-input'>
        <label htmlFor="DirectorRemarks">Remarks (if any)</label>
        <input
          type="text"
          id="DirectorRemarks"
          name="DirectorRemarks"
          value={formData.DirectorRemarks}
        />
      </div>
      <div className='supervisor-button-div'>
        <button className='send' type="submit">Submit</button>
      </div>
    </div>
  );
};

export default DirectorSideThesisExtension;
