import React, { useState, useEffect } from "react";

import FormTitleBar from "../formTitleBar/FormTitleBar";
import Student from "./roles/Student";
import Supervisor from "./roles/Supervisor";
import Hod from "./roles/Hod";
import Dordc from "./roles/Dordc";
import RoleBasedWrapper from "../roleWrapper/RoleBasedWrapper";
const ConstituteOfIRB = ({formData}) => {
 

  return (
    <>
      <FormTitleBar formName="CONSTITUTE OF INSTITUTE RESEARCH BOARD" formData={formData} />
      <div className="form-container">
        
      <RoleBasedWrapper 
      roleHierarchy={formData.steps}
      currentRole={formData.role}>
        <Student formData={formData} ></Student>
        <Supervisor formData={formData} />
        <Hod formData={formData} />
        <Dordc formData={formData} />
        </RoleBasedWrapper>
      </div>
    </>
  );
};

export default ConstituteOfIRB;
