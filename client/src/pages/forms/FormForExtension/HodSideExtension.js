// HodRecommendationSection.js
import React, { useEffect, useState } from 'react';
import './Extension.css';
import { SERVER_URL } from '../../../config';
import { toast } from 'react-toastify';

const HodSideExtension = ({ formData, handleHodRecommendationChange }) => {

const [hod_lock, setHodLock] = useState(false);
  
  const sendToDra = async() => {
    try {
      const response = await fetch(`${SERVER_URL}/forms/research/extension/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          "student_id":formData.regno,
          "approval":formData.hodRecommendation,

        })
      });
      // const response=await

      if (response.ok) {
        const data = await response.json();
        console.log(data);
       if(data)
        toast.success("Success Updating Value")
      } else {
        var msg=await response.json()
        
        toast.error(msg.message);
        throw response;
      }

     
    } catch (error) {
      console.log("Error has occurred:", error);
      if (error instanceof Response) {
        error.json().then(data => {
          if (error.status === 422) {
            alert(data.message);
          } else if (error.status === 401) {
            alert("Invalid email or password");
          } else if (error.status === 500) {
            alert("Server error. Please try again later.");
          }
        }).catch(jsonError => {
          console.error('Error parsing JSON:', jsonError);
        });
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }

useEffect(() => {
  setHodLock(formData.hod_lock)
},[formData])

  return (
    <div className='hodSide-form'>
      <div className='data-input' id='appr'>
        <label htmlFor="hodRecommendation">Recommendation of HOD</label>
        <div>
          <input
            type="radio"
            id="approved"
            name="hodRecommendation"
            value="approved"
            checked={formData.hodRecommendation === 'approved'}
            onChange={handleHodRecommendationChange}
            required
          />
          <label htmlFor="approved" className="small-label">Approved</label>
        </div>
        <div>
          <input
            type="radio"
            id="notApproved"
            name="hodRecommendation"
            value="rejected"
            checked={formData.hodRecommendation === 'rejected'}
            onChange={handleHodRecommendationChange}
            required
          />
           <label htmlFor="notApproved" className="small-label">Not Approved</label>
        </div>
      </div>
      <div className='data-input'>
        <label htmlFor="HodRemarks">Remarks (if any)</label>
        <input
          type="text"
          id="hodRemarks"
          name="hodRemarks"
          value={formData.hodRemarks}
        />
      </div>
      {!hod_lock && (  
      <div className='supervisor-button-div'>
        <button className='send' type="submit" onClick={sendToDra}>SEND TO Dr(A)</button>
      </div>

      )}
    </div>
  );
};

export default HodSideExtension;
