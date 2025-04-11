import React, { useEffect, useState } from 'react';
import Layout from '../../components/dashboard/layout';
import FormList from '../../components/forms/formList/FormList';
import { useLocation } from 'react-router-dom';
import CreateNewBar from '../../components/forms/formList/CreateNewBar';
import FormTable from '../../components/forms/formTable/FormTable';
import FilterBar from '../../components/filterBar/FilterBar';
import PagenationTable from '../../components/pagenationTable/PagenationTable';

const FormListPage = () => {
    const location = useLocation();
    const [role, setRole] = useState();
    const [showButton, setShowButton] = useState(true);
    const [rollNumber, setRollNumber] = useState(null);
    const [filters, setFilters] = useState({}); // Initialize filters state
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
    const handleSearch = (query) => {
        setFilters((prev) => {
          return JSON.stringify(prev) !== JSON.stringify(query) ? query : prev;
        });
      };
      
    return (
        <Layout
            children={
                <>
                    {role === "faculty" && showButton && <CreateNewBar rollNumber={rollNumber} />}
                    {role !== "student" ? (<>
                        <FilterBar onSearch={handleSearch}/>    
                        <PagenationTable 
                        endpoint={location.pathname}
                        filters={filters}
                        enableApproval={role !== "faculty" && role !== "admin" }
                        enableSelect={role !== "faculty" && role !== "admin"}
                        />                 
                    </>): <FormList />}
                    
                </>
            }
        />
    );
};

export default FormListPage;
