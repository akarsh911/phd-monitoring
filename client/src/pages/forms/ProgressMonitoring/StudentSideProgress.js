import React, { useState } from 'react';
import './ProgressMonitoring.css';
import '../ThesisSubmission/ThesisSub.css';

const StudentSideProgress = ({ formData }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [teachingWork, setTeachingWork] = useState(null);

  const handleTeachingWorkChange = (event) => {
    setTeachingWork(event.target.value);
  };

  return (
    <div className='student-form'>
     <div className='first'>
      <div className='data-input'>
          <label htmlFor="regnoInput">Roll Number</label>
          <input
            type="number"
            id="regnoInput"
            name="regno"
            value={formData.regno}
            readOnly
            required
          />
        </div>
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
        </div>
      <div className='data-input' id='appr'>
        <label className='bold-label'>Period of Report</label>
        <div>
          <input
            type="radio"
            id="periodJanToJune"
            name="reportPeriod"
            value={`Jan to June ${currentYear}`}
            required
          />
          <label htmlFor="periodJanToJune" className="small-label">{`Jan to June ${currentYear}`}</label>
        </div>
        <div>
          <input
            type="radio"
            id="periodJulyToDec"
            name="reportPeriod"
            value={`July to Dec ${currentYear}`}
            required
          />
          <label htmlFor="periodJulyToDec" className="small-label">{`July to Dec ${currentYear}`}</label>
        </div>
      </div>

      <div className='date-input'>
        <label htmlFor="irbMeetingDateInput">Date of IRB meeting</label>
        <input
          type="date"
          id="irbMeetingDateInput"
          name="irbMeetingDate"
          value={formData.irbMeetingDate}
          readOnly
          required
        />
      </div>
      <div className='data-input'>
        <label htmlFor="researchTitleInput">Title of PhD Thesis</label>
        <input
          type="text"
          id="researchTitleInput"
          name="researchTitle"
          value={formData.researchTitle}
          readOnly
          required
        />
      </div>

      <div className='data-input' id='appr'>
        <label className='bold-label'>Extension availed if any</label>
        <div>
          <input
            type="radio"
            id="extensionYes"
            name="extensionAvailed"
            value="Yes"
            required
          />
          <label htmlFor="extensionYes" className="small-label">Yes</label>
        </div>
        <div>
          <input
            type="radio"
            id="extensionNo"
            name="extensionAvailed"
            value="No"
            required
          />
          <label htmlFor="extensionNo" className="small-label">No</label>
        </div>
      </div>

      <div className='data-input' id='appr'>
        <label className='bold-label'>Publication during the period under report</label>
        <div>
          <input
            type="radio"
            id="publicationYes"
            name="publication"
            value="Yes"
            required
          />
          <label htmlFor="publicationYes" className="small-label">Yes</label>
        </div>
        <div>
          <input
            type="radio"
            id="publicationNo"
            name="publication"
            value="No"
            required
          />
          <label htmlFor="publicationNo" className="small-label">No</label>
        </div>
      </div>
       
      <div className='data-input'>
          <label htmlFor="regnoInput">Publications:</label>
           
          
        </div>
        <div className='data-input'>
      <label>Papers in SCI Journal</label>
      <table>
        <thead>
          <tr>
            <th>Author(s)</th>
            <th>Year of Publication</th>
            <th>Title of Paper</th>
            <th>Name of the Journal, Volume/page numbers</th>
            <th>Name of the Publisher</th>
            <th>Impact Factor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Example Title</td>
            <td>John Doe</td>
            <td>Journal of Example</td>
            <td>2023</td>
            <td>12</td>
            <td>34-56</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
    
    <div className='data-input'>
      <label>Papers in Scopus Journal</label>
      <table>
        <thead>
          <tr>
            <th>Author(s)</th>
            <th>Year of Publication</th>
            <th>Title of Paper</th>
            <th>Name of the Journal, Volume/page numbers</th>
            <th>Name of the Publisher</th>
            <th>Impact Factor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Example Title</td>
            <td>John Doe</td>
            <td>Journal of Example</td>
            <td>2023</td>
            <td>12</td>
            <td>34-56</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>


    <div className='data-input'>
      <label>Papers in International Conferences</label>
      <table>
        <thead>
          <tr>
            <th>Author(s)</th>
            <th>Year of Publication</th>
            <th>Title of Paper</th>
            <th>Name and Place of Conference</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Example Title</td>
            <td>John Doe</td>
            <td>Journal of Example</td>
            <td>2023</td>
            
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>

    <div className='data-input'>
      <label>Papers in Indian Conferences</label>
      <table>
        <thead>
          <tr>
            <th>Author(s)</th>
            <th>Year of Publication</th>
            <th>Title of Paper</th>
            <th>Name and Place of Conference</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Example Title</td>
            <td>John Doe</td>
            <td>Journal of Example</td>
            <td>2023</td>
            
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
       


    <div className='data-input'>
      <label>Books</label>
      <table>
        <thead>
          <tr>
            <th>Name of Book</th>
            <th>Chapter Title</th>
            <th>Year of Publication</th>
            <th>Name of Publisher</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Example Title</td>
            <td>John Doe</td>
            <td>Journal of Example</td>
            <td>2023</td>

          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>

    <div className='data-input'>
      <label>Patents</label>
      <table>
        <thead>
          <tr>
            <th>Author(s)</th>
            <th>Year of Award</th>
            <th>Title of Patent</th>
            <th>Patent Number</th>
            <th>International/Indian</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Example Title</td>
            <td>John Doe</td>
            <td>Journal of Example</td>
            <td>2023</td>
            <td>12</td>
            
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>



      <div className='data-input' id='appr'>
        <label className='bold-label'>Teaching work, if any done during the period under report</label>
        <div>
          <input
            type="radio"
            id="teachingWorkYes"
            name="teachingWork"
            value="Yes"
            onChange={handleTeachingWorkChange}
            required
          />
          <label htmlFor="teachingWorkYes" className="small-label">Yes</label>
        </div>
        <div>
          <input
            type="radio"
            id="teachingWorkNo"
            name="teachingWork"
            value="No"
            onChange={handleTeachingWorkChange}
            required
          />
          <label htmlFor="teachingWorkNo" className="small-label">No</label>
        </div>
      </div>

      {teachingWork === "Yes" && (
        <div className='data-input' id='appr'>
          <label className='bold-label'>Level</label>
          <div>
            <input
              type="checkbox"
              id="ug"
              name="teachingLevel"
              value="UG"
            />
            <label htmlFor="ug" className="small-label">UG</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="pg"
              name="teachingLevel"
              value="PG"
            />
            <label htmlFor="pg" className="small-label">PG</label>
          </div>
        </div>
      )}

      <div className='supervisor-button-div'>
        <button className='send' type="submit">SEND TO SUPERVISOR</button>
      </div>
    </div>
  );
};

export default StudentSideProgress;
