import React from "react";
import RouteBar from "../routebar/RouteBar";
import NotificationBox from "../notificationBox/NotificationBox";
import "./TopBar.css";


const TopBar = ({ headingText }) => {

  return (
    <>
      <div className="topbar_sub">
        <h2>{headingText}</h2>
        <div className="topbar_right">
          <NotificationBox />
          <div className="user_section">
            <img
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTKqIg3pZGnGVuDbO7piYwe2EBzDMOcMohDv5sIWQ-tnD7ruRla"
              alt="User Profile"
              className="user_profile_image"
            />
            <div className="user_info">
              <span className="user_name">John Doe</span>
              <span className="user_role">Admin</span>
            </div>
          </div>
        </div>
      </div>
      <RouteBar />
    </>
  );
};

export default TopBar;
