import React, { useEffect, useState } from "react";
import { customFetch } from "../../api/base";
import { baseURL } from "../../api/urls";
import "./SemesterStatsCard.css";
import CustomButton from "../../components/forms/fields/CustomButton";
import CustomModal from "../../components/forms/modal/CustomModal";
import ToggleSwitch from "../../components/forms/fields/ToggleSwitch";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropdownField from "../../components/forms/fields/DropdownField";
import GridContainer from "../../components/forms/fields/GridContainer";
import { generateReportPeriods } from "../../utils/semester";
import InputField from "../../components/forms/fields/InputField";
import { toast } from "react-toastify";
import { Tabs, Tab } from "@mui/material";
import BulkSchedulePresentation from "../../components/forms/presentations/BulkSchedulePresentation";
import SchedulePresentation from "../../components/forms/presentations/SchedulePresentation";
// import FilterBar from "../../components/filterBar/FilterBar";
import { set } from "react-hook-form";

const SemesterStatsCard = ({ semesterName = null,setFilters}) => {
  const [semesterStats, setSemesterStats] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [body, setBody] = useState({});
  const [filtersEnabled, setFiltersEnabled] = useState(false);

  const [reportPeriods, setReportPeriods] = useState([]);
  const [editForm, setEditForm] = useState({
    semester_name: "",
    start_date: null,
    end_date: null,
    notification: false,
  });
  useEffect(() => {
    setFilters(filtersEnabled);
  },[filtersEnabled]);
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const role = localStorage.getItem("userRole") || "student";
  const [createForm, setCreateForm] = useState({
    semester_name: "",
    start_date: new Date(),
    end_date: new Date(),
    notification: false,
  });

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchSemesterStats();
    const periods = generateReportPeriods(2, 1, true);
    const pp = [];
    periods.forEach((period) => {
      const period1 = {};
      period1.value = period;
      period1.title = period;
      pp.push(period1);
    });
    setReportPeriods(pp);
  }, []);

  const fetchSemesterStats = async () => {
    try {
      let url = baseURL + "/semester/recent";
      if (semesterName) {
        url = baseURL + "/semester/" + semesterName;
      }
      const res = await customFetch(url, "GET", {}, false);
      const data = res.response?.data || res.data;
      setSemesterStats(data);
      setEditForm({
        semester_name: data.semester_name,
        start_date: new Date(data.start_date),
        end_date: new Date(data.end_date),
        notification: data.notification,
      });
    } catch (error) {
      console.error("Error fetching semester stats:", error);
    }
  };

  const currentDate = new Date();
  const isInSemester =
    semesterStats &&
    currentDate >= new Date(semesterStats.start_date) &&
    currentDate <= new Date(semesterStats.end_date);

  const isBeforeSemester =
    semesterStats && currentDate < new Date(semesterStats.start_date);

  const handleEditSubmit = async () => {
    try {
      const payload = {
        semester_name: editForm.semester_name,
        start_date: editForm.start_date,
        end_date: editForm.end_date,
        notification: editForm.notification,
      };
      let hello = await customFetch(
        baseURL + "/semester",
        "POST",
        payload,
        true
      );
      if (hello.status === 200) {
        toast.success("Semester updated successfully!");
      }
      setOpenEditModal(false);
      fetchSemesterStats();
    } catch (err) {
      console.error("PUT error:", err);
    }
  };

  const handleCreateSubmit = async () => {
    try {
      const payload = {
        semester_name: createForm.semester_name,
        start_date: createForm.start_date,
        end_date: createForm.end_date,
        notification: createForm.notification,
      };
      await customFetch(baseURL + "/semester", "POST", payload, true);
      setOpenCreateModal(false);
      fetchSemesterStats();
    } catch (err) {
      console.error("POST error:", err);
    }
  };

  if (!semesterStats) return null;

  const { semester_name, start_date, end_date, leave, scheduled, unscheduled } =
    semesterStats;

  return (
    <div>
      <div className="semester-card">
        <div className="semester-header">
          <h3>{semester_name} Semester Stats</h3>
          {isInSemester && (
            <span className="semester-status-indicator">● Active</span>
          )}
          {isBeforeSemester && (
            <span className="semester-status-indicator">● Upcoming</span>
          )}
          {new Date(end_date) < currentDate && (
            <span className="semester-status-indicator">● Completed</span>
          )}
        </div>
        <div className="semester-stats-line">
          <div className="stat-item">
            <strong>Start Date:</strong>{" "}
            {new Date(start_date).toLocaleDateString()}
          </div>
          <div className="stat-item">
            <strong>End Date:</strong> {new Date(end_date).toLocaleDateString()}
          </div>
          {(role === "admin" ||
            role === "hod" ||
            role === "dordc" ||
            role === "phd_coordinator") && (
            <>
              <div className="stat-item">
                <strong>Leaves Scheduled:</strong> {leave}
              </div>
              <div className="stat-item">
                <strong>Scheduled:</strong> {scheduled}
              </div>
              <div className="stat-item">
                <strong>Unscheduled:</strong> {unscheduled}
              </div>
            </>
          )}
          {(role === "admin" || role === "dordc") && (
            <div>
              {isInSemester || isBeforeSemester ? (
                // <button className="button" onClick={() => setOpenEditModal(true)}>Edit Deadline</button>
                <button
                  className="button"
                  onClick={() => setOpenEditModal(true)}
                >
                  Edit Evaluation Semester
                </button>
              ) : (
                <button
                  className="button"
                  onClick={() => setOpenCreateModal(true)}
                >
                  Create New Evaluation Semester
                </button>
              )}
            </div>
          )}

{(isInSemester || isBeforeSemester) && (role === "faculty" || role === "phd_coordinator") && (
  <div className="form-list-bar">

<div style={{ display: "flex", gap: "12px", flexWrap: "wrap", width: "100%" }}>
  <div style={{ flex: 1, minWidth: "250px" }}>
    <CustomButton
      onClick={() => setFiltersEnabled(prev => !prev)}
      text={filtersEnabled ? "Disable Advanced Filters" : "Enable Advanced Filters"}
      fullWidth
    />
  </div>

  <div style={{ flex: 1, minWidth: "250px" }}>
    <CustomButton
      onClick={openModal}
      text="Schedule Presentation +"
      fullWidth
    />
  </div>
</div>



    
    

    <CustomModal
      isOpen={open}
      onClose={closeModal}
      title={"Schedule Presentation"}
      minHeight="300px"
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

        {tabIndex === 0 && (
          <SchedulePresentation semester={semester_name} />
        )}
        {tabIndex === 1 && (
          <BulkSchedulePresentation semester_name={semester_name} />
        )}
      </>
    </CustomModal>
  </div>
)}        </div>
      </div>

      {(role === "admin" || role == "dordc") && (
        <CustomModal
          isOpen={openEditModal}
          onClose={() => {setOpenEditModal(false); 
            window.location.reload();}}
          title="Edit Semester Deadline"
          minWidth="300px"
          minHeight="300px"
        >
          <GridContainer
            elements={[
              <InputField
                label="Period of Report"
                isLocked={true}
                initialValue={editForm.semester_name}
              />,
            ]}
            space={2}
          />

          <label>Evaluation Start Date:</label>
          <DatePicker
            selected={editForm.start_date}
            readOnly
            disabled
            className="field-readonly"
          />

          <label>Evaluation End Date:</label>
          <DatePicker
            selected={editForm.end_date}
            onChange={(date) => setEditForm({ ...editForm, end_date: date })}
            className="field-editable"
          />

          <label>Notification:</label>
          <ToggleSwitch
            isOn={editForm.notification}
            onToggle={() =>
              setEditForm((prev) => ({
                ...prev,
                notification: !prev.notification,
              }))
            }
          />

          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <CustomButton onClick={handleEditSubmit} text="Save Changes" />
          </div>
        </CustomModal>
      )}

      {(role === "admin" || role == "dordc") && (
        <CustomModal
          isOpen={openCreateModal}
          onClose={() => {setOpenCreateModal(false);window.Location.reload();}}
          title="Create New Semester Presentation"
                minWidth="300px"
          minHeight="300px"
        >
          <GridContainer
            elements={[
              <DropdownField
                label="Period of Report"
                options={reportPeriods}
                onChange={(value) =>
                  setCreateForm((prev) => ({ ...prev, semester_name: value }))
                }
              />,
            ]}
            space={2}
          />

          <label>Evaluation Start Date:</label>
          <DatePicker
            selected={createForm.start_date}
            onChange={(date) =>
              setCreateForm({ ...createForm, start_date: date })
            }
            className="field-editable"
          />

          <label>Evaluation End Date:</label>
          <DatePicker
            selected={createForm.end_date}
            onChange={(date) =>
              setCreateForm({ ...createForm, end_date: date })
            }
            className="field-editable"
          />

          <label>Notification:</label>
          <ToggleSwitch
            isOn={createForm.notification}
            onToggle={() =>
              setCreateForm((prev) => ({
                ...prev,
                notification: !prev.notification,
              }))
            }
          />

          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <CustomButton onClick={handleCreateSubmit} text="Create" />
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default SemesterStatsCard;
