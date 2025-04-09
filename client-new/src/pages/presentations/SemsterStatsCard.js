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


const SemesterStatsCard = () => {
  const [semesterStats, setSemesterStats] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
    const [body, setBody] = useState({});
     const [reportPeriods, setReportPeriods] = useState([]);

  const [editForm, setEditForm] = useState({
    semester_name: "",
    start_date: null,
    end_date: null,
    notification: false,
  });

  const [createForm, setCreateForm] = useState({
    semester_name: "",
    start_date: new Date(),
    end_date: new Date(),
    notification: false,
  });

  useEffect(() => {
    fetchSemesterStats();
    const periods = generateReportPeriods(2,1,true);
              const pp=[];
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
      const res = await customFetch(baseURL + "/semester/recent", "GET");
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
          await customFetch(baseURL + "/semester", "PUT", payload);
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
          await customFetch(baseURL + "/semester", "POST", payload);
          setOpenCreateModal(false);
          fetchSemesterStats();
        } catch (err) {
          console.error("POST error:", err);
        }
      };

  if (!semesterStats) return null;

  const {
    semester_name,
    start_date,
    end_date,
    leave,
    scheduled,
    unscheduled,
  } = semesterStats;

  return (
    <div>
      <div className="semester-card">
      <div className="semester-header">
        <h3>{semester_name} Semester Stats</h3>
        {(isInSemester || isBeforeSemester) && (
          <span className="semester-status-indicator">● Active</span>
        )}
      </div>
        <div className="semester-stats-line">
          <div className="stat-item"><strong>Semester:</strong> {semester_name}</div>
          <div className="stat-item"><strong>Start Date:</strong> {new Date(start_date).toLocaleDateString()}</div>
          <div className="stat-item"><strong>End Date:</strong> {new Date(end_date).toLocaleDateString()}</div>
          <div className="stat-item"><strong>Leave Scheduled:</strong> {leave === 1 ? "Yes" : "No"}</div>
          <div className="stat-item"><strong>Scheduled:</strong> {scheduled}</div>
          <div className="stat-item"><strong>Unscheduled:</strong> {unscheduled}</div>
        </div>
        </div>
        <div >
          {(isInSemester || isBeforeSemester) ? (
            // <button className="button" onClick={() => setOpenEditModal(true)}>Edit Deadline</button>
            <button className="button" onClick={() => setOpenCreateModal(true)}>Create New Evaluation Semester</button>
          ) : (
            <button className="button" onClick={() => setOpenCreateModal(true)}>Create New Evaluation Semester</button>
          )}
        </div>
      

      {/* Edit Modal */}
      <CustomModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title="Edit Semester Deadline"
      >
        <GridContainer
                elements={[
                  <DropdownField
                    label="Period of Report"
                    options={reportPeriods}
                    onChange={(value) =>
                      setBody((prev) => ({ ...prev, period_of_report: value }))
                    }
                  />,
                ]}
                space={2}
              />

        <label>Start Date:</label>
        <DatePicker
          selected={editForm.start_date}
          readOnly
          disabled
          className="field-readonly"
        />

        <label>End Date:</label>
        <DatePicker
          selected={editForm.end_date}
          onChange={(date) => setEditForm({ ...editForm, end_date: date })}
          className="field-editable"
        />

        <label>Notification:</label>
        <ToggleSwitch
          isOn={editForm.notification}
          onToggle={() => setEditForm((prev) => ({
            ...prev,
            notification: !prev.notification,
          }))}
        />

        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <CustomButton onClick={handleEditSubmit} text="Save Changes" />
        </div>
      </CustomModal>

      {/* Create Modal */}
      <CustomModal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        title="Create New Semester Presentation"
      >
         <GridContainer
                elements={[
                  <DropdownField
                    label="Period of Report"
                    options={reportPeriods}
                    onChange={(value) =>
                      setBody((prev) => ({ ...prev, period_of_report: value }))
                    }
                  />,
                ]}
                space={2}
              />


        <label>Start Date:</label>
        <DatePicker
          selected={createForm.start_date}
          onChange={(date) => setCreateForm({ ...createForm, start_date: date })}
          className="field-editable"
        />

        <label>End Date:</label>
        <DatePicker
          selected={createForm.end_date}
          onChange={(date) => setCreateForm({ ...createForm, end_date: date })}
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
    </div>
  );
};

export default SemesterStatsCard;
