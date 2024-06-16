import React from 'react';
import './ProgressMonitoring.css';
const SupervisorSideProgress = ({ formData, handleHodRecommendationChange }) => {
  return (
    <div className='supervisorSide-form'>
      <div className='data-input' id='appr'>
        <label htmlFor='hodRecommendation1'>Member 1</label>
        <div>
          <input
            type='radio'
            id='approved1'
            name='hodRecommendation1'
            value='approved'
            checked={formData.hodRecommendation1 === 'approved'}
            onChange={(e) => handleHodRecommendationChange(e, 1)}
            required
          />
          <label htmlFor='approved1' className='small-label'>Satisfactory</label>
        </div>
        <div>
          <input
            type='radio'
            id='notApproved1'
            name='hodRecommendation1'
            value='notApproved'
            checked={formData.hodRecommendation1 === 'notApproved'}
            onChange={(e) => handleHodRecommendationChange(e, 1)}
            required
          />
          <label htmlFor='notApproved1' className='small-label'>Not Satisfactory</label>
        </div>
        <div className='data-input'>
          <label htmlFor='hodRemarks1' className='small-label'>Remarks (if any)</label>
          <input
            type='text'
            id='hodRemarks1'
            name='hodRemarks1'
            value={formData.hodRemarks1 || ''}
            onChange={(e) => handleHodRecommendationChange(e, 1, true)}
          />
        </div>
      </div>
      <div className='data-input' id='appr'>
        <label htmlFor='hodRecommendation2'>Member 2</label>
        <div>
          <input
            type='radio'
            id='approved2'
            name='hodRecommendation2'
            value='approved'
            checked={formData.hodRecommendation2 === 'approved'}
            onChange={(e) => handleHodRecommendationChange(e, 2)}
            required
          />
          <label htmlFor='approved2' className='small-label'>Satisfactory</label>
        </div>
        <div>
          <input
            type='radio'
            id='notApproved2'
            name='hodRecommendation2'
            value='notApproved'
            checked={formData.hodRecommendation2 === 'notApproved'}
            onChange={(e) => handleHodRecommendationChange(e, 2)}
            required
          />
          <label htmlFor='notApproved2' className='small-label'>Not Satisfactory</label>
        </div>
        <div className='data-input'>
          <label htmlFor='hodRemarks2' className='small-label'>Remarks (if any)</label>
          <input
            type='text'
            id='hodRemarks2'
            name='hodRemarks2'
            value={formData.hodRemarks2 || ''}
            onChange={(e) => handleHodRecommendationChange(e, 2, true)}
          />
        </div>
      </div>
      <div className='data-input'>
        <label htmlFor='previousQuantumProgress'>Previous Quantum Progress Percentage</label>
        <input
          type='text'
          id='previousQuantumProgress'
          name='previousQuantumProgress'
          value={formData.previousQuantumProgress || ''}
          readOnly
          required
        />
      </div>
      <div className='data-input'>
        <label htmlFor='increaseInQuantumProgress'>Increase in Quantum Progress Percentage</label>
        <input
          type='text'
          id='increaseInQuantumProgress'
          name='increaseInQuantumProgress'
          value={formData.increaseInQuantumProgress || ''}
          required
        />
      </div>
      <div className='data-input'>
        <label htmlFor='totalQuantumProgress'>Total Quantum Progress Percentage</label>
        <input
          type='text'
          id='totalQuantumProgress'
          name='totalQuantumProgress'
          value={formData.totalQuantumProgress || ''}
          required
        />
      </div>
      <div className='supervisor-button-div'>
        <button className='send' type='submit'>SUBMIT</button>
      </div>
    </div>
  );
};

export default SupervisorSideProgress;
