import React, { useState, useEffect, useRef } from "react";
import "./ProfileBox.css";
import { generateAvatar } from "../../utils/profileImage";
import CustomModal from "../forms/modal/CustomModal";
import SwitchRole from "../switchRole/SwitchRole";
const ProfileBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const name =
    user && user.first_name && user.last_name
      ? `${user.first_name} ${user.last_name}`
      : "Name";
  const role = localStorage.getItem("userRole") || "Role";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const image = user.profile_image
    ? user.profile_image
    : generateAvatar(user.first_name, user.last_name);

  const toggleProfileMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="profile_wrapper" ref={profileRef}>
      <div className="user_section" onClick={toggleProfileMenu}>
        <img
          src={image || ""}
          alt="User Profile"
          className="user_profile_image"
        />
        <div className="user_info">
          <span className="user_name">{name}</span>
          <span className="user_role">{role}</span>
        </div>
      </div>

      {isOpen && (
        <div className="profile_box">
          <div className="profile_header">
            <h3>User Menu</h3>
          </div>
          <div className="profile_content">
            <div
              className="profile_item"
              onClick={() => alert("Navigating to Profile")}
            >
              <h4>Profile</h4>
            </div>
            {role !== "Student" && (
              <>
                <div
                  className="profile_item"
                  onClick={() => handleOpenModal()}
                >
                  <h4>Switch Role</h4>
                </div>
                <CustomModal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  minWidth="400px"
                  maxWidth="500px"
                  minHeight="200px"
                  maxHeight="400px"
                >
                  <SwitchRole/>
                </CustomModal>
              </>
            )}
            <div className="profile_item" onClick={() => alert("Logging Out")}>
              <h4>Logout</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileBox;
