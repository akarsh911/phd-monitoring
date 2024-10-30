import React, { useState, useEffect } from "react";

import FormTitleBar from "../formTitleBar/FormTitleBar";
// import PhDCoordinator from "./roles/PhDCoordinator";
import Recommendation from "../layouts/Recommendation";
import Student from "./roles/Student";
import Supervisor from "./roles/Supervisor";
import Hod from "./roles/Hod";
import Dordc from "./roles/Dordc";
const ConstituteOfIRB = ({formData}) => {
 

  return (
    <>
      <FormTitleBar formName="CONSTITUTE OF INSTITUTE RESEARCH BOARD" formData={formData} />
      <div className="form-container">
        <Student formData={formData}></Student>
        <Supervisor formData={formData} />
        <Hod formData={formData} />
        <Dordc formData={formData} />
      </div>
    </>
  );
};

export default ConstituteOfIRB;
