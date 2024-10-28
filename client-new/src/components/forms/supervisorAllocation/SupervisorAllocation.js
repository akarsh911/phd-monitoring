import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { baseURL } from "../../../api/urls";
import { customFetch } from "../../../api/base";
import { useLoading } from "../../../context/LoadingContext";
import Student from './roles/Student';
import FormTitleBar from '../formTitleBar/FormTitleBar';
import PhDCoordinator from './roles/PhDCoordinator';
import Recommendation from '../layouts/Recommendation';

const SupervisorAllocation = () => {

    const [formData, setFormData] = useState({});
    const {setLoading } = useLoading();
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
        <>
        {isLoaded && formData  && (
            <>
            <FormTitleBar formName="Supervisor Allocation" formData={formData} />
         <div className='form-container'>
          <Student formData={formData}></Student>
          <PhDCoordinator formData={formData}></PhDCoordinator>
          <Recommendation formData={formData} role="hod" allowRejection={false}></Recommendation>
          </div>
            </>     
        )}
        </>
    );
}

export default SupervisorAllocation;