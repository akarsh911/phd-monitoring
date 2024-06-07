// SupervisorRecommendation.js
import React from 'react';


const SupervisorSideExtension =  ({ supervisorIndex, recommendation, onChange, allRecommendations, supervisorProfile }) => {
    if (!supervisorProfile) {
      return <div>Loading...</div>;
    }
  
    // Determine if the logged-in supervisor is the current supervisor
    const isCurrentSupervisor = supervisorProfile.index === supervisorIndex;
  
    return (
      <div className='supervisor-recommendation'>
        <h3>Supervisor {supervisorIndex + 1}</h3>
        {isCurrentSupervisor ? (
          <div>
            <div>
              <input
                type="checkbox"
                checked={recommendation.recommended}
                onChange={(e) => onChange(supervisorIndex, 'recommended', e.target.checked)}
              /> Recommended
              <input
                type="checkbox"
                checked={recommendation.notRecommended}
                onChange={(e) => onChange(supervisorIndex, 'notRecommended', e.target.checked)}
              /> Not Recommended
            </div>
            <div>
              <label>Remarks:</label>
              <input
                type="text"
                value={recommendation.remarks}
                onChange={(e) => onChange(supervisorIndex, 'remarks', e.target.value)}
                placeholder="Remarks (if any)"
              />
            </div>
          </div>
        ) : (
          <div>
            <p>Recommended: {recommendation.recommended ? 'Yes' : 'No'}</p>
            <p>Not Recommended: {recommendation.notRecommended ? 'Yes' : 'No'}</p>
            <p>Remarks: {recommendation.remarks}</p>
          </div>
        )}
         


      </div>
      
    );
  };
  

export default SupervisorSideExtension;
