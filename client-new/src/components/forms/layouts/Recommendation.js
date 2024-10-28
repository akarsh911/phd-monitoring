import React, { useEffect,useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import RecommendationField from '../fields/RecommendationField';
import GridContainer from '../fields/GridContainer';
import CustomButton from '../fields/CustomButton';
import InputField from '../fields/InputField';
import { getRoleName } from '../../../utils/roleName';
import { useLoading } from '../../../context/LoadingContext';
import { submitForm } from '../../../api/form';

const Recommendation = ({formData,allowRejection,role}) => {
    const [roleName, setRoleName] = useState('');
    const [body, setBody] = useState({});
    const [lock, setLock] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const location = useLocation();
    const { setLoading } = useLoading();
   
    useEffect(() => {
        if (role && formData) {
            console.log('hello',formData.approvals[role])
            setRoleName(getRoleName(role));
            setBody({
                approval: formData.approvals[role],
                rejection: false,
                comments: formData.comments[role],
            });
            setLock(!!formData.locks[role]);
        }
    }, [role, formData]);

    const onRecommendationChange = (data) => {
        console.log("Recommendation Data:", data);
        body.approval = data.approval;
        body.rejected = data.rejected;
    };


    return (
        <>
            <RecommendationField role={roleName} allowRejection={allowRejection} onRecommendationChange={(data)=>{onRecommendationChange(data)}} initialValue={body} lock={lock} />
            <GridContainer elements={[
                <InputField label="Remarks (if any)" initialValue={body.comments} isLocked={lock} hint="Enter Student ID..." onChange={(value) => body.comments=value} />
            ]}
            space={2}
            />
            { !lock && ( <GridContainer elements={[
                <CustomButton text='Submit' onClick={()=>{submitForm(body,location,setLoading)}} />
            ]}/>)}

        </>
    );
}
export default Recommendation;