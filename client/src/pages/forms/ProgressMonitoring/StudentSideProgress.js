import React, { useState } from 'react';
import './ProgressMonitoring.css';
import '../ThesisSubmission/ThesisSub.css';
import { toast } from 'react-toastify';
import { SERVER_URL } from '../../../config';

const StudentSideProgress = ({ formData }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [teachingWork, setTeachingWork] = useState(null);
  const [teachingLevel, setTeachingLevel] = useState([]);
  const [periodOfReport, setPeriodOfReport] = useState(formData.period_of_report);
  
  const handlePeriodOfReportChange = (event) => {
    setPeriodOfReport(event.target.value);
    console.log(periodOfReport);
  }
  const handleTeachingWorkChange = (event) => {
    setTeachingWork(event.target.value);
  };
  const handleTeachingCheckChange = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    if (checked) {
      setTeachingLevel((prevTeachingWork) => [...prevTeachingWork, value]);
    } else {
      setTeachingLevel((prevTeachingWork) =>
        prevTeachingWork.filter((item) => item !== value)
      );
    }
    console.log(teachingLevel);
  }
  const extention= formData.extentions.length>0 ? 'Yes' : 'No';
  const isEditable= formData.student_lock;
  const sci = formData.publications.filter((pub) => pub.publication.type == 'journal' && pub.publication.journal_type == 'sci');

  const scopus= formData.publications.filter((pub)=>pub.publication.type == 'journal' && pub.publication.journal_type != 'sci');
  const international= formData.publications.filter((pub)=>pub.publication.type=='Conference' && pub.publication.conference_location!='India');  const indian= formData.publications.filter((pub)=>pub.publication.type=='Conference' && pub.publication.conference_location=='India');
  const publicationSem=formData.publications.length>0 ? 'Yes' : 'No';
  
  
  const submitForm = async (e) => {
    // e.preventDefault();
    let teach="None";
    if(teachingLevel.length>1)
    {
      teach="Both"; 
    }
    else if(teachingLevel.length==1){
      teach=teachingLevel[0];
    }
    const data={
      teaching_work:teach,
      period_of_report:periodOfReport,
    }
    
    try {
      const response = await fetch(`${SERVER_URL}/forms/irb/constitutuion/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });
      // const response=await
      
      if (response.ok) {
        const data = await response.json();
        console.log(data);
       if(data)
        toast.success("Success Submitting form")
      } else {
        var msg=await response.json()
        
        toast.error(msg.message);
        throw response;
      }

     
    } catch (error) {
      console.log("Error has occurred:", error);
      if (error instanceof Response) {
        error.json().then(data => {
          if (error.status === 422) {
            alert(data.message);
          } else if (error.status === 401) {
            alert("Invalid email or password");
          } else if (error.status === 500) {
            alert("Server error. Please try again later.");
          }
        }).catch(jsonError => {
          console.error('Error parsing JSON:', jsonError);
        });
      } else {
        console.error('Unexpected error:', error);
      }
    }
  
  }


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
        <div className="first">
      <div className='data-input' >
        <label className='bold-label'>Period of Report</label>
        <input
        type="text"
        id="nameInput"
        name="name"
        value={periodOfReport}
        readOnly={!isEditable}
        onChange={handlePeriodOfReportChange}
        required
      />
      </div>
      </div>
<div className="first">
      <div className='date-input'>
        <label htmlFor="irbMeetingDateInput">Date of IRB meeting</label>
        <input
          type="date"
          id="irbMeetingDateInput"
          name="irbMeetingDate"
          value={formData.date_of_irb}
          readOnly={!isEditable}
          required
        />
      </div>
      </div>
      <div className='data-input'>
        <label htmlFor="researchTitleInput">Title of PhD Thesis</label>
        <input
          type="text"
          id="researchTitleInput"
          name="researchTitle"
          value={formData.phd_title}
          readOnly={!isEditable}
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
            checked={extention == "Yes"}
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
            checked={extention == "No"}
            required
          />
          <label htmlFor="extensionNo" className="small-label">No</label>
        </div>
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

      {(teachingWork != "No" && teachingWork != null) && (
        <div className='data-input' id='appr'>
          <label className='bold-label'>Level</label>
          <div>
            <input
              type="checkbox"
              id="ug"
              name="teachingLevel"
              value="UG"
              onChange={handleTeachingCheckChange}
            />
            <label htmlFor="ug" className="small-label">UG</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="pg"
              name="teachingLevel"
              value="PG"
              onChange={handleTeachingCheckChange}
            />
            <label htmlFor="pg" className="small-label">PG</label>
          </div>
        </div>
      )}
      <div className='data-input' id='appr'>
        <label className='bold-label'>Publication during the period under report</label>
        <div>
          <input
            type="radio"
            id="publicationYes"
            name="publication"
            value="Yes"
            checked={publicationSem == "Yes"}
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
            checked={publicationSem == "No"}
            required
          />
          <label htmlFor="publicationNo" className="small-label">No</label>
        </div>
      </div>
       
      <div className='data-input'>
          <label htmlFor="regnoInput">Publications:</label>
           
          
        </div>
        <div className='supervisor-table'>
      <h2 className='headingg'>Papers in SCI Journal</h2>
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
        {sci.map((pub) => (
          <tr>
            <td>{pub.authors.join(", ")}</td>
            <td>{pub.publication.year_of_publication}</td>
            <td>{pub.publication.title}</td>
            <td>{pub.publication.journal_name},{pub.publication.volume}</td>
            <td>{pub.publication.publisher}</td>
            <td>{pub.publication.impact_factor}</td>
          </tr>))}
          {
            !sci.length && <tr><td colSpan="4">No Indian Conference Publications</td></tr>
          }
        </tbody>
      </table>
    </div>
    
    <div className='supervisor-table'>
      <h2 className='headingg'>Papers in Scopus Journal</h2>
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
          {
            scopus.map((pub) => (
              <tr>
                <td>{pub.authors.join(", ")}</td>
                <td>{pub.publication.year_of_publication}</td>
                <td>{pub.publication.title}</td>
                <td>{pub.publication.journal_name},{pub.publication.volume}</td>
                <td>{pub.publication.publisher}</td>
                <td>{pub.publication.impact_factor}</td>
              </tr>
            ))
          }
          {
            !scopus.length && <tr><td colSpan="4">No Indian Conference Publications</td></tr>
          }
         
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>


    <div className='supervisor-table'>
      <h2 className='headingg'>Papers in International Conferences</h2>
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
          {
            international.map((pub) => (
              <tr>
                <td>{pub.authors.join(", ")}</td>
                <td>{pub.publication.year_of_publication}</td>
                <td>{pub.publication.title}</td>
                <td>{pub.publication.conference_name},{pub.publication.conference_location}</td>
              </tr>
            ))
          }
          {
            !international.length && <tr><td colSpan="4">No Indian Conference Publications</td></tr>
          }
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>

    <div className='supervisor-table'>
      <h2 className='headingg'>Papers in Indian Conferences</h2>
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
          {
            indian.map((pub) => (
              <tr>
                <td>{pub.authors.join(", ")}</td>
                <td>{pub.publication.year_of_publication}</td>
                <td>{pub.publication.title}</td>
                <td>{pub.publication.conference_name},{pub.publication.conference_location}</td>
              </tr>
            ))
          }
          {
            !indian.length && <tr><td colSpan="4">No Indian Conference Publications</td></tr>
          }
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
       


    <div className='supervisor-table'>
      <h2 className='headingg'>Books</h2>
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

    <div className='supervisor-table'>
      <h2 className='headingg'>Patents</h2>
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



      
{
  isEditable && ( <div className='supervisor-button-div'>
    <button className='send' type="submit" onClick={submitForm}>SEND TO SUPERVISOR</button>
  </div>)
}
     
    </div>
  );
};

export default StudentSideProgress;
