import React, { useEffect,useState } from 'react';
import Layout from '../../components/dashboard/layout';
import FormGrid from '../../components/forms/formGrid/FormGrid';
import ProfileBar from '../../components/profileBar/ProfileBar';
import { customFetch } from '../../api/base';
import { ENDPOINTS } from '../../api/urls';
import { useLoading } from '../../context/LoadingContext';

const FormsPage = () => {
    const role = localStorage.getItem('userRole');
    const [user, setUser] = useState();
    const { setLoading } = useLoading();
    useEffect(() => {
          if(role === 'student' ){
              setLoading(true);
              customFetch(ENDPOINTS.STUDENT_PROFILE, 'GET')
              .then((data)=>{
                if(data && data.success){
                  setUser(data.response[0]);
                }
                setLoading(false);
              })
              .catch((error)=>{
                setLoading(false);
                console.log(error);
              });
          }
    }, [role]);
    
  return (
    <>

       <Layout children={
        <>
        <ProfileBar
            progress={user?.overall_progress} 
            studentName={user?.phd_title}
            rollNumber={user?.roll_no}
            irbDate={user?.date_of_irb} 
            synopsisDate={user?.date_of_synopsis}
        />
        <div style={{marginTop:"30px"}}>
        <FormGrid/>
        </div>
        </>
        }/>

    </>
  );
}

export default FormsPage;
