import { toast } from "react-toastify";
import { baseURL } from "./urls";
import { customFetch } from "./base";

export const APIlistUnreadNotifications = async (setNotifications) => {
    customFetch(baseURL+"/notifications/unread",'GET',null,false,false)
    .then((result)=>{
        if(result.success){
            setNotifications(result.response);
        }
    })
    .catch((error)=>{})
};
export const APImarkNotificationAsRead = async (notificationId) => {
    customFetch(baseURL+"/notifications/mark-as-read/"+notificationId,'PUT',null,false,false)
    .then((result)=>{
        if(result.success){
            // toast.success(result.response);
        }
    })
    .catch((error)=>{})
};