// IndConferenceForm.js
import React, { useState } from 'react';

const IndConferenceForm = () => {
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
      <h2 className='small-heading'>Papers in Indian Conference</h2>
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
        <select>
          <option>Choose one</option>
          {/* Add more options here */}
        </select>
      </div>
      <div className="form-group">
        <label>Title of paper</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Name of Conference</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Place of Conference</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Status of Paper</label>
        <div>
          <label>
            <input type="radio" name="status-ind-conference" value="accepted" /> Accepted
          </label>
          <label>
            <input type="radio" name="status-ind-conference" value="published" /> Published
          </label>
          <label>
            <input type="radio" name="status-ind-conference" value="submitted" /> Submitted
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

export default IndConferenceForm;
