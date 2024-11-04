import React, { useState, useEffect } from "react";
import Student from "./roles/Student";
import FormTitleBar from "../formTitleBar/FormTitleBar";
import PhDCoordinator from "./roles/PhDCoordinator";
import Recommendation from "../layouts/Recommendation";

const SupervisorChange = ({formData}) => {
 

  return (
    <>
      <FormTitleBar formName="Supervisor Allocation" formData={formData} />
      <div className="form-container">
        <Student formData={formData}></Student>
        <PhDCoordinator formData={formData}></PhDCoordinator>
        <Recommendation
          formData={formData}
          role="hod"
          allowRejection={false}
        ></Recommendation>
      </div>
    </>
  );
};

export default SupervisorChange;
