import { customFetch } from "./base"
import { ENDPOINTS } from "./urls"

export const loginAPI = async (email, password) => {
    const data = await customFetch(ENDPOINTS.LOGIN,"POST",{
        email: email,
        password: password
    });
  
    if(data && data.success){
        localStorage.setItem("token",data.response.token);
        localStorage.setItem("userRole",data.response.user.role.role);
        localStorage.setItem("user",JSON.stringify(data.response.user));
        return true;
    }
    return false;
}