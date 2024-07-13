import './ThesisExtension.css';
import React from 'react';


const DrASideThesisExtension = ({ formData, handleDrARecommendationChange }) => {
  return (
    <div className='DrASide-form'>
      <div className='data-input' id='appr'>
        <label htmlFor="DrARecommendation">Recommendation of Dr(A)</label>
        <div>
          <input
            type="radio"
            id="approved"
            name="DrARecommendation"
            value="approved"
            checked={formData.DrARecommendation === 'approved'}
            onChange={handleDrARecommendationChange}
            required
          />
          <label htmlFor="approved" className="small-label">Approved</label>
        </div>
        <div>
          <input
            type="radio"
            id="notApproved"
            name="DrARecommendation"
            value="notApproved"
            checked={formData.DrARecommendation === 'notApproved'}
            onChange={handleDrARecommendationChange}
            required
          />
           <label htmlFor="notApproved" className="small-label">Not Approved</label>
        </div>
      </div>
      <div className='data-input'>
        <label htmlFor="DrARemarks">Remarks (if any)</label>
        <input
          type="text"
          id="DrARemarks"
          name="DrARemarks"
          value={formData.DrARemarks}
        />
      </div>
      <div className='supervisor-button-div'>
        <button className='send' type="submit">SEND TO DoRDC</button>
      </div>
    </div>
  );
};

export default DrASideThesisExtension;
