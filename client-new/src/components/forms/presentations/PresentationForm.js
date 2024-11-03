import "./Presentation.css";
import React, { useEffect, useState } from "react";
import Student from "./roles/Student";
import FormTitleBar from "../formTitleBar/FormTitleBar";

const PresentationForm = ({formData}) => {
  console.log(formData);
  return (
    <>
      <FormTitleBar formName={"Presentation " + formData.period_of_report} formData={formData} />
      <div className="form-container">
        <Student formData={formData}/>
      </div>
    </>
  );
};
export default PresentationForm;
