// NavBar.jsx
import React from 'react';
import './NavBar.css';

const CustomNavBar = ({ activeButton }) => {
    activeButton = 'home';
  const userRole = 'admin';
  return (
    <div className="side-left-menu">
      <div className="tietlogo">
        <img src="/images/tiet_logo.png" alt="Logo" />
      </div>
      <div className="icons">
        <button 
          className={`menu-button ${activeButton === 'home' ? 'active' : ''}`} 
          onClick={() => console.log('Navigate to Home')}
        >
          <span className="icon">🏠</span>
          <span className="text">Home</span>
        </button>
        
        {userRole === 'admin' && (
          <button 
            className={`menu-button ${activeButton === 'admin' ? 'active' : ''}`} 
            onClick={() => console.log('Navigate to Admin')}
          >
            <span className="icon">🛠️</span>
            <span className="text">Admin Panel</span>
          </button>
        )}

        {userRole === 'user' && (
          <button 
            className={`menu-button ${activeButton === 'user' ? 'active' : ''}`} 
            onClick={() => console.log('Navigate to User')}
          >
            <span className="icon">👤</span>
            <span className="text">User Dashboard</span>
          </button>
        )}

        <button 
          className={`menu-button ${activeButton === 'about' ? 'active' : ''}`} 
          onClick={() => console.log('Navigate to About')}
        >
          <span className="icon">ℹ️</span>
          <span className="text">About</span>
        </button>
        
        <button 
          className={`menu-button ${activeButton === 'contact' ? 'active' : ''}`} 
          onClick={() => console.log('Navigate to Contact')}
        >
          <span className="icon">✉️</span>
          <span className="text">Contact</span>
        </button>
      </div>
    </div>
  );
};

export default CustomNavBar;
