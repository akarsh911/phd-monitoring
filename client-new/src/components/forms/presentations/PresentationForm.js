import "./Presentation.css";
import React, { useEffect, useState } from "react";
import Student from "./roles/Student";
import FormTitleBar from "../formTitleBar/FormTitleBar";

const PresentationForm = ({formData}) => {
  return (
    <>
      <FormTitleBar formName="Presentation 2024" formData={formData} />
      <div className="form-container">
        {/* <Student /> */}
      </div>
    </>
  );
};
export default PresentationForm;
