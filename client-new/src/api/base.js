import { toast } from "react-toastify";

export const customFetch = async (
  link,
  method,
  body = {},
  showToast = true,
  isFormData = false
) => {
  try {
    const options = {
      method: method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    };

    if (isFormData) {
      // Only set body without headers for FormData
      options.body = body;
    } else {
      options.headers["Content-Type"] = "application/json";
      if (method !== "GET" && method !== "HEAD") {
        options.body = JSON.stringify(body);
      }
    }

    const response = await fetch(link, options);
    if (response.ok) {
      return {
        success: true,
        response: await response.json(),
      };
    } else {
      throw response;
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    if (error instanceof Response) {
      error
        .json()
        .then((data) => {
          if (error.status === 422) {
            if (showToast) toast.error(data.message);
            return { success: false, response: data };
          } else if (error.status === 401) {
            if (showToast) toast.error(data.error);
            return { success: false, response: data };
          } else if (error.status === 500) {
            if (showToast) toast.error("Internal server error");
            return { success: false, response: data };
          } 
          else if (error.status === 400) {
            let errorString = "";

            for (const key in data) {
              errorString += `${key}: ${data[key]}\n`;
            }
            console.log(errorString);
            if (showToast) toast.error(errorString);
            return { success: false, response: data };
          }
          else {
            if (showToast) toast.error(data.message);
            return { success: false, response: data };
          }
        })
        .catch((jsonError) => {
          console.error("Error parsing JSON:", jsonError);
          return { success: false, response: jsonError };
        });
    } else {
      if (showToast) toast.error("Unexpected error: " + error);
    
      return { success: false, response: error };
    }
  }
};
