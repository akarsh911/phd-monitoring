import React, { useEffect, useState } from "react";
import { APIlistUnreadNotifications } from "../../api/notifications";
import "./AllNotificationsPage.css";

//import { getFormattedDateTime } from "../../utils/timeParse"; // Optional if you're formatting time
import Layout from "../dashboard/layout";

const AllNotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    APIlistUnreadNotifications(setNotifications);
  }, []);

  return (
    <Layout>
      <div className="all-notifications-page">
        <h1 className="notification-heading">All Notifications</h1>
        <div className="notification-list">
          {notifications.map((notification) => (
            <div
              className="notification-card"
              key={notification.id}
              onClick={() => window.open(notification.link, "_blank")}
            >
              <div className="notification-title">{notification.title}</div>
              <div className="notification-body">{notification.body}</div>
              <span className="notif-date">
                {new Date(notification.created_at).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AllNotificationsPage;
