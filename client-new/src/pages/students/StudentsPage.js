import React, { useEffect, useState } from "react";
import Layout from "../../components/dashboard/layout";
import { useLoading } from "../../context/LoadingContext";
import { useLocation } from "react-router-dom";
import FilterBar from "../../components/filterBar/FilterBar";
import PagenationTable from "../../components/pagenationTable/PagenationTable";
import CustomModal from "../../components/forms/modal/CustomModal";
import StudentForm from "../../components/studentForm/StudentForm";
import CustomButton from "../../components/forms/fields/CustomButton";

const StudentsPage = () => {
  const [filter, setFilter] = useState([]);
  const { setLoading } = useLoading();
  const location = useLocation();

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  const handleOpenForm = (studentData = null) => {
    console.log(studentData);
    if (studentData) {
      setEditMode(true);
      setStudentToEdit(studentData);
    } else {
      setEditMode(false);
      setStudentToEdit(null);
    }
    setIsModalOpen(true);
  };

  return (
    <Layout
      children={
        <>
          <FilterBar onSearch={handleFilterChange} />
          <PagenationTable
            endpoint={location.pathname}
            filters={filter}
            enableApproval={false}
            customOpenForm={handleOpenForm}
            extraTopbarComponents={
              <CustomButton
                text="Add Student +"
                onClick={() => handleOpenForm()}
              />
            }
            actions={[
                {
                    icon: <i class="fa-solid fa-pen-to-square"></i>,
                    tooltip: "Edit",
                    onClick: (studentData) => handleOpenForm(studentData),
                },
           
            ]}
          />

          <CustomModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditMode(false);
              setStudentToEdit(null);
            }}
            setIsOpen={setIsModalOpen}
            title={editMode ? "Edit Student" : "Add Student"}
            width="80vw"
          >
            <StudentForm edit={editMode} studentData={studentToEdit} />
          </CustomModal>
        </>
      }
    />
  );
};

export default StudentsPage;
