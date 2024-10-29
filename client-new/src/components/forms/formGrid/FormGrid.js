import React, { useEffect, useState } from "react";
import "./FormGrid.css";
import { useLocation } from 'react-router-dom';


const FormGrid = ({forms}) => {
    const location = useLocation();


    const handleClick = (form) => {
        let path = location.pathname;
        if (path.endsWith('/')) {
            path = path.slice(0, -1);
        }
        const newUrl = `${path}/${form.form_type}`;
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
