import React, { useState, useEffect } from "react";
import Student from "./roles/Student";
import FormTitleBar from "../formTitleBar/FormTitleBar";
import Recommendation from "../layouts/Recommendation";
import Supervisor from "./roles/Supervisor";

const IRBSubmission = ({ formData }) => {
  return (
    <>
      <FormTitleBar formName="IRB Submission" formData={formData} />
      <div className="form-container">
        <Student formData={formData}></Student>
        <Supervisor formData={formData}></Supervisor>
        {formData.form_type === "revised" && (
          <Recommendation
            formData={formData}
            role="external"
            allowRejection={false}
          ></Recommendation>
        )}

        <Recommendation
          formData={formData}
          role="hod"
          allowRejection={false}
        ></Recommendation>
        <Recommendation
          formData={formData}
          role="dra"
          allowRejection={false}
        ></Recommendation>
        <Recommendation
          formData={formData}
          role="dordc"
          allowRejection={false}
        ></Recommendation>
      </div>
    </>
  );
};

export default IRBSubmission;
