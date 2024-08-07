// BookChapterForm.js
import React, { useState } from 'react';

const BookChapterForm = () => {
  const [authors, setAuthors] = useState(['']);

  const handleAddAuthor = () => {
    setAuthors([...authors, '']);
  };

  const handleAuthorChange = (e, index) => {
    const newAuthors = authors.map((author, i) => (i === index ? e.target.value : author));
    setAuthors(newAuthors);
  };

  return (
    <section className='form-section'>
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
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Year of Publication / Acceptance</label>
        <select>
          <option>Choose one</option>
          {/* Add more options here */}
        </select>
      </div>
      <div className="form-group">
        <label>Chapter Title</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Volume</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Page No.</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>ISSN</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Name of Publisher</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Status of Paper</label>
        <div>
          <label>
            <input type="radio" name="status-book" value="accepted" /> Accepted
          </label>
          <label>
            <input type="radio" name="status-book" value="published" /> Published
          </label>
          <label>
            <input type="radio" name="status-book" value="submitted" /> Submitted
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Upload first page of paper (PDF)</label>
        <input type="file" accept="application/pdf" />
      </div>
      <div>
        <button className='two-button'>Submit</button>
      </div>
    </section>
  );
};

export default BookChapterForm;
