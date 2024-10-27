import React, { useState, useEffect, useRef } from "react";
import "./NotificationBox.css";

const NotificationBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef(null);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
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
    <div className="notification_wrapper" ref={notificationRef}>
      <div className="notification_icon" onClick={toggleNotifications}>
        <img src="/icons/notifications.svg" alt="Notifications" className="notif_icon" />
        <div className="notification_badge">34</div>
      </div>
      {isOpen && (
        <div className="notification_box">
          <div className="notification_header">
            <h3>Notifications</h3>
          </div>
          <div className="notification_content">
          
            <div className="notification_item">
              <h4>Main title of notification</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            </div>
          </div>
          <div className="notification_footer">
            <a href="/notifications" className="see_all">See all</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBox;
