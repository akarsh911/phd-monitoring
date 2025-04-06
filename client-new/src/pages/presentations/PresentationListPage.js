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

const PresentationListPage = () => {
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0); 
  const [filters, setFilters] = useState(null);

  const handleSearch = (query) => {
    setFilters(query);
  };

  useEffect(() => {
    setRole(localStorage.getItem("userRole"));
  }, []);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setTabIndex(0); 
  };

  return (
    <Layout
      children={
        <>
          <h1>Presentation List</h1>
          <GridContainer
            elements={[
              <></>,
              <></>,
              <>
                {role === "faculty" && (
                  <div className="form-list-bar">
                    <CustomButton
                      onClick={openModal}
                      text="Schedule Presentation +"
                    />

                    <CustomModal
                      isOpen={open}
                      onClose={closeModal}
                      title={"Schedule Presentation"}
                      minHeight="200px"
                      maxHeight="600px"
                      minWidth="650px"
                      maxWidth="700px"
                      closeOnOutsideClick={false}
                    >
                      <>
                        <Tabs
                          value={tabIndex}
                          onChange={(e, index) => setTabIndex(index)}
                          style={{ marginBottom: "12px" }}
                        >
                          <Tab label="Individual Schedule" />
                          <Tab label="Bulk Schedule" />
                        </Tabs>

                        {tabIndex === 0 && <SchedulePresentation />}
                        {tabIndex === 1 && <BulkSchedulePresentation />}
                      </>
                    </CustomModal>
                  </div>
                )}
              </>,
            ]}
          />
          <FilterBar onSearch={handleSearch}/>
          <FormTable filters={filters}/>
        </>
      }
    />
  );
};

export default PresentationListPage;
