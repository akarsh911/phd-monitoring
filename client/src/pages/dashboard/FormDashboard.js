import React, { useState,useEffect } from 'react';
import './Dashboard.css'; 
import Navbar from './Navbar';
import ConstituteOfIrb from '../forms/ConstituteOfIrb/ConstituteOfIrb.js';
import IrbSubmission from '../forms/IrbSubmission';
import IrbSubmissionSup from '../forms/IrbSubmissionSup';
import StudentList from '../teachers_view/StudentList.js';
import ResearchProposalExtensionForm from '../forms/FormForExtension/Extension.js';
import ProgressMonitoring from '../forms/ProgressMonitoring/ProgressMonitoring.js';
import SupSideIrb from '../forms/ConstituteOfIrb/SupSideIrb.js';
import ThesisSubForm from '../forms/ThesisSubmission/ThesisSub.js';
import StatusChange from '../forms/ChangeOfStatus/StatusChange.js';
import SupervisorChange from '../forms/SupervisorChange/SupervisorChange.js';
import SupAllocation from '../forms/SupAllocation/SupAllocation.js';


const SideLeftMenu = () => {
 
  const [activeButton, setActiveButton] = useState(null);
  const [init]=useState(0);

  useEffect(() => {setActiveButton(0);}, [init]);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  
  const menuItems = [
    { text: 'Dashboard', icon: '/graph-1.svg' },
    { text: 'Supervisors', icon: '/group.svg' },
    { text: 'Doctoral Comittee', icon: '/iconoutlineshoppingcart.svg' },
    { text: 'Presentation', icon: '/mdishoppingoutline.svg' },
    { text: 'Publications', icon: '/interface--chart-line.svg' },
    { text: 'Patents', icon: '/mdimessageprocessingoutline.svg' },
    { text: 'Thesis', icon: '/mdicogoutline.svg' },
    { text: 'Documents', icon: '/iconoutlineshoppingcart.svg' },
    { text: 'Profile', icon: '/iconoutlineshoppingcart.svg' },
    { text: 'Sign Out', icon: '/iconoutlineshoppingcart.svg' },
    { text: 'Forms', icon: '/iconoutlineshoppingcart.svg' }
  ];

  return (  <div>
    
    <Navbar activeButton={activeButton}/>
    
    <div className="side-left-menu">
      
      <div className="tietlogo">
      <img src="tiet-logoremovebgpreview-1@2x.png" alt="My Image" />
      </div>
      <div className="icons">
        {menuItems.map((menuItem, index) => (
          <button
            key={index}
            className={`menu-button ${activeButton === index ? 'active' : ''}`}
            onClick={() => handleButtonClick(index)}
          >
            <img className="icon" alt="" src={menuItem.icon} />
            <div className="text">{menuItem.text}</div>
          </button>
        ))}
      </div>
    </div >
    {/* Render body component here */}
    {/* <StudentList/> */}
    {/* <ResearchProposalExtensionForm/> */}
    {/* <ConstituteOfIrb/> */}
  {/* <ThesisSubForm/> */}
  <StatusChange/>
    {/* <IrbSubmission/> */}
    {/* <IrbSubmissionSup/> */}
    {/* <SupervisorChange/> */}
    <ProgressMonitoring/>
    {/* <SupAllocation/> */}
    
    </div>
  );
};

export default SideLeftMenu;

