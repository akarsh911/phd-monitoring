import React, { useState } from 'react';
import './Publications.css';
import SciJournalForm from './SciJournalForm';
import ScopusJournalForm from './ScopusJournalForm';
import IntlConferenceForm from './IntlConferenceForm';
import IndConferenceForm from './IndConferenceForm';
import BookChapterForm from './BookChapterForm';
import PatentForm from './PatentForm';

const Publications = () => {
  return (
    <div className='StudentSidebody-div'>
      <div className='StudentSideform-div'>
        <div className='heading'>
          <h1>Add a Publication </h1>
        </div>
        
        <SciJournalForm />
        <ScopusJournalForm />
        <IntlConferenceForm />
        <IndConferenceForm />
        <BookChapterForm />
        <PatentForm />

      </div>
    </div>
  );
};

export default Publications;
