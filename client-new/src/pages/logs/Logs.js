import React, { useEffect,useState } from 'react';
import Layout from '../../components/dashboard/layout';
import LogViewer from '../../components/logViewer/LogViewer';

const Logs = () => {


  return (
    <>

       <Layout children={
        <>
          <LogViewer/>
        </>
        }/>

    </>
  );
}

export default Logs;
