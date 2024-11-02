import React from 'react';
import './CreateNewBar.css';
import { useLocation } from 'react-router-dom';
import { baseURL } from "../../../api/urls";
import { customFetch } from "../../../api/base";
import { useLoading } from "../../../context/LoadingContext";
import CustomButton from '../fields/CustomButton';
import GridContainer from '../fields/GridContainer';

const CreateNewBar = () => {
    const { setLoading } = useLoading();
    const location = useLocation();
   
    const handleClick = () => {
        setLoading(true);
        const url = baseURL + location.pathname ;
        customFetch(url, 'POST')
            .then((data) => {
                if (data && data.success) {
                    window.location.reload();
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    };

    return (
        <GridContainer
        elements={[
          <></>,
          <></>,
          <>
            <CustomButton onClick={handleClick} text='Create New Form +' />
        </>
        ]}
        />
    );
};

export default CreateNewBar;