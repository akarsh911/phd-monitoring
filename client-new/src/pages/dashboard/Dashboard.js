import React, { useState } from 'react';
import './Dashboard.css'; 
import Layout from '../../components/dashboard/layout';
import { useLoading } from '../../context/LoadingContext';
import ProfileCard from '../../components/profileCard/ProfileCard';

const Dashboard = () => {
    const [role, setRole] = useState();
    const { setLoading } = useLoading();

  return (
    <>
      <Layout children={[
        <ProfileCard link={true}/>
      ]} />
    </>
  );
}

export default Dashboard;
