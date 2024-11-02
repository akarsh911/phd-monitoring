import React, { useEffect, useState } from "react";
import Layout from "../../components/dashboard/layout";
import FormList from "../../components/forms/formList/FormList";
import SchedulePresentation from "../../components/forms/presentations/SchedulePresentation";
import CustomModal from "../../components/forms/modal/CustomModal";
import CustomButton from "../../components/forms/fields/CustomButton";
import GridContainer from "../../components/forms/fields/GridContainer";

const PresentationListPage = () => {
  const [role, setRole] = useState("");
  useEffect(() => {
    setRole(localStorage.getItem("userRole"));
  }, []);

  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
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
                    <>
                      <div className="form-list-bar">
                        <CustomButton
                          onClick={openModal}
                          text="Schedule Presentation +"
                        />
                        <CustomModal
                          isOpen={open}
                          onClose={closeModal}
                          title={"Add Publication"}
                          minHeight="200px"
                          maxHeight="600px"
                          minWidth="650px"
                          maxWidth="700px"
                          closeOnOutsideClick={false}
                        >
                          <SchedulePresentation />
                        </CustomModal>
                      </div>
                    </>
                  )}
                </>,
              ]}
            />
            <FormList showButton={false} />
          </>
        }
      />
    </>
  );
};

export default PresentationListPage;
