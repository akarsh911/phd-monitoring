// PatentForm.js
import React, { useState } from 'react';

const PatentForm = () => {
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
      <h2 className='small-heading'>Patents</h2>
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
        <label>Year of Award</label>
        <select>
          <option>Choose one</option>
          {/* Add more options here */}
        </select>
      </div>
      <div className="form-group">
        <label>Title of patent</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Patent No.</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Patent</label>
        <div>
          <label>
            <input type="radio" name="patent-type" value="international" /> International
          </label>
          <label>
            <input type="radio" name="patent-type" value="indian" /> Indian
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Status</label>
        <div>
          <label>
            <input type="radio" name="status-patent" value="accepted" /> Accepted
          </label>
          <label>
            <input type="radio" name="status-patent" value="published" /> Published
          </label>
          <label>
            <input type="radio" name="status-patent" value="submitted" /> Submitted
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

export default PatentForm;
