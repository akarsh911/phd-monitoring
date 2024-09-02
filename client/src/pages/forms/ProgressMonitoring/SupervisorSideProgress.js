import React, { useState } from 'react';
import './ProgressMonitoring.css';
import { toast } from 'react-toastify';
import { SERVER_URL } from '../../../config';
const SupervisorSideProgress = ({ formData, handleHodRecommendationChange }) => {
  const isEditable=formData.role=='faculty' && !formData.supervisor_lock;

  const [increaseInQuantum, setIncreaseInQuantum] = useState('');
  const [total, setTotal] = useState(parseInt(formData.prev_progress));
  const [approval, setApproval] = useState('');
  const handleIncreaseInQuantumProgressChange = (e) => {
    if(e.target.value>100){
      toast.error("Increase in Quantum Progress Percentage cannot be greater than 100");
    }
    else if(e.target.value<0){
      toast.error("Increase in Quantum Progress Percentage cannot be less than 0");

    }
    setIncreaseInQuantum(e.target.value);
    setTotal(parseInt(formData.prev_progress) + parseInt(e.target.value));
  }
  
  const handleSupervisorReviewChange = (e) => {
    console.log(e.target.value);
    setApproval(e.target.value);
  }

  
  const submitForm = async (e) => {
    e.preventDefault();
    const data={
      progress:increaseInQuantum,
      student_id:formData.regno,
    }
  
    try {
      const response = await fetch(
        `${SERVER_URL}/presentation/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const data = await response.json();
        toast.success("Successfully Submitted");
      } else {
        const msg = await response.json();
        toast.error(msg.message);
        throw response;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const updateApproval = async (e) => {
    e.preventDefault();
    const data={
      progress:approval,
      student_id:formData.regno,
    }
  
    try {
      const response = await fetch(
        `${SERVER_URL}/presentation/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const data = await response.json();
        toast.success("Successfully updated preferences");
      } else {
        const msg = await response.json();
        toast.error(msg.message);
        throw response;
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='supervisorSide-form'>
      {
        formData.supervisorReviews.map((review, index) => {

          let reviewVal=review.review_status;
          if(reviewVal!='pending'){
            reviewVal=review.progress
          }
       
          return (
            <div className='data-input' key={index}>
              <label htmlFor={`supervisorReview${index + 1}`}>Supervisor {review.faculty}</label>
              <input
                type='text'
                id={`supervisorReview${index + 1}`}
                name={`supervisorReview${index + 1}`}
                value={reviewVal}
                readOnly
                required
              />
              
              <span> Comments: {review.comments} </span>              
            </div>
          );
        })
      }
      {
        (formData.role=='faculty' && !formData.supervisor_lock) && (
          <div className='data-input' id='appr'>
          <label htmlFor='hodRecommendation1'>Your Approval</label>
          <div>
            <input
              type='radio'
              id='approved1'
              name='hodRecommendation1'
              value='satifactory'
              checked={approval === 'satifactory'}
              onChange={handleSupervisorReviewChange}
              required
            />
            <label htmlFor='approved1' className='small-label'>Satisfactory</label>
          </div>
          <div>
            <input
              type='radio'
              id='notApproved1'
              name='hodRecommendation1'
              value='not satisfactory'
              checked={approval == 'not satisfactory'}
              onChange={handleSupervisorReviewChange}
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
            
            />
          </div>
          <button className='send' onClick={updateApproval}>Update </button>
        </div>
        )
      }
     
  
      <div className='data-input'>
        <label htmlFor='previousQuantumProgress'>Previous Quantum Progress Percentage</label>
        <input
          type='text'
          id='previousQuantumProgress'
          name='previousQuantumProgress'
          value={formData.prev_progress}
          readOnly={isEditable}
          required
        />
      </div>
      <div className='data-input'>
        <label htmlFor='increaseInQuantumProgress'>Increase in Quantum Progress Percentage</label>
        <input
          type='text'
          id='increaseInQuantumProgress'
          name='increaseInQuantumProgress'
          value={increaseInQuantum}
          onChange={handleIncreaseInQuantumProgressChange}
          readOnly={!isEditable}
          required
        />
      </div>
      <div className='data-input'>
        <label htmlFor='totalQuantumProgress'>Total Quantum Progress Percentage</label>
        <input
          type='text'
          id='totalQuantumProgress'
          name='totalQuantumProgress'
          value={total}
          readOnly
          required
        />
      </div>
      <div className='supervisor-button-div'>
        <button className='send' type='submit' onClick={submitForm}>SUBMIT</button>
      </div>
    </div>
  );
};

export default SupervisorSideProgress;
