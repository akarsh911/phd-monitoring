import React, { useEffect,useState } from 'react';
import Layout from '../../components/dashboard/layout';
import ProfileCard from '../../components/profileCard/ProfileCard';

const StudentProfile = () => {
    return (
        <Layout children={
            <>
            {
               <ProfileCard/>
            }
             
            </>
        } />
    );
}

export default StudentProfile;