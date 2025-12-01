import { customFetch } from "./base";
import { baseURL } from "./urls";

export const googleLoginAPI = async (accessToken) => {
    const result = await customFetch(baseURL + "/google/login", "POST", {
        access_token: accessToken
    });
  
    if (result && result.success) {
        localStorage.setItem("token", result.response.token);
        localStorage.setItem("userRole", result.response.user.role.role);
        localStorage.setItem("available_roles", JSON.stringify(result.response.available_roles));
        localStorage.setItem("user", JSON.stringify(result.response.user));
        return { success: true };
    }
    
    // Return error information
    return { 
        success: false, 
        error: result?.response?.error || result?.response?.message || 'Google login failed'
    };
};
