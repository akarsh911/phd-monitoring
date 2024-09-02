import React, { useState,useEffect } from 'react';
import './Dashboard.css'; 
import Navbar from './Navbar';

import StudentList from '../teachers_view/StudentList.js';
import Forms from "./Forms";
import FormCard from './FormCard';
import ProgressMonitoring from '../forms/ProgressMonitoring/ProgressMonitoring.js';
import FormsView from './Forms';



const SideLeftMenu = ({ type }) => {
 
  const [activeForm, setActiveForm] = useState(null);

  const handleCardClick = (formComponent) => {
    setActiveForm(formComponent);
  };

  const formCards = [
    {  title: "Profile", icon: <i class="fa-solid fa-user"></i> },
    {  title: "Dashboard", icon: <i class="fa-solid fa-chart-simple"></i> },
    {  title: "Publications", icon: <i class="fa-sharp fa-solid fa-newspaper"></i> },
    {  component:<ProgressMonitoring/> ,title: "Progress Monitoring", icon: <i class="fa-solid fa-bars-progress"></i>},
    {  component:<Forms/>,title: "Forms", icon: <i class="fa-solid fa-file-lines"></i> }
  ];


  return (  <div>
    
    <Navbar activeButton={activeForm}/>
    
    <div className="side-left-menu">
      
       <div className="tietlogo">
       <img src="/tiet-logoremovebgpreview-1@2x.png" alt="My Image" />
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
    </div >
    {/* Render body component here */}
    {/* <StudentList/> */}
    {type === 'students' && <StudentList />}
    {type === 'form' && < FormsView/>}
    
  
    </div>
  );
};

export default SideLeftMenu;

