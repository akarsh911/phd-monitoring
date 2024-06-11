import React, { useEffect, useState } from 'react';
import './SupSideIrb.css';
import './ConstituteOfIrb.css';

const HodSideIrb = ({
  formData,
  options,
  handleExpertChange,
  handleChairmanExpertChange,
  addChairmanExpert,
  handleHodRecommendationChange
}) => {
  const [prefilledData, setPrefilledData] = useState({
    expertfromIRB: '',
    nomineeDoRDC: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(''); // API endpoint
        const data = await response.json();
        setPrefilledData({
          expertfromIRB: data.expertfromIRB || '',
          nomineeDoRDC: data.nomineeDoRDC || ''
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='hodSide-form'>
      <div className='data-input'>
        <label>List of 3 outside experts Proposed by the HOD</label>
        <table>
          <tbody>
            {formData.experts.map((expert, index) => (
              <tr key={index}>
                <td>
                  <select
                    value={expert}
                    onChange={(e) => handleExpertChange(index, e.target.value)}
                    required
                  >
                    <option value="">Select Expert</option>
                    {options.experts.map((option, idx) => (
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

      <div className='data-input'>
        <label htmlFor="chairmanExpertInput">Expert(s) recommended by chairman board of the studies of concerned department in cognate area of department</label>
        {formData.chairmanExperts.map((expert, index) => (
          <div key={index} className='chairman-expert-input'>
            <select
              id="chairmanExpertInput"
              name="chairmanExpert"
              value={expert}
              onChange={(e) => handleChairmanExpertChange(index, e.target.value)}
              required
            >
              <option value="">Select Expert</option>
              {options.chairmanExpertsOptions.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button type="button" onClick={addChairmanExpert} className='add-button'>
          +
        </button>
      </div>
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
        <label htmlFor="expertInput">One expert from the IRB panel of outside experts of concerned department</label>
        <input
          type="text"
          id="expertfromIrbInput"
          name="expertfromIrb"
          value={prefilledData.expertfromIRB}
          readOnly
          required
        />
      </div>
      <div className='data-input'>
        <label htmlFor="nomineeInput">Nominee of the DoRDC in cognate area from the institute</label>
        <input
          type="text"
          id="nomineeInput"
          name="nomineeDoRDC"
          value={prefilledData.nomineeDoRDC}
          readOnly
          required
        />
      </div>
      <div className='supervisor-button-div'>
        <button className='send' type="submit">SEND TO DoRDC</button>
      </div>
    </div>
  );
};

export default HodSideIrb;
