import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { baseURL } from "../../../api/urls";
import { customFetch } from "../../../api/base";
import { useLoading } from "../../../context/LoadingContext";
import Student from './roles/Student';

const SupervisorAllocation = () => {

    const [formData, setFormData] = useState({});
    const { setLoading } = useLoading();
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const url = baseURL + location.pathname;
        customFetch(url, "GET")
            .then((data) => {
                if (data && data.success) {
                    setFormData(data.response);
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
            <h1>Supervisor Allocation</h1>
            <Student></Student>
        </>
    );
}

export default SupervisorAllocation;