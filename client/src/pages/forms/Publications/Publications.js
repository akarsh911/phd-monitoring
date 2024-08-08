import React, { useState } from 'react';
import './Publications.css';
import SciJournalForm from './SciJournalForm';
import ScopusJournalForm from './ScopusJournalForm';
import IntlConferenceForm from './IntlConferenceForm';
import IndConferenceForm from './IndConferenceForm';
import BookChapterForm from './BookChapterForm';
import PatentForm from './PatentForm';

const Publications = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const renderForm = () => {
    switch (selectedForm) {
      case 'SciJournal':
        return <SciJournalForm />;
      case 'ScopusJournal':
        return <ScopusJournalForm />;
      case 'IntlConference':
        return <IntlConferenceForm />;
      case 'IndConference':
        return <IndConferenceForm />;
      case 'BookChapter':
        return <BookChapterForm />;
      case 'Patent':
        return <PatentForm />;
      default:
        return null;
    }
  };

  const handleButtonClick = (formType) => {
    setSelectedForm(formType);
    setDropdownVisible(true); // Show the dropdown menu after a form is selected
  };

  return (
    <div className='StudentSidebody-div'>
      <div className='StudentSideform-div'>
        <div className='heading'>
          <h1>Publications</h1>
        </div>

        {dropdownVisible ? (
          <div >
           
            <div className='dropdown'>
              <button onClick={() => handleButtonClick('SciJournal')}>Scientific Journal</button>
              <button onClick={() => handleButtonClick('ScopusJournal')}>Scopus Journal</button>
              <button onClick={() => handleButtonClick('IntlConference')}>International Conference</button>
              <button onClick={() => handleButtonClick('IndConference')}>Indian Conference</button>
              <button onClick={() => handleButtonClick('BookChapter')}>Book Chapter</button>
              <button onClick={() => handleButtonClick('Patent')}>Patent</button>
            </div>
          </div>
        ) : (
          <div className='button-group'>
            <button onClick={() => handleButtonClick('SciJournal')}>Scientific Journal</button>
            <button onClick={() => handleButtonClick('ScopusJournal')}>Scopus Journal</button>
            <button onClick={() => handleButtonClick('IntlConference')}>International Conference</button>
            <button onClick={() => handleButtonClick('IndConference')}>Indian Conference</button>
            <button onClick={() => handleButtonClick('BookChapter')}>Book Chapter</button>
            <button onClick={() => handleButtonClick('Patent')}>Patent</button>
          </div>
        )}

        {renderForm()}
      </div>
    </div>
  );
};

export default Publications;
