import React from 'react';
import './ConstituteOfIrb.css';
import './SupSideIrb.css';

const DoRDCSideIrb = ({ formData, options, handleDoRDCChange }) => {
    return (
        <div className='DoRDCSide-form'>
          <div className='data-input'>
            <label htmlFor="expertfromIrbInput">One expert from the IRB panel of outside experts of concerned department</label>
            <select
              id="expertfromIrbInput"
              name="expertfromIRB"
              value={formData.expertfromIRB}
              onChange={(e) => handleDoRDCChange(e.target.name, e.target.value)}
              required
            >
              <option value="">Select Expert</option>
              {options.dorDCExpertsOptions?.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className='data-input'>
            <label htmlFor="nomineeInput"> One nominee of the DoRDC in the cognate area from the Institute</label>
            <select
              id="nomineeInput"
              name="nomineeDoRDC"
              value={formData.nomineeDoRDC}
              onChange={(e) => handleDoRDCChange(e.target.name, e.target.value)}
              required
            >
              <option value="">Select Nominee</option>
              {options.dorDCExpertsOptions?.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className='two-button'>
          <div className='supervisor-button-div'>
        <button className='send' type="submit">Disapprove</button>
      </div>
      <div className='supervisor-button-div'>
        <button className='send' type="submit">Approve send to DR(A)</button>
      </div>
      </div>
        </div>
      );
};

export default DoRDCSideIrb;
