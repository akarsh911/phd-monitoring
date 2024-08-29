import React from 'react';
import './ProgressMonitoring.css';
const DocComSideProgress = ({ formData, handleDocComRecommendationChange }) => {
  return (
    <div className='DocComSide-form'>
      <div className='data-input' id='appr'>
        <label htmlFor='docComRecommendation3'>Member 3</label>
        <div>
          <input
            type='radio'
            id='approved3'
            name='docComRecommendation3'
            value='approved'
            checked={formData.docComRecommendation3 === 'approved'}
            onChange={(e) => handleDocComRecommendationChange(e, 3)}
            required
          />
          <label htmlFor='approved3' className='small-label'>Satisfactory</label>
        </div>
        <div>
          <input
            type='radio'
            id='notApproved3'
            name='docComRecommendation3'
            value='notApproved'
            checked={formData.docComRecommendation3 === 'notApproved'}
            onChange={(e) => handleDocComRecommendationChange(e, 3)}
            required
          />
          <label htmlFor='notApproved3' className='small-label'>Not Satisfactory</label>
        </div>
        </div>
        <div className='data-input'>
          <label htmlFor='docComRemarks3' className='small-label'>Remarks (if any)</label>
          <input
            type='text'
            id='docComRemarks3'
            name='docComRemarks3'
            value={formData.docComRemarks3 || ''}
            onChange={(e) => handleDocComRecommendationChange(e, 3, true)}
          />
        </div>
      
      <div className='data-input' id='appr'>
        <label htmlFor='docComRecommendation4'>Member 4</label>
        <div>
          <input
            type='radio'
            id='approved4'
            name='docComRecommendation4'
            value='approved'
            checked={formData.docComRecommendation4 === 'approved'}
            onChange={(e) => handleDocComRecommendationChange(e, 4)}
            required
          />
          <label htmlFor='approved4' className='small-label'>Satisfactory</label>
        </div>
        <div>
          <input
            type='radio'
            id='notApproved4'
            name='docComRecommendation4'
            value='notApproved'
            checked={formData.docComRecommendation4 === 'notApproved'}
            onChange={(e) => handleDocComRecommendationChange(e, 4)}
            required
          />
          <label htmlFor='notApproved4' className='small-label'>Not Satisfactory</label>
        </div>
        </div>
        <div className='data-input'>
          <label htmlFor='docComRemarks4' className='small-label'>Remarks (if any)</label>
          <input
            type='text'
            id='docComRemarks4'
            name='docComRemarks4'
            value={formData.docComRemarks4 || ''}
            onChange={(e) => handleDocComRecommendationChange(e, 4, true)}
          />
        </div>
      
      <div className='data-input' id='appr'>
        <label htmlFor='docComRecommendation5'>Member 5</label>
        <div>
          <input
            type='radio'
            id='approved5'
            name='docComRecommendation5'
            value='approved'
            checked={formData.docComRecommendation5 === 'approved'}
            onChange={(e) => handleDocComRecommendationChange(e, 5)}
            required
          />
          <label htmlFor='approved5' className='small-label'>Satisfactory</label>
        </div>
        <div>
          <input
            type='radio'
            id='notApproved5'
            name='docComRecommendation5'
            value='notApproved'
            checked={formData.docComRecommendation5 === 'notApproved'}
            onChange={(e) => handleDocComRecommendationChange(e, 5)}
            required
          />
          <label htmlFor='notApproved5' className='small-label'>Not Satisfactory</label>
        </div>
        </div>
        <div className='data-input'>
          <label htmlFor='docComRemarks5' className='small-label'>Remarks (if any)</label>
          <input
            type='text'
            id='docComRemarks5'
            name='docComRemarks5'
            value={formData.docComRemarks5 || ''}
            onChange={(e) => handleDocComRecommendationChange(e, 5, true)}
          />
        </div>
      
      <div className='supervisor-button-div'>
        <button className='send' type='submit'>SEND TO HOD</button>
      </div>
    </div>
  );
};

export default DocComSideProgress;
