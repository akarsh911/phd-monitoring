import { toast } from "react-toastify";

export const customFetch = async (link,method,body={}) => {
    try {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    if (method === "POST") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(link, options);

      if (response.ok) {

        return {
            success: true,
            response: await response.json(),
        }
      } else {
        throw response;
      }
    } catch (error) {
      console.log("Error has occurred:", error);
      if (error instanceof Response) {
        error
          .json()
          .then((data) => {
            if (error.status === 422) {
               toast.error(data.message);
               return {
                   success: false,
                   response: data
               }
            } else if (error.status === 401) {
                toast.error(data.error);
                return {
                    success: false,
                    response: data
                }
            } else if (error.status === 500) {
                toast.error("Internal server error");
                return {
                    success: false,
                    response: data
                }
            }
            else{

                toast.error( data.message);
                return {
                    success: false,
                    response: data
                }
            }
          })
          .catch((jsonError) => {
            console.error("Error parsing JSON:", jsonError);
            return {
                success: false,
                response: jsonError
            }
          });

      } else {
        toast.error("Unexpected error:"+ error);
        console.error("Unexpected error:", error);
        return {
            success: false,
            response: error
        }
      }
    }
  };