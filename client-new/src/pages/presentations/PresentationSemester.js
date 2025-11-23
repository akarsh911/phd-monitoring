import React, { useEffect, useState } from "react";
import Layout from "../../components/dashboard/layout";
import FormList from "../../components/forms/formList/FormList";
import { Tabs, Tab } from "@mui/material";
import CustomModal from "../../components/forms/modal/CustomModal";
import CustomButton from "../../components/forms/fields/CustomButton";
import GridContainer from "../../components/forms/fields/GridContainer";
import BulkSchedulePresentation from "../../components/forms/presentations/BulkSchedulePresentation";
import SchedulePresentation from "../../components/forms/presentations/SchedulePresentation";
import FormTable from "../../components/forms/formTable/FormTable";
import FilterBar from "../../components/filterBar/FilterBar";
import PagenationTable from "../../components/pagenationTable/PagenationTable";
import SemesterStatsCard from "./SemsterStatsCard";
import { set } from "react-hook-form";

const PresentationSemester = () => {
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  
  const [location, setLocation] = useState(window.location.pathname);
  

  useEffect(() => {
    setRole(localStorage.getItem("userRole"));
  }, []);


 
  return (
    <Layout
      children={
        <>
         <SemesterStatsCard />
         <PagenationTable
            endpoint={location}
            enableApproval={false}
            enableSelect={false}
            tableTitle="Past Semesters"
            customOpenForm={(semester) => {
                window.location.href=location+`/semester/${semester.semester_name}`;
            }}
          />
        </>
      }
    />
    
  );
};

export default PresentationSemester;
