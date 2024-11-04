import React, { useEffect, useState } from "react";

import FormTitleBar from "../formTitleBar/FormTitleBar";
import Recommendation from "../layouts/Recommendation";
import Student from "./roles/Student";



const StatusChange=({formData}) => {
    return (
      <>
        <FormTitleBar formName={"Application for Status Change"} formData={formData} />
        <div className="form-container">
          <Student formData={formData}/>
          <Recommendation
            formData={formData}
            role="supervisor"
            allowRejection={false}
          ></Recommendation>
          <Recommendation
            formData={formData}
            role="phd_coordinator"
            allowRejection={false}
          ></Recommendation>
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
           <Recommendation
            formData={formData}
            role="director"
            allowRejection={false}
          ></Recommendation>
        </div>
      </>
    );
  };
  export default StatusChange;
  