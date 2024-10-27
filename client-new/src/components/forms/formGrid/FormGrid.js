import React, { useEffect, useState } from "react";
import "./FormGrid.css";
import { useLocation } from 'react-router-dom';
import { baseURL } from "../../../api/urls";
import { customFetch } from "../../../api/base";
import { useLoading } from "../../../context/LoadingContext";

const FormGrid = () => {
    const [forms, setForms] = useState([]);
    const { setLoading } = useLoading();
    const location = useLocation();
    useEffect(() => {
        setLoading(true);
        const url= baseURL+location.pathname;
        customFetch(url, "GET")
            .then((data) => {
                if(data && data.success)
                setForms(data.response);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
       
            });
    }, []);

    const handleClick = (form) => {
        const newUrl = `${location.pathname}/${form.form_type}`;
        window.location.href = newUrl;
    }
    return (
      <>
         <h2>Available Forms</h2>
            {forms.length > 0 ? (
                <div className="form-grid-container">
                {forms.map((form) => (
                    <div key={form.id} onClick={() => handleClick(form)} className="form-card">
                        {form.action_required && (
                            <span className="action-label"></span>
                        )}
                        <h3 className="form-title">{form.form_name}</h3>
                    </div>
                ))}
                </div>
            ) : (
                <p>No forms to display</p>
            )}
      </>
    );
};

export default FormGrid;
