import React, { useEffect,useState } from 'react';
import Layout from '../../components/dashboard/layout';
import FormList from '../../components/forms/formList/FormList';


const FormListPage = () => {

    return (
        <>
        <Layout children={
            <>
              <FormList />
            </>
        } />
        </>
    );
};

export default FormListPage;