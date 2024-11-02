import { toast } from "react-toastify";
import { baseURL } from "./urls";
import { customFetch } from "./base";

export const APIaddPublication = async (body,close,url=false) => {
    try {
        const formData = new FormData();
        Object.keys(body).forEach((key) => {
            formData.append(key, body[key]);
        });

        const result = await customFetch(url?baseURL+url:baseURL+"/publications", 'POST', formData, true, true);

        if (result.success) {
            toast.success("Publication added successfully.");
            if(close){
                close();
            }
        } else {
            toast.error("Failed to add publication.");
        }
    } catch (error) {
        toast.error(error);
    }
};
