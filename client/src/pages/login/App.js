
import React from 'react';
import './App.css'; // Import CSS file for styling
import Login from './Login.js';

const CenteredDiv = () => {
  return (
    <div className="centered-container">
      <div className="row">
        <div className="left-column">
         <Login/>
        </div>
        <div className="right-column">
        <section classname = "content">
              <h1>Welcome To</h1>
              <span>THAPAR UNIVERSITY</span>
              <p>
              Lorem ipsum dolor sit amet, consectetur adialiqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquipF
              </p>
            </section>

        </div>
      </div>
    </div>
  );
};

export default CenteredDiv;
