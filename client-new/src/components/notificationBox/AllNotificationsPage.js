import React, { useEffect, useState } from "react";
import { APIlistUnreadNotifications } from "../../api/notifications";
import "./AllNotificationsPage.css";
import Layout from "../dashboard/layout";

const AllNotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    APIlistUnreadNotifications((data) => {
      setNotifications(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Layout>
        <p>Loading...</p>
       
      </Layout>
    );
  }

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
