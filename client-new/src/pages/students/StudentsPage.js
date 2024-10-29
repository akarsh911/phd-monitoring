import React, { useEffect,useState } from 'react';
import Layout from '../../components/dashboard/layout';
import StudentTable from '../../components/studentList/StudentTable';
import { useLoading } from '../../context/LoadingContext';
import { baseURL } from '../../api/urls';
import { useLocation } from 'react-router-dom';
import { customFetch } from '../../api/base';
import ProfileCard from '../../components/profileCard/ProfileCard';

const StudentsPage = () => {
    const [students, setStudents] = useState([]);
    const { setLoading } = useLoading();
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const url = baseURL + location.pathname;
        customFetch(url, "GET")
            .then((data) => {
                if (data && data.success) {
                    setStudents(data.response);
                }
                setLoading(false);

            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);


    return (
        <Layout children={
            <>
            {
                students.length > 0 && <StudentTable students={students} />
            }
             
            </>
        } />
    );
}

export default StudentsPage;