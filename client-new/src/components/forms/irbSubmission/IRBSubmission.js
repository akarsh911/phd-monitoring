import React, { useState, useEffect } from "react";
import Student from "./roles/Student";
import FormTitleBar from "../formTitleBar/FormTitleBar";
import Recommendation from "../layouts/Recommendation";
import Supervisor from "./roles/Supervisor";
import RoleBasedWrapper from "../roleWrapper/RoleBasedWrapper";


const IRBSubmission = ({ formData }) => {
  return (
    <>
      <FormTitleBar formName="IRB Submission" formData={formData} />
      <div className="form-container">
      <RoleBasedWrapper
      roleHierarchy={formData.steps}
      currentRole={formData.role}> 
        <Student formData={formData}></Student>
        <Supervisor formData={formData} ></Supervisor>
         <Recommendation
          formData={formData}
          role="external"
          allowRejection={false}
        ></Recommendation>
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
          role="adordc"
          allowRejection={false}
        ></Recommendation>
        <Recommendation
          formData={formData}
          role="dordc"
          allowRejection={false}
        ></Recommendation>
        </RoleBasedWrapper>
      </div>
    </>
  );
};

export default IRBSubmission;
