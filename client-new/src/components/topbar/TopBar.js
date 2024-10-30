import React from "react";
import RouteBar from "../routebar/RouteBar";
import NotificationBox from "../notificationBox/NotificationBox";
import "./TopBar.css";
import { generateAvatar } from "../../utils/profileImage";


const TopBar = ({ headingText }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user.first_name + " " + user.last_name;  
  const role = localStorage.getItem("userRole");
  const image= user.profile_image===undefined || user.profile_image===null ? generateAvatar(user.first_name,user.last_name) : user.profile_image;
  
  return (
    <>
      <div className="topbar_sub">
        <h2>{headingText}</h2>
        <div className="topbar_right">
          <NotificationBox />
          <div className="user_section">
            <img
              src={image}
              alt="User Profile"
              className="user_profile_image"
            />
            <div className="user_info">
              <span className="user_name">{name}</span>
              <span className="user_role">{role}</span>
            </div>
          </div>
        </div>
      </div>
      <RouteBar />
    </>
  );
};

export default TopBar;
