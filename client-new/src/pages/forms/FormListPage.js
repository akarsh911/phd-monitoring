import React, { useEffect, useState } from 'react';
import Layout from '../../components/dashboard/layout';
import FormList from '../../components/forms/formList/FormList';
import { useLocation } from 'react-router-dom';
import CreateNewBar from '../../components/forms/formList/CreateNewBar';

const FormListPage = () => {
    const location = useLocation();
    const [role, setRole] = useState();
    const [showButton, setShowButton] = useState(false);
    const [rollNumber, setRollNumber] = useState(null);

    useEffect(() => {
        // Set the user role from localStorage
        setRole(localStorage.getItem("userRole"));

        // Check if the URL matches the required pattern
        const match = location.pathname.match(/^\/students\/(\d+)\/forms\/list-of-examiners$/);
        if (match) {
            setShowButton(true);
            setRollNumber(match[1]); // Extract roll number from URL
        } else {
            setShowButton(false);
        }
    }, [location]);

    return (
        <Layout
            children={
                <>
                    {role === "faculty" && showButton && <CreateNewBar rollNumber={rollNumber} />}
                    <FormList />
                </>
            }
        />
    );
};

export default FormListPage;
