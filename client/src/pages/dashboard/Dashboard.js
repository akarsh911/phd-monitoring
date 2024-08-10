import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Navbar from "./Navbar";
import ConstituteOfIrb from "../forms/ConstituteOfIrb/ConstituteOfIrb.js";
import IrbSubmission from "../forms/IrbSubmission";
import IrbSubmissionSup from "../forms/IrbSubmissionSup";
import StudentList from "../teachers_view/StudentList.js";
import ResearchProposalExtensionForm from "../forms/FormForExtension/Extension.js";
import ProgressMonitoring from "../forms/ProgressMonitoring/ProgressMonitoring.js";
import SupSideIrb from "../forms/ConstituteOfIrb/SupSideIrb.js";
import ThesisSubForm from "../forms/ThesisSubmission/ThesisSub.js";
import StatusChange from "../forms/ChangeOfStatus/StatusChange.js";
import ThesisExtensionForm from "../forms/ThesisExtension/ThesisExtension.js";
import SupervisorChange from "../forms/SupervisorChange/SupervisorChange.js";
import StatusChangeForm from "../forms/ChangeOfStatus/StatusChange.js";
import SupAllocation from "../forms/SupAllocation/SupAllocation.js";
import ListOfExaminer from "../forms/ListOfExaminer/ListOfExaminer.js";
import Publications from "../forms/Publications/Publications.js";
import FormCard from './FormCard';

const SideLeftMenu = () => {
  const [activeForm, setActiveForm] = useState(null);

  const handleCardClick = (formComponent) => {
    setActiveForm(formComponent);
  };

  const formCards = [
    { component: <StudentList />, title: "Student List", icon: "/graph-1.svg" },
    { component: <ResearchProposalExtensionForm />, title: "Research Proposal Extension", icon: "/group.svg" },
    { component: <ConstituteOfIrb />, title: "Constitute of IRB", icon: "/iconoutlineshoppingcart.svg" },
    { component: <Publications />, title: "Publications", icon: "/interface--chart-line.svg" },
    { component: <StatusChange />, title: "Status Change", icon: "/mdimessageprocessingoutline.svg" },
    { component: <SupervisorChange />, title: "Supervisor Change", icon: "/mdicogoutline.svg" },
    { component: <ProgressMonitoring />, title: "Progress Monitoring", icon: "/iconoutlineshoppingcart.svg" },
    { component: <SupAllocation />, title: "Supervisor Allocation", icon: "/iconoutlineshoppingcart.svg" },
    { component: <StatusChangeForm />, title: "Status Change Form", icon: "/iconoutlineshoppingcart.svg" },
    { component: <IrbSubmission />, title: "IRB Submission", icon: "/iconoutlineshoppingcart.svg" },
    { component: <IrbSubmissionSup />, title: "IRB Submission Sup", icon: "/iconoutlineshoppingcart.svg" },
    { component: <ListOfExaminer />, title: "List of Examiner", icon: "/iconoutlineshoppingcart.svg" },
    { component: <ThesisSubForm />, title: "Thesis Submission", icon: "/iconoutlineshoppingcart.svg" },
    { component: <ThesisExtensionForm />, title: "Thesis Extension", icon: "/iconoutlineshoppingcart.svg" },
  ];

  return (
    <div>
      <Navbar activeForm={activeForm} />

      <div className="side-left-menu">
        <div className="tietlogo">
          <img src="tiet-logoremovebgpreview-1@2x.png" alt="My Image" />
        </div>
        <div className="icons">
          {formCards.map((formCard, index) => (
            <FormCard
              key={index}
              title={formCard.title}
              icon={formCard.icon}
              onClick={() => handleCardClick(formCard.component)}
            />
          ))}
        </div>
      </div>
      <div className="form-container">
        {activeForm}
      </div>
    </div>
  );
};

export default SideLeftMenu;
