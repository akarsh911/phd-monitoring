// IndConferenceForm.js
import React, { useState } from 'react';

const IndConferenceForm = () => {
  const [authors, setAuthors] = useState(['']);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [conferenceName, setConferenceName] = useState('');
  const [conferencePlace, setConferencePlace] = useState('');
  const [volume, setVolume] = useState('');
  const [pageNo, setPageNo] = useState('');
  const [publisher, setPublisher] = useState('');
  const [impactFactor, setImpactFactor] = useState('');
  const [status, setStatus] = useState('');
  const [file, setFile] = useState(null);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year);
    formData.append('conference_name', conferenceName);
    formData.append('conference_location', conferencePlace);
    formData.append('status', status);
    formData.append('file', file);
   
    authors.forEach((author, index) => {
      formData.append(`authors[${index}]`, JSON.stringify({ name: author }));
    });
    const authorObjects = authors.map((author) => ({ name: author }));

    const jsonBody = JSON.stringify({
      type:'conference',
      conference_type: 'ind',
      title: title,
      year_of_publication: year,
      conference_name: conferenceName,
      conference_location: conferenceLocation,
      publisher: publisher,
      impact_factor: impactFactor,
      status: status,
      authors: authorObjects,
    });

    try {
      const response = await fetch(`${SERVER_URL}/publications/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token handling logic here
        },
        body: jsonBody,
      });

      if (response.ok) {
        const res = await response.json();
        console.log("Form submitted successfully", res);
        alert("Form submitted successfully"); // Use toast notifications as needed
      } else {
        const msg = await response.json();
        console.error("Error submitting form", msg.message);
        alert(`Error: ${msg.message}`); // Use toast notifications as needed
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("An error occurred while submitting the form"); // Use toast notifications as needed
    }
  };

  const handleAddAuthor = () => {
    setAuthors([...authors, '']);
  };

  const handleAuthorChange = (e, index) => {
    const newAuthors = authors.map((author, i) => (i === index ? e.target.value : author));
    setAuthors(newAuthors);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <section className='form-section'>
      <h2 className='small-heading'>Papers in Indian Conference</h2>
      <form onSubmit={handleSubmit}>
      {authors.map((author, index) => (
        <div key={index} className="form-group">
          {index === 0 && <label>Authors</label>}
          {index !== 0 && <label></label>}
          <input
            type="text"
            value={author}
            onChange={(e) => handleAuthorChange(e, index)}
          />
        </div>
      ))}
      <button onClick={handleAddAuthor}>Add more</button>
      <div className="form-group">
        <label>Year of Publication / Acceptance</label>
        <select value={year} onChange={(e) => setYear(e.target.value)} required>
          <option>Choose one</option>
          {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label>Title of paper</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} required/>
      </div>
      <div className="form-group">
        <label>Name of Conference</label>
        <input type="text" onChange={(e) => setConferenceName(e.target.value)} required/>
      </div>
      <div className="form-group">
        <label>Place of Conference</label>
        <input type="text" onChange={(e)=>setConferencePlace(e.target.value)} required/>
      </div>
      <div className="form-group">
        <label>Status of Paper</label>
        <div>
          <label>
            <input type="radio" name="status-ind-conference" value="accepted" onChange={(e) => setStatus(e.target.value)} /> Accepted
          </label>
          <label>
            <input type="radio" name="status-ind-conference" value="published" onChange={(e) => setStatus(e.target.value)} /> Published
          </label>
          <label>
            <input type="radio" name="status-ind-conference" value="submitted"onChange={(e) => setStatus(e.target.value)}  /> Submitted
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Upload first page of paper (PDF)</label>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} required/>
      </div>
      <div>
        <button className='two-button'>Submit</button>
      </div>
      </form>
    </section>
  );
};

export default IndConferenceForm;
