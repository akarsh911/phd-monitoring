import './ThesisExtension.css'; 
import React from 'react';

const DocComSideThesisExtension = ({ formData, handleSupRecommendationChange }) => {
  return (
    <div className='DocComSide-form'>
      <div className='data-input' id='appr'>
        <label htmlFor="DocComRecommendation">Recommendation of Doctoral Committee</label>
        <div>
          <input
            type="radio"
            id="DocComApproved"
            name="DocComRecommendation"
            value="approved"
            checked={formData.DocComRecommendation === 'approved'}
            onChange={handleSupRecommendationChange}
            required
          />
          <label htmlFor="DocComApproved" className="small-label">Approved</label>
        </div>
        <div>
          <input
            type="radio"
            id="DocComNotApproved"
            name="DocComRecommendation"
            value="notApproved"
            checked={formData.DocComRecommendation === 'notApproved'}
            onChange={handleSupRecommendationChange}
            required
          />
          <label htmlFor="DocComNotApproved" className="small-label">Not Approved</label>
        </div>
      </div>
      <div className='data-input'>
        <label htmlFor="DocComRemarks">Remarks (if any)</label>
        <input
          type="text"
          id="DocComRemarks"
          name="DocComRemarks"
          value={formData.DocComRemarks}
        />
      </div>
      <div className='supervisor-button-div'>
        <button className='send' type="submit">SEND TO HoD</button>
      </div>
    </div>
  );
};

export default DocComSideThesisExtension;
