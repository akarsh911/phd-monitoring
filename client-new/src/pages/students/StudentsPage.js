import React, { useEffect, useState } from "react";
import Layout from "../../components/dashboard/layout";
import { useLoading } from "../../context/LoadingContext";
import { useLocation, useNavigate } from "react-router-dom";
import FilterBar from "../../components/filterBar/FilterBar";
import PagenationTable from "../../components/pagenationTable/PagenationTable";
import CustomModal from "../../components/forms/modal/CustomModal";
import StudentForm from "../../components/studentForm/StudentForm";
import CustomButton from "../../components/forms/fields/CustomButton";
import AssignPanel from "../../components/assignDoctoral/AssignPanel";
import SupervisorDoctoralManager from "../../components/supervisorDoctoralManager/SupervisorDoctoralManager";

const StudentsPage = () => {
  const [filter, setFilter] = useState([]);
  const { setLoading } = useLoading();
  const location = useLocation();
  const navigate = useNavigate();
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

          {role === "admin" ? (
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
                    icon: <i className="fa-solid fa-pen-to-square"></i>,
                    tooltip: "Edit",
                    onClick: (studentData) => {
                      setStudentToEdit(studentData);
                      setIsModalEditStudentOpen(true);
                    },
                  },
                  {
                    icon: <i className="fa-solid fa-file-lines"></i>,
                    tooltip: "Manage Forms",
                    onClick: (studentData) => {
                      navigate(`/forms/manage?roll_no=${studentData.roll_no}`);
                    },
                  },
                ]}
              />
            </>
          ) : role === "phd_coordinator" ||
            role === "hod" ||
            role === "dordc" ? (
            <>
              <PagenationTable
                endpoint={location.pathname}
                filters={filter}
                enableApproval={false}
                actions={[
                  {
                    icon: <i className="fa-solid fa-pen-to-square"></i>,
                    tooltip: "Edit",
                    onClick: (studentData) => {
                      setStudentToEdit(studentData);
                      setIsModalEditStudentOpen(true);
                    },
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
            title={"Add Student Panel"}
          >
              {/* {role=== "admin" && <AssignPanel roll_no={studentToEdit?.roll_no}/>} */}
            {(role === "hod" ||
              role === "phd_coordinator" ||
              role === "dordc" ||
              role === "admin") && (
              <SupervisorDoctoralManager
                studentId={studentToEdit?.roll_no}
                supervisors={studentToEdit?.supervisors}
                doctoralCommittee={studentToEdit?.doctoral}
                onClose={() => {
                  setIsModalEditStudentOpen(false);
                }}
              />
            )}
          </CustomModal>
        </>
      }
    />
  );
};

export default StudentsPage;
