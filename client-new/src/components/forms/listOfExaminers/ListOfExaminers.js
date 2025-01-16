import React, { useState, useEffect } from "react";
import Student from "./roles/Student";
import FormTitleBar from "../formTitleBar/FormTitleBar";
import Supervisor from "./roles/Supervisor";
import Recommendation from "../layouts/Recommendation";

const ListOfExaminers = ({formData}) => {
 

  return (
    <>
      <FormTitleBar formName="List of Examiners" formData={formData} />
      <div className="form-container">
        <Student formData={formData}></Student>
        <Supervisor formData={formData}></Supervisor>
      
        <Recommendation
          formData={formData}
          role="hod"
          allowRejection={false}
        ></Recommendation>

        <Recommendation
          formData={formData}
          role="director"
          allowRejection={false}
        ></Recommendation>
      </div>
    </>
  );
};

export default ListOfExaminers;
