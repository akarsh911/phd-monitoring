import React, { useEffect, useState } from "react";
import Layout from "../../components/dashboard/layout";
import FormList from "../../components/forms/formList/FormList";
import CustomModal from "../../components/forms/modal/CustomModal";
import CustomButton from "../../components/forms/fields/CustomButton";
import GridContainer from "../../components/forms/fields/GridContainer";
import { Tabs, Tab } from "@mui/material";
import BulkSchedulePresentation from "../../components/forms/presentations/BulkSchedulePresentation";
import SchedulePresentation from "../../components/forms/presentations/SchedulePresentation";
import FormTable from "../../components/forms/formTable/FormTable";
import FilterBar from "../../components/filterBar/FilterBar";
import PagenationTable from "../../components/pagenationTable/PagenationTable";
import SemesterStatsCard from "./SemsterStatsCard";
import { set } from "react-hook-form";
import { useParams } from "react-router-dom";

const PresentationListPage = () => {
 

  const [filters, setFilters] = useState({
    mandatory_filter: [
      {
        key: "upcoming",
        value: 1,
      },
    ]});
  const [extraFilter, setExtraFilter] = useState(false);
  const [location, setLocation] = useState(window.location.pathname);
   const [num, setNum] = useState(0);
   const [presentationTab, setPresentationTab] = useState(0);

  const handleSearch = (query) => {
    setFilters(query);
  };
 
  const [enableApproval, setEnableApproval] = useState(false);


  useEffect(() => {
    setNum(num + 1);
    setLocation(window.location.pathname);
      if(presentationTab === 0) {
        setFilters({
          mandatory_filter: [
            {
              key: "upcoming",
              value: 1,
            },
          ]})
     
      }
      else if(presentationTab === 1) {
        //new
          setEnableApproval(false);
          setLocation(window.location.pathname+"/not-scheduled");
                                                     
      }
      else if(presentationTab === 2) {
       //new route
       setFilters({
        mandatory_filter: [
          {
            key: "leave",
            op:"=",
            value: 1,
          },
        ]});
       setEnableApproval(false);

      }
      else if(presentationTab === 3) {
        //new route
        setEnableApproval(false);

      }
      else if(presentationTab === 4) {
        setFilters({
          mandatory_filter: [
            {
              key: "missed",
              value: 1,
            },
          ]})
          setEnableApproval(false);

      }
      else if(presentationTab === 5) {
        setFilters({
          mandatory_filter: [
            {
              key: "action",
              value: 1,
            },
          ]})
          setEnableApproval(true);
      }
      else if(presentationTab === 6) {
        setFilters({})
        setEnableApproval(false);
        setExtraFilter(true);
      }

  },[presentationTab]);

  return (
    <Layout
      children={
        <>
          <h1>Presentation List</h1>

          <SemesterStatsCard />

       

      

          <Tabs
            value={presentationTab}
            onChange={(e, newVal) => setPresentationTab(newVal)}
            sx={{ marginBottom: "16px" }}
          >
            <Tab label="Upcoming Presentations" />
            <Tab label="Not Scheduled" />
            <Tab label="On Leave" />
            <Tab label="Semester Off" />
            <Tab label="Not Submitted" />
            <Tab label="Action Required" />
            <Tab label="All Presentaion" />
          </Tabs>
          {extraFilter && (<FilterBar onSearch={handleSearch}/>)}
          <PagenationTable
            num={num}
            endpoint={location}
            filters={filters}
            enableApproval={enableApproval}
            enableSelect={enableApproval}
          />
        </>
      }
    />
  );
};

export default PresentationListPage;
