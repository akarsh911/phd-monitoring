import React, { useState } from 'react';
import './Publications.css';

const Publications = () => {
  const [sciAuthors, setSciAuthors] = useState(['']);
  const [scopusAuthors, setScopusAuthors] = useState(['']);
  const [intlConferenceAuthors, setIntlConferenceAuthors] = useState(['']);
  const [indConferenceAuthors, setIndConferenceAuthors] = useState(['']);
  const [bookChapterAuthors, setBookChapterAuthors] = useState(['']);
  const [patentAuthors, setPatentAuthors] = useState(['']);

  const handleAddAuthor = (setAuthors, authors) => {
    setAuthors([...authors, '']);
  };

  const handleAuthorChange = (e, index, setAuthors, authors) => {
    const newAuthors = authors.map((author, i) => (i === index ? e.target.value : author));
    setAuthors(newAuthors);
  };

  const renderAuthors = (authors, setAuthors) => {
    return authors.map((author, index) => (
      <div key={index} className="form-group">
        {/* <label>Authors</label> */}
        {index === 0 && <label>Authors</label>}
        {index != 0 && <label></label>}
        <input
          type="text"
          value={author}
          onChange={(e) => handleAuthorChange(e, index, setAuthors, authors)}
        />
      </div>
    ));
  };

  return (
    <div className='StudentSidebody-div'>
      <div className='StudentSideform-div'>
        <div className='heading'>
          <h1>Publications</h1>
        </div>

        {/* SCI/SCIE/SSCI Journal Section */}
        <section className='form-section'>
          <h2 className='small-heading'>Papers in SCI/SCIE/SSCI Journal</h2>
          {renderAuthors(sciAuthors, setSciAuthors)}
          <button onClick={() => handleAddAuthor(setSciAuthors, sciAuthors)}>Add more</button>
          {/* Other form fields for SCI/SCIE/SSCI Journal */}
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
            <label>Name of Journal</label>
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
            <label>Name of Publisher</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Impact Factor</label>
            <input type="text" />
          </div>
          
          <div className="form-group">
            <label>Status of Paper</label>
           
            <div>
              <label>
                <input type="radio" name="status-sci" value="accepted" /> Accepted
              </label>
              <label>
                <input type="radio" name="status-sci" value="published" /> Published
              </label>
            </div>
          </div>
          <div className="form-group">
  <label>Upload first page of paper (PDF)</label>
  <input type="file" accept="application/pdf" />
</div>
          <div>
            <button className='two-button'>Add More</button>
            <button className='two-button'>Submit</button>
          </div>
        </section>

        {/* Scopus Journal Section */}
        <section className='form-section'>
          <h2 className='small-heading'>Papers in Scopus Journal</h2>
          {renderAuthors(scopusAuthors, setScopusAuthors)}
          <button onClick={() => handleAddAuthor(setScopusAuthors, scopusAuthors)}>Add more</button>
          {/* Other form fields for Scopus Journal */}
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
            <label>Name of Journal</label>
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
            <label>Name of Publisher</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Status of Paper</label>
            <div>
              <label>
                <input type="radio" name="status-scopus" value="accepted" /> Accepted
              </label>
              <label>
                <input type="radio" name="status-scopus" value="published" /> Published
              </label>
            </div>
          </div>
          <div className="form-group">
  <label>Upload first page of paper (PDF)</label>
  <input type="file" accept="application/pdf" />
</div>
          <div>
            <button className='two-button'>Add More</button>
            <button className='two-button'>Submit</button>
          </div>
        </section>

        {/* International Conference Section */}
        <section className='form-section'>
          <h2 className='small-heading'>Papers in International Conference</h2>
          {renderAuthors(intlConferenceAuthors, setIntlConferenceAuthors)}
          <button onClick={() => handleAddAuthor(setIntlConferenceAuthors, intlConferenceAuthors)}>Add more</button>
          {/* Other form fields for International Conference */}
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
                <input type="radio" name="status-int-conference" value="accepted" /> Accepted
              </label>
              <label>
                <input type="radio" name="status-int-conference" value="published" /> Published
              </label>
            </div>
          </div>
          <div className="form-group">
  <label>Upload first page of paper (PDF)</label>
  <input type="file" accept="application/pdf" />
</div>
          <div>
            <button className='two-button'>Add More</button>
            <button className='two-button'>Submit</button>
          </div>
        </section>

        {/* Indian Conference Section */}
        <section className='form-section'>
          <h2 className='small-heading'>Papers in Indian Conference</h2>
          {renderAuthors(indConferenceAuthors, setIndConferenceAuthors)}
          <button onClick={() => handleAddAuthor(setIndConferenceAuthors, indConferenceAuthors)}>Add more</button>
          {/* Other form fields for Indian Conference */}
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
            </div>
          </div>
          <div className="form-group">
  <label>Upload first page of paper (PDF)</label>
  <input type="file" accept="application/pdf" />
</div>
          <div>
            <button className='two-button'>Add More</button>
            <button className='two-button'>Submit</button>
          </div>
        </section>

        {/* Book Chapters Section */}
        <section className='form-section'>
          <h2 className='small-heading'>Book Chapters</h2>
          {renderAuthors(bookChapterAuthors, setBookChapterAuthors)}
          <button onClick={() => handleAddAuthor(setBookChapterAuthors, bookChapterAuthors)}>Add more</button>
          {/* Other form fields for Book Chapters */}
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
            </div>
          </div>
          <div className="form-group">
  <label>Upload first page of paper (PDF)</label>
  <input type="file" accept="application/pdf" />
</div>
          <div>
            <button className='two-button'>Add More</button>
            <button className='two-button'>Submit</button>
          </div>
        </section>

        {/* Patents Section */}
        <section className='form-section'>
          <h2 className='small-heading'>Patents</h2>
          {renderAuthors(patentAuthors, setPatentAuthors)}
          <button onClick={() => handleAddAuthor(setPatentAuthors, patentAuthors)}>Add more</button>
          {/* Other form fields for Patents */}
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
            </div>
          </div>
          <div className="form-group">
  <label>Upload first page of paper (PDF)</label>
  <input type="file" accept="application/pdf" />
</div>
          <div>
            <button className='two-button'>Add More</button>
            <button className='two-button'>Submit</button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Publications;
