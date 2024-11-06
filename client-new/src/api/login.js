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
        localStorage.setItem("available_roles",JSON.stringify(data.response.available_roles));
        localStorage.setItem("user",JSON.stringify(data.response.user));
        return true;
    }
    return false;
}

export const logoutAPI = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("available_roles");
    localStorage.removeItem("user");
    return true;
}