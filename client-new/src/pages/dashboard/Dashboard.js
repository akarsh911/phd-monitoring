import React, { useEffect, useState } from 'react';
import './Dashboard.css'; 
import Layout from '../../components/dashboard/layout';
import { useLoading } from '../../context/LoadingContext';
import ProfileCard from '../../components/profileCard/ProfileCard';
import { customFetch } from '../../api/base';
import { baseURL } from '../../api/urls';
import FacultyProfile from '../../components/profileCard/FacultyProfile';

const Dashboard = () => {
  const [role, setRole] = useState();
  const { setLoading } = useLoading();
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response = await customFetch(baseURL + '/home', 'GET');

        if (response) {
          response = response.response || response;
          console.log(response);
          setRole(response.type);
          setData(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
        setIsLoaded(true);
      }
    };

    fetchData();
  }, [setLoading]);

  return (
    <Layout>
      {isLoaded && (
        <>
      {role === 'student' ? (
        <ProfileCard data={data} />
      ) : (
        <FacultyProfile faculty={data} />
      )}
      </>
    )}
    </Layout>
  );
};

export default Dashboard;
