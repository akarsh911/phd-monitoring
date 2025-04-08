import React, { useEffect,useState } from 'react';
import Layout from '../../components/dashboard/layout';
import { useLoading } from '../../context/LoadingContext';
import { useLocation } from 'react-router-dom';
import FilterBar from '../../components/filterBar/FilterBar';
import PagenationTable from '../../components/pagenationTable/PagenationTable';

const FacultyPage = () => {
    const[filter, setFilter] = useState([]);
    const { setLoading } = useLoading();
    const location = useLocation();

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    }


    return (
        <Layout children={
            <>
                <FilterBar onSearch={handleFilterChange}/>
                <PagenationTable
                    endpoint={location.pathname}
                    filters={filter}
                    enableApproval={false}
                    customOpenForm={(id) => console.log(id)}
                />
             
            </>
        } />
    );
}

export default FacultyPage;