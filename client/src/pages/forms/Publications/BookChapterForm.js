// BookChapterForm.js
import React, { useState } from 'react';
import { SERVER_URL } from "../../../config";

const BookChapterForm = () => {
  const [authors, setAuthors] = useState(['']);
  const [bookName, setBookName] = useState('');
  const [year, setYear] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');
  const [volume, setVolume] = useState('');
  const [pageNo, setPageNo] = useState('');
  const [ISSN, setISSN] = useState('');
  const [publisher, setPublisher] = useState('');
  const [impactFactor, setImpactFactor] = useState('');
  const [status, setStatus] = useState('');
  const [file, setFile] = useState(null);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', chapterTitle);
    formData.append('year', year);
    formData.append('book_name', bookName);
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
      type:'book',
      title: chapterTitle,
      year_of_publication: year,
      book_name: bookName,
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
      <form onSubmit={handleSubmit}>
      <h2 className='small-heading'>Book Chapters</h2>
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
        <label>Name of book</label>
        <input type="text" onChange={(e)=>setBookName(e.target.value)} required/>
      </div>
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
        <label>Chapter Title</label>
        <input type="text" onChange={(e) => setChapterTitle(e.target.value)} required/>
      </div>
      <div className="form-group">
        <label>Volume</label>
        <input type="text" onChange={(e) => setVolume(e.target.value)} required/>
      </div>
      <div className="form-group">
        <label>Page No.</label>
        <input type="text" onChange={(e) => setPageNo(e.target.value)} required/>
      </div>
      <div className="form-group">
        <label>ISSN</label>
        <input type="text" onChange={(e) => setISSN(e.target.value)} required/>
      </div>
      <div className="form-group">
        <label>Name of Publisher</label>
        <input type="text" onChange={(e) => setPublisher(e.target.value)} required/>
      </div>
      <div className="form-group">
        <label>Status of Paper</label>
        <div>
          <label>
            <input type="radio" name="status-book" value="accepted" onChange={(e) => setStatus(e.target.value)} /> Accepted
          </label>
          <label>
            <input type="radio" name="status-book" value="published" onChange={(e) => setStatus(e.target.value)} /> Published
          </label>
          <label>
            <input type="radio" name="status-book" value="submitted" onChange={(e) => setStatus(e.target.value)} /> Submitted
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

export default BookChapterForm;
