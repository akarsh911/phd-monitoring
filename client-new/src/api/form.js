import { toast } from "react-toastify";
import { customFetch } from "./base";
import { baseURL } from "./urls";


export const submitForm = async (body,location,setLoading) => { 
    setLoading(true);
    const url = baseURL + location.pathname;
    customFetch(url, "POST", body)
        .then((data) => {
            if (data && data.success) {
                toast.success('Form Submitted Successfully');
                window.location.reload();
            }
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
}