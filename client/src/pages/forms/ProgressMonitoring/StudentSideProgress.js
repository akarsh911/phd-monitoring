import React from 'react';
import { useState, useEffect } from 'react';
import './ProgressMonitoring.css';
const StudentSideProgress = ({ formData }) => {

    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  return (
    <div className='student-form'>
     
        <div className='data-input'>
          <label htmlFor="nameInput">Name</label>
          <input
            type="text"
            id="nameInput"
            name="name"
            value={formData.name}
            readOnly
            required
          />
        </div>
        <div className='data-input' id='appr'>
      <label className='bold-label'>Period of Report</label>
      <div>
        <input
          type="radio"
          id="periodJanToJune"
          name="reportPeriod"
          value={` Jan to June ${currentYear}`}
          required
        />
        <label htmlFor="periodJanToJune" className="small-label">{`Jan to June ${currentYear} `}</label>
      </div>
      <div>
        <input
          type="radio"
          id="periodJulyToDec"
          name="reportPeriod"
          value={` July to Dec ${currentYear} `}
          required
        />
        <label htmlFor="periodJulyToDec" className="small-label">{`July to Dec ${currentYear} `}</label>
      </div>
    </div>

   
      
        <div className='date-input'>
          <label htmlFor="admissionDateInput">Date of IRB meeting</label>
          <input
            type="date"
            id="admissionDateInput"
            name="admissionDate"
            value={formData.admissionDate}
            readOnly
            required
          />
        </div>
        <div className='data-input'>
          <label htmlFor="regnoInput">Title of Research Proposal</label>
          <input
            type="number"
            id="regnoInput"
            name="regno"
            value={formData.regno}
            readOnly
            required
          />
        </div>
      
     
        <div className='data-input' id='appr'>
      <label className='bold-label'>Extension availed if any</label>
      <div>
        <input
          type="radio"
          id="periodJanToJune"
          name="reportPeriod"
          value={` Jan to June ${currentYear}`}
          required
        />
        <label htmlFor="periodJanToJune" className="small-label">Yes</label>
      </div>
      <div>
        <input
          type="radio"
          id="periodJulyToDec"
          name="reportPeriod"
          value={` July to Dec ${currentYear} `}
          required
        />
        <label htmlFor="periodJulyToDec" className="small-label">No</label>
      </div>
    </div>
    <div className='data-input' id='appr'>
      <label className='bold-label'>Publication during the period under report</label>
      <div>
        <input
          type="radio"
          id="periodJanToJune"
          name="reportPeriod"
          value={` Jan to June ${currentYear}`}
          required
        />
        <label htmlFor="periodJanToJune" className="small-label">Yes</label>
      </div>
      <div>
        <input
          type="radio"
          id="periodJulyToDec"
          name="reportPeriod"
          value={` July to Dec ${currentYear} `}
          required
        />
        <label htmlFor="periodJulyToDec" className="small-label">No</label>
      </div>
    </div>
    <div className='data-input' id='appr'>
      <label className='bold-label'>Teaching work, if any done during the period under report  </label>
      <div>
        <input
          type="radio"
          id="periodJanToJune"
          name="reportPeriod"
          value={` Jan to June ${currentYear}`}
          required
        />
        <label htmlFor="periodJanToJune" className="small-label">UG</label>
      </div>
      <div>
        <input
          type="radio"
          id="periodJulyToDec"
          name="reportPeriod"
          value={` July to Dec ${currentYear} `}
          required
        />
        <label htmlFor="periodJulyToDec" className="small-label">PG</label>
      </div>
    </div>
      
      <div className='supervisor-button-div'>
        <button className='send' type="submit">SEND TO DOCTORAL COMMITTEE</button>
      </div>
    </div>
  );
};

export default StudentSideProgress;
