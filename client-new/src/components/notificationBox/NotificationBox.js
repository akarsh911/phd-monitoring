import React, { useState, useEffect, useRef } from "react";
import "./NotificationBox.css";
import { APIlistUnreadNotifications, APImarkNotificationAsRead } from "../../api/notifications";
import { toast } from "react-toastify";
import { getRoleName } from "../../utils/roleName";

const NotificationBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef(null);
  const [notifications, setNotifications] = useState([]);

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

  useEffect(() => {
    APIlistUnreadNotifications(setNotifications);
  }, []);

  const onNotificationClick = (notification) => {
    const role = localStorage.getItem("roleName");
    // Open notification.link in a new tab
   
    if (notification && notification.link) {
      if(role!==notification.role){
        toast.warn("You need to switch to "+getRoleName( notification.role)+" role to view this notification");
        return;
      }
      APImarkNotificationAsRead(notification.id);
      window.open(notification.link, "_blank");
    }
  };

  return (
    <div className="notification_wrapper" ref={notificationRef}>
      <div className="notification_icon" onClick={toggleNotifications}>
        <img src="/icons/notifications.svg" alt="Notifications" className="notif_icon" />
        {notifications.length > 0 && (
          <div className="notification_badge">{notifications.length}</div>
        )}
      </div>
      {isOpen && (
        <div className="notification_box">
          <div className="notification_header">
            <h3>Notifications</h3>
          </div>
          <div className="notification_content">
            {notifications?.map((notification) => (
              <div
                className="notification_item"
                key={notification.id}
                onClick={() => onNotificationClick(notification)}
              >
                <h4>{notification.title}</h4>
                <p>{notification.body}</p>
              </div>
            ))}
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
