import React, { useEffect, useState } from "react";
import Layout from "../../components/dashboard/layout";
import SupervisorAllocation from "../../components/forms/supervisorAllocation/SupervisorAllocation";
import "./forms.css";
import { useLoading } from "../../context/LoadingContext";
import { useLocation } from "react-router-dom";
import { customFetch } from "../../api/base";
import { baseURL } from "../../api/urls";
const MainFormPage = () => {

    const [formData, setFormData] = useState({});
    const { setLoading } = useLoading();
    const [isLoaded, setIsLoaded] = useState(false);
    const location = useLocation();
  
    useEffect(() => {
      setLoading(true);
      const url = baseURL + location.pathname;
      customFetch(url, "GET")
        .then((data) => {
          if (data && data.success) {
            setFormData(data.response);
            setIsLoaded(true);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, []);


  return (
    <Layout
      children={
        <>
          {isLoaded && formData && (
            <>
              <SupervisorAllocation formData={formData} />
            </>
          )}
        </>
      }
    />
  );
};

export default MainFormPage;
