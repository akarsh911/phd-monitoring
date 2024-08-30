import React from 'react';
import './Modal.css'; // Import the CSS file for styling

function StatusModal({ closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <div className="timeline-container">
    <div className="timeline-item">
        <div className="timeline-marker green"></div>
        <div className="timeline-content">
            <p>Form initiated</p>
        </div>
        <div className="timeline-time">19th Jul<br/>8:06 PM</div>
    </div>
    <div className="timeline-item">
        <div className="timeline-line"></div>
        <div className="timeline-marker green"></div>
        <div className="timeline-content">
            <p>Approval by the Supervisor</p>
        </div>
        <div className="timeline-time">2nd Aug<br/>9:44 AM</div>
    </div>
    <div className="timeline-item">
        <div className="timeline-line"></div>
        <div className="timeline-marker red"></div>
        <div className="timeline-content">
            <p>Approval by the HoD</p>
        </div>
        <div className="timeline-time">6th Aug<br/>2:44 PM</div>
    </div>
</div>
    </div>
    </div>
  );
}

export default StatusModal;
