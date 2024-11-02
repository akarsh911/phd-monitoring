import React, { useEffect, useState } from "react";
import Layout from "../../components/dashboard/layout";
import SupervisorAllocation from "../../components/forms/supervisorAllocation/SupervisorAllocation";
import "./forms.css";
import { useLoading } from "../../context/LoadingContext";
import { useLocation, useParams } from "react-router-dom";
import { customFetch } from "../../api/base";
import { baseURL } from "../../api/urls";
import ConstituteOfIRB from "../../components/forms/constituteOfIRB/ConstituteOfIRB";
import IRBSubmission from "../../components/forms/irbSubmission/IRBSubmission";
import PresentationForm from "../../components/forms/presentations/PresentationForm";
const MainFormPage = () => {

    const [formData, setFormData] = useState({});
    const { setLoading } = useLoading();
    const [isLoaded, setIsLoaded] = useState(false);
    const location = useLocation();
    const {form_type} = useParams();

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
          {(() => {
              switch (form_type) {
                  case 'supervisor-allocation':
                      return <SupervisorAllocation formData={formData} />;
                  case 'irb-constitution':
                        return <ConstituteOfIRB formData={formData} />;
                  case 'irb-submission':
                        return <IRBSubmission formData={formData} />;
                  case 'presentation':
                        return <PresentationForm formData={formData} />;
                  default:
                      return <p>Are You Sure this is a FORM?</p>;
              }
          })()}
         </>
          )}
        </>
      }
    />
  );
};

export default MainFormPage;
