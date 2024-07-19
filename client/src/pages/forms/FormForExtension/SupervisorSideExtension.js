import React, { useState, useEffect } from 'react';
import './SupervisorSideExtension.css';

const SupervisorSideExtension = ({ loggedInSupervisor }) => {
  const [supervisors, setSupervisors] = useState([
    { name: '', recommended: null, remarks: '' },
    { name: '', recommended: null, remarks: '' },
    { name: '', recommended: null, remarks: '' },
  ]);

  useEffect(() => {
    // Fetch supervisors from the API using fetch()
    fetch('https://api.example.com/supervisors') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        setSupervisors(data);
      })
      .catch(error => {
        console.error('Error fetching supervisors:', error);
      });
  }, []);

  const handleRecommendationChange = (index, recommendation) => {
    const newSupervisors = [...supervisors];
    newSupervisors[index].recommended = recommendation;
    setSupervisors(newSupervisors);
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
                  checked={supervisor.recommended === 'recommended'}
                  onChange={() => handleRecommendationChange(index, 'recommended')}
                  disabled={supervisor.name !== loggedInSupervisor}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`recommendation-${index}`}
                  checked={supervisor.recommended === 'not-recommended'}
                  onChange={() => handleRecommendationChange(index, 'not-recommended')}
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
      <div className='supervisor-button-div'>
        <button className='send' type="submit">SEND TO HoD</button>
      </div>
    </div>
  );
};

export default SupervisorSideExtension;
