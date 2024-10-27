import React, { useEffect,useState } from 'react';
import Layout from '../../components/dashboard/layout';
import SupervisorAllocation from '../../components/forms/supervisorAllocation/SupervisorAllocation';

const MainFormPage = () => {
    return (
        <Layout children={
            <>
              <SupervisorAllocation/>
            </>
        } />
    );
}

export default MainFormPage;