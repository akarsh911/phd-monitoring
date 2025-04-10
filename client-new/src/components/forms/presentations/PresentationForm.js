import "./Presentation.css";
import React, { useEffect, useState } from "react";
import Student from "./roles/Student";
import FormTitleBar from "../formTitleBar/FormTitleBar";
import Recommendation from "../layouts/Recommendation";
import Supervisor from "./roles/Supervisor";
import RoleBasedWrapper from "../roleWrapper/RoleBasedWrapper";

const PresentationForm = ({formData, refetchData = null,}) => {
  return (
    <>
      <FormTitleBar formName={"Presentation " + formData.period_of_report} formData={formData} />
      <div className="form-container">
          
    <RoleBasedWrapper
       roleHierarchy={formData.steps}
       currentRole={formData.role}>
    

        <Student formData={formData} refetchData={refetchData}/>
        <Supervisor formData={formData}/>
        <Recommendation
          formData={formData}
          role="doctoral"
          allowRejection={false}
        ></Recommendation>
        <Recommendation
          formData={formData}
          role="hod"
          allowRejection={false}
        ></Recommendation>
       
        <Recommendation
          formData={formData}
          role="dordc"
          allowRejection={false}
        ></Recommendation>
       <Recommendation
          formData={formData}
          role="dra"
          allowRejection={false}
        ></Recommendation>
       </RoleBasedWrapper>
      </div>
    </>
  );
};
export default PresentationForm;
