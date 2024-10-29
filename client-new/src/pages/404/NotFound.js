import React from 'react';
import './NotFound.css'; 

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-box">
        <h1>404</h1>
        <p>Page Not Found</p>
        <a href="/home" className="back-link">Home</a>
      </div>
    </div>
  );
}

export default NotFound;
