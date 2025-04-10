import React, { useEffect, useState } from "react";
import Layout from "../../components/dashboard/layout";
import { useLoading } from "../../context/LoadingContext";
import { useLocation } from "react-router-dom";
import FilterBar from "../../components/filterBar/FilterBar";
import PagenationTable from "../../components/pagenationTable/PagenationTable";
import CustomModal from "../../components/forms/modal/CustomModal";
import StudentForm from "../../components/studentForm/StudentForm";
import CustomButton from "../../components/forms/fields/CustomButton";
import AssignPanel from "../../components/assignDoctoral/AssignPanel";

const StudentsPage = () => {
  const [filter, setFilter] = useState([]);
  const { setLoading } = useLoading();
  const location = useLocation();
  const role = localStorage.getItem("userRole");
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isModalEditStudentOpen, setIsModalEditStudentOpen] = useState(false);
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

          {role == "admin" ? (
            <>
              <PagenationTable
                endpoint={location.pathname}
                filters={filter}
                enableApproval={false}
              
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
                        onClick: (studentData) => {
                          setStudentToEdit(studentData);
                          setIsModalEditStudentOpen(true)},
                    },

                ]}
              />
            </>
          ) : (
            <>
              <PagenationTable
                endpoint={location.pathname}
                filters={filter}
                enableApproval={false}
              />
            </>
          )}
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

          <CustomModal
            isOpen={isModalEditStudentOpen}
            onClose={() => {
              setIsModalEditStudentOpen(false);
            }}
            title={ "Add Student Panel"}
          >
            <AssignPanel roll_no={studentToEdit?.roll_no}/>
          </CustomModal>
        </>
      }
    />
  );
};

export default StudentsPage;
