import React, { useState } from 'react';
import { SERVER_URL } from '../../../config';


const SciJournalForm = () => {
  const [authors, setAuthors] = useState(['']);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [journalName, setJournalName] = useState('');
  const [volume, setVolume] = useState('');
  const [pageNo, setPageNo] = useState('');
  const [publisher, setPublisher] = useState('');
  const [impactFactor, setImpactFactor] = useState('');
  const [status, setStatus] = useState('');
  const [file, setFile] = useState(null);

  const handleAddAuthor = () => {
    setAuthors([...authors, '']);
  };

  const handleAuthorChange = (e, index) => {
    const newAuthors = authors.map((author, i) => (i === index ? e.target.value : author));
    setAuthors(newAuthors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year);
    formData.append('journal_name', journalName);
    formData.append('volume', volume);
    formData.append('page_no', pageNo);
    formData.append('publisher', publisher);
    formData.append('impact_factor', impactFactor);
    formData.append('status', status);
    formData.append('file', file);
   
    authors.forEach((author, index) => {
      formData.append(`authors[${index}]`, JSON.stringify({ name: author }));
    });
    const authorObjects = authors.map((author) => ({ name: author }));

    const jsonBody = JSON.stringify({
      type:'journal',
      journal_type:'sci',
      title: title,
      year_of_publication: year,
      journal_name: journalName,
      volume: volume,
      page_no: pageNo,
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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <section className='form-section'>
      <h2 className='small-heading'>Papers in SCI/SCIE/SSCI Journal</h2>
      <form onSubmit={handleSubmit}>
        {authors.map((author, index) => (
          <div key={index} className="form-group">
            {index === 0 && <label>Authors</label>}
            {index !== 0 && <label></label>}
            <input
              type="text"
              value={author}
              onChange={(e) => handleAuthorChange(e, index)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddAuthor}>Add more</button>
        <div className="form-group">
          <label>Year of Publication / Acceptance</label>
          <select value={year} onChange={(e) => setYear(e.target.value)} required>
            <option value="">Choose one</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Title of paper</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Name of Journal</label>
          <input type="text" value={journalName} onChange={(e) => setJournalName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Volume</label>
          <input type="text" value={volume} onChange={(e) => setVolume(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Page No.</label>
          <input type="text" value={pageNo} onChange={(e) => setPageNo(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Name of Publisher</label>
          <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Impact Factor</label>
          <input type="text" value={impactFactor} onChange={(e) => setImpactFactor(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Status of Paper</label>
          <div>
            <label>
              <input type="radio" name="status" value="accepted" onChange={(e) => setStatus(e.target.value)} required /> Accepted
            </label>
            <label>
              <input type="radio" name="status" value="published" onChange={(e) => setStatus(e.target.value)} required /> Published
            </label>
            <label>
              <input type="radio" name="status" value="submitted" onChange={(e) => setStatus(e.target.value)} required /> Submitted
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Upload first page of paper (PDF)</label>
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} required />
        </div>
        <div>
          <button type='submit' className='two-button'>Submit</button>
        </div>
      </form>
    </section>
  );
};

export default SciJournalForm;
