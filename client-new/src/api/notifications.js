// src/api/notifications.js

import { baseURL } from "./urls";
import { customFetch } from "./base";

// Fetch unread notifications (for the dropdown)
export const APIlistUnreadNotifications = async (setNotifications) => {
  customFetch(baseURL + "/notifications/unread", "GET", null, false, false)
    .then((result) => {
      if (result.success) {
        const notif = result.response;
        setNotifications(notif.reverse());
      }
    })
    .catch((error) => {
      console.error("Error fetching unread notifications", error);
    });
};

// Mark a specific notification as read
export const APImarkNotificationAsRead = async (notificationId) => {
  customFetch(baseURL + "/notifications/mark-as-read/" + notificationId, "PUT", null, false, false)
    .then((result) => {
      if (result.success) {
        // Optional: toast.success(result.response);
      }
    })
    .catch((error) => {
      console.error("Error marking notification as read", error);
    });
};

// ✅ New: Fetch ALL notifications (for full notifications page)
export const APIlistAllNotifications = async (setNotifications) => {
  customFetch(baseURL + "/notifications", "GET", null, false, false)
    .then((result) => {
      if (result.success) {
        const notif = result.response;
        setNotifications(notif.reverse());
      }
    })
    .catch((error) => {
      console.error("Error fetching all notifications", error);
    });
};
