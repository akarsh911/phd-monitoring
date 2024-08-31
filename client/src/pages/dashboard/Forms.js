import React, { useState } from 'react';
import './Dashboard.css'; 
import '../forms/Publications/Publications.css';
import './Forms.css';
import ConstituteOfIrb from '../forms/ConstituteOfIrb/ConstituteOfIrb.js';
import IrbSubmission from '../forms/IrbSubmission.js';
import StatusChange from '../forms/ChangeOfStatus/StatusChange.js';
import SupervisorChange from '../forms/SupervisorChange/SupervisorChange.js';
import SupAllocation from '../forms/SupAllocation/SupAllocation.js';
import ThesisExtensionForm from '../forms/ThesisExtension/ThesisExtension.js';
import ListOfExaminer from '../forms/ListOfExaminer/ListOfExaminer.js'
import ResearchProposalExtensionForm from '../forms/FormForExtension/Extension.js';
import ThesisSubForm from '../forms/ThesisSubmission/ThesisSub.js';
import Publications from '../forms/Publications/Publications.js';

const FormsView = () => {
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
      case 'Extension for Thesis Submission':
        return <ThesisExtensionForm />;
      case 'Supervisor Change':
        return <SupervisorChange />;
        case 'List of Examiner':
          return <ListOfExaminer />;
          case 'Thesis Submission':
          return <ThesisSubForm/>;
          case 'Publications':
            return <Publications/>;
      default:
        return (
          <div className='StudenttSidebody-div'>
            <div className='StudenttSideform-div'>
              <div className='heading'>
                <h1>Forms</h1>
              </div>
              <div className="group">
              <div className='button-group'>
                <button onClick={() => setSelectedForm('Constitute of IRB')}>Constitute of Institutional Research Board</button>
                <button onClick={() => setSelectedForm('Change of Status')}>Form for Change of Status</button>
                <button onClick={() => setSelectedForm('Supervisor Allocation')}>Supervisor Allocation</button>
                <button onClick={() => setSelectedForm('IRB Submission')}>IRB Submission</button>
                <button onClick={() => setSelectedForm('Extension for Thesis Submission')}>Extension for Thesis Submission</button>
                </div>
                <div className='button-group'>
                <button onClick={() => setSelectedForm('Supervisor Change')}>Supervisor Change</button>
                <button onClick={() => setSelectedForm('List of Examiner')}>List of Examiner</button>
                <button onClick={() => setSelectedForm('Thesis Submission')}>Thesis Submission</button>
                <button onClick={() => setSelectedForm('Publications')}>Publications</button>
              </div>
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

export default FormsView;
