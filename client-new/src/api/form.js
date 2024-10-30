import { toast } from "react-toastify";
import { customFetch } from "./base";
import { baseURL } from "./urls";

export const submitForm = async (body, location, setLoading, files = null) => {
    setLoading(true);
    const url = baseURL + location.pathname;
    
  
    let formData

    // Append each file if provided
    if (files) {
        formData = new FormData();
        files.forEach((file) => {
            formData.append(file.key, file.file);
        });
  
        Object.keys(body).forEach((key) => {
            if (Array.isArray(body[key])) {
                body[key].forEach((item) => formData.append(`${key}[]`, item));
            } else {
                formData.append(key, body[key]);
            }
        });
    }
    else{
        formData = body
    }


    try {
        const data = await customFetch(url, "POST", formData, true, files !== null);
        if (data && data.success) {
            toast.success("Form Submitted Successfully");
            window.location.reload();
        }
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
};
