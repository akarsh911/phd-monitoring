import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Navbar from "./Navbar";
import Forms from "./Forms";
import FormCard from './FormCard';

const SideLeftMenu = () => {
  const [activeForm, setActiveForm] = useState(null);

  const handleCardClick = (formComponent) => {
    setActiveForm(formComponent);
  };

  const formCards = [
    // { component: <StudentList />, title: "Student List", icon: "/graph-1.svg" },
    // { component: <ResearchProposalExtensionForm />, title: "Research Proposal Extension", icon: "/group.svg" },
    // { component: <ConstituteOfIrb />, title: "Constitute of IRB", icon: "/iconoutlineshoppingcart.svg" },
    // { component: <Publications />, title: "Publications", icon: "/interface--chart-line.svg" },
    // { component: <StatusChange />, title: "Status Change", icon: "/mdimessageprocessingoutline.svg" },
    // { component: <SupervisorChange />, title: "Supervisor Change", icon: "/mdicogoutline.svg" },
    // { component: <ProgressMonitoring />, title: "Progress Monitoring", icon: "/iconoutlineshoppingcart.svg" },
    // { component: <SupAllocation />, title: "Supervisor Allocation", icon: "/iconoutlineshoppingcart.svg" },
    // { component: <StatusChangeForm />, title: "Status Change Form", icon: "/iconoutlineshoppingcart.svg" },
    // { component: <IrbSubmission />, title: "IRB Submission", icon: "/iconoutlineshoppingcart.svg" },
    // { component: <IrbSubmissionSup />, title: "IRB Submission Sup", icon: "/iconoutlineshoppingcart.svg" },
    // { component: <ListOfExaminer />, title: "List of Examiner", icon: "/iconoutlineshoppingcart.svg" },
    // { component: <ThesisSubForm />, title: "Thesis Submission", icon: "/iconoutlineshoppingcart.svg" },
    // {  title: "Thesis Extension", icon: "/iconoutlineshoppingcart.svg" },
    {  title: "Profile", icon: "/iconoutlineshoppingcart.svg" },
    {  title: "Dashboard", icon: "/iconoutlineshoppingcart.svg" },
    {  title: "Publications", icon: "/iconoutlineshoppingcart.svg" },
    {  title: "Progress Monitoring", icon: "/iconoutlineshoppingcart.svg" },
    {  component:<Forms/>,title: "Forms", icon: "/iconoutlineshoppingcart.svg" }
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
