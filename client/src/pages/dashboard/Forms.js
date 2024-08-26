import React, { useState } from 'react';
import './Dashboard.css'; 
import '../forms/Publications/Publications.css';
import ConstituteOfIrb from '../forms/ConstituteOfIrb/ConstituteOfIrb.js';
import IrbSubmission from '../forms/IrbSubmission.js';
import StatusChange from '../forms/ChangeOfStatus/StatusChange.js';
import SupervisorChange from '../forms/SupervisorChange/SupervisorChange.js';
import SupAllocation from '../forms/SupAllocation/SupAllocation.js';
import ThesisExtensionForm from '../forms/ThesisExtension/ThesisExtension.js';

const Forms = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  const renderForm = () => {
    switch (selectedForm) {
      case 'Constitute of IRB':
        return <ConstituteOfIrb />;
      case 'Change of Status':
        return <StatusChange />;
      case 'Supervisor Allocation':
        return <SupAllocation />;
      case 'IRB Submission':
        return <IrbSubmission />;
      case 'Extension for Submission of Research Proposal':
        return <ThesisExtensionForm />;
      case 'Supervisor Change':
        return <SupervisorChange />;
      default:
        return (
          <div className='StudentSidebody-div'>
            <div className='StudentSideform-div'>
              <div className='heading'>
                <h1>Forms</h1>
              </div>
              <div className='button-group'>
                <button onClick={() => setSelectedForm('Constitute of IRB')}>Constitute of Institutional Research Board</button>
                <button onClick={() => setSelectedForm('Change of Status')}>Form for Change of Status</button>
                <button onClick={() => setSelectedForm('Supervisor Allocation')}>Supervisor Allocation</button>
                <button onClick={() => setSelectedForm('IRB Submission')}>IRB Submission</button>
                <button onClick={() => setSelectedForm('Extension for Submission of Research Proposal')}>Extension for Submission of Research Proposal</button>
                <button onClick={() => setSelectedForm('Supervisor Change')}>Supervisor Change</button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {renderForm()}
      {selectedForm && (
        <div className='back-button'>
          <button onClick={() => setSelectedForm(null)}>Back to Forms</button>
        </div>
      )}
    </div>
  );
};

export default Forms;
