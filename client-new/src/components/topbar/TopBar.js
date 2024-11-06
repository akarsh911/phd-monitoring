import React from "react";
import RouteBar from "../routebar/RouteBar";
import NotificationBox from "../notificationBox/NotificationBox";
import "./TopBar.css";
import ProfileBox from "../profileBox/ProfileBox";


const TopBar = ({ headingText }) => {
  
  return (
    <>
      <div className="topbar_sub">
        <h2>{headingText}</h2>
        <div className="topbar_right">
          <NotificationBox />
          <ProfileBox/>
        </div>
      </div>
      <RouteBar />
    </>
  );
};

export default TopBar;
