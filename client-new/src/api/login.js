import { customFetch } from "./base"
import { ENDPOINTS } from "./urls"

export const loginAPI = async (email, password) => {
    const data = await customFetch(ENDPOINTS.LOGIN,{
        email: email,
        password: password
    });
  
    if(data && data.success){
        localStorage.setItem("token",data.response.token);
        localStorage.setItem("userRole",data.response.user.role);
        localStorage.setItem("user",data.response.user);
        return true;
    }
    return false;
}