import React from 'react';
import './Modal.css'; // Import the CSS file for styling

function StatusModal({ closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <div className="modal-body">
          <h2>Syrinx</h2>
          <p>Creative Computing Society</p>
          <div className="latest-update">
            <p>Latest Update</p>
            <p className="highlight">Event is to be approved by Dean of Student Affairs</p>
          </div>
          <div className="event-details">
            <p><strong>Tentative Venue:</strong> Online</p>
            <p><strong>Expected Footfall:</strong> 1000</p>
            <p><strong>Date:</strong> 25/07/2024 to 26/07/2024</p>
            <p><strong>Time:</strong> 6:00 PM to 6:00 PM</p>
          </div>
          <div className="description">
            <p>Syrinx is an online Capture the Flag event for the students of Thapar University...</p>
          </div>
          <div className="status-updates">
            <ul>
              <li>
                <span className="status-dot created"></span>
                Event proposal created by society. <span className="time">19th Jul 8:06 PM</span>
              </li>
              <li>
                <span className="status-dot recommended"></span>
                Society President has recommended the proposal. <span className="time">2nd Aug 9:44 AM</span>
              </li>
              <li>
                <span className="status-dot recommended"></span>
                ADoSA has recommended the proposal. <span className="time">6th Aug 2:44 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusModal;
