import React from 'react';
import './SupSideIrb.css';
import './ConstituteOfIrb.css';

const SupSideIrb = ({ formData, options, handleNomineeChange, handleRecommendationChange }) => {
  return (
    <div className='supervisor-form'>
      <div className='data-input' id='appr'>
        <label htmlFor="supervisorRecommendation">Recommendation of Supervisor</label>
        <div>
          <input
            type="radio"
            id="supervisorApproved"
            name="supervisorRecommendation"
            value="approved"
            checked={formData.supervisorRecommendation === 'approved'}
            onChange={handleRecommendationChange}
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
            onChange={handleRecommendationChange}
            required
          />
          <label htmlFor="supervisorNotApproved" className="small-label">Not Approved</label>
        </div>
      </div>

      <div className='data-input'>
        <label>List of 3 nominees of the DoRDC in cognate area from the institute</label>
        <table>
          <tbody>
            {formData.nominees.map((nominee, index) => (
              <tr key={index}>
                <td>
                  <select
                    value={nominee}
                    onChange={(e) => handleNomineeChange(index, e.target.value)}
                    required
                  >
                    <option value="">Select Nominee</option>
                    {options.nominees.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='supervisor-button-div'>
        <button className='send' type="submit">SEND TO HOD</button>
      </div>
    </div>
  );
};

export default SupSideIrb;
