import React, { useState, useEffect } from 'react';
import './SupervisorSideExtension.css';
import { SERVER_URL } from '../../../config';
import { toast } from 'react-toastify';

const SupervisorSideExtension = ({ loggedInSupervisor,formData }) => {
  const [supervisors, setSupervisors] = useState([]);
  const [supervisorLock, setSupervisorLock] = useState(false);

  const [recommendation, setRecommendation] = useState('');



  const sendToHod = async() => {
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
        })
      });
      // const response=await

      if (response.ok) {
        const data = await response.json();
        console.log(data);
       if(data)
        toast.success("Success Submitting form")
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
    if (formData.supervisorRecommendations) {
      const newSupervisors = formData.supervisorRecommendations.map(supervisor => ({
        recommended: supervisor.status,
        name: supervisor.name,
        remarks: supervisor.comments,
      }));
      console.log(newSupervisors);
      setSupervisors(newSupervisors);
      setSupervisorLock(formData.supervisor_lock);
    }
  }, [formData]);

  const handleRecommendationChange = async(index, recommendation) => {
    setRecommendation(recommendation);
    const newSupervisors = [...supervisors];
    newSupervisors[index].recommended = recommendation;
    setSupervisors(newSupervisors);
    try {
      const response = await fetch(`${SERVER_URL}/forms/research/extension/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          student_id: formData.regno,
          approval:recommendation
        })
      });
      // const response=await

      if (response.ok) {
        const data = await response.json();
        console.log(data);
       if(data)
        toast.success("Success Updating")
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
    // Here, you would also want to send this change back to the server to persist it
  };

  const handleRemarksChange = (index, remarks) => {
    const newSupervisors = [...supervisors];
    newSupervisors[index].remarks = remarks;
    setSupervisors(newSupervisors);
    // Here, you would also want to send this change back to the server to persist it
  };

  return (
    <div className="supervisor-table">
      <h2 className='headingg'>Recommendation of Supervisors</h2>
      <table>
        <thead>
          <tr>
            <th>SUPERVISORS</th>
            <th>RECOMMENDED</th>
            <th>NOT RECOMMENDED</th>
            <th>Remarks (if any)</th>
          </tr>
        </thead>
        <tbody>
          {supervisors.map((supervisor, index) => (
            <tr key={index}>
              <td>{supervisor.name}</td>
              <td>
                <input
                  type="radio"
                  name={`recommendation-${index}`}
                  
                  checked={supervisor.recommended === 'approved'}
                  onChange={() => handleRecommendationChange(index, 'approved')}
                  disabled={supervisor.name !== loggedInSupervisor}
                  
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`recommendation-${index}`}
                  checked={supervisor.recommended === 'rejected'}
                  onChange={() => handleRecommendationChange(index, 'rejected')}
                  disabled={supervisor.name !== loggedInSupervisor}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={supervisor.remarks}
                  onChange={(e) => handleRemarksChange(index, e.target.value)}
                  disabled={supervisor.name !== loggedInSupervisor}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!supervisorLock && (  <div className='supervisor-button-div'>
        <button className='send' type="submit" onClick={sendToHod}>SEND TO HOD</button>
      </div>)}
    </div>
  );
};

export default SupervisorSideExtension;
