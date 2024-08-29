import { React, useState, useEffect } from "react";
import "./SupervisorChange.css";

const StudentSideSupervisorChange = ({
  formData,
  handleChange,
  handleSelectedSupervisorChange,
}) => {
  const isEditable = !formData.student_lock;
  const [supervisors, setSupervisors] = useState([]);
  const [filteredSupervisors, setFilteredSupervisors] = useState([]);
  const [preferences, setPreferences] = useState(['', '', '']);
  const [activeInput, setActiveInput] = useState(null);

  useEffect(() => {
    // Replace this with actual API call
    setSupervisors([
      "Dr. John Doe",
      "Dr. Jane Smith",
      "Dr. Robert Johnson",
      "Dr. Emily Brown",
      "Dr. Michael Lee",
    ]);
  }, []);

  const handlePreferenceChange = (index, value) => {
    const newPreferences = [...preferences];
    newPreferences[index] = value;
    setPreferences(newPreferences);

    const filtered = supervisors.filter(supervisor =>
      supervisor.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSupervisors(filtered);
    setActiveInput(index);

    handleChange({
      target: {
        name: 'preference',
        value: newPreferences.join(', ')
      }
    });
  };

  const selectSupervisor = (index, supervisor) => {
    const newPreferences = [...preferences];
    newPreferences[index] = supervisor;
    setPreferences(newPreferences);
    setFilteredSupervisors([]);
    setActiveInput(null);

    handleChange({
      target: {
        name: 'preference',
        value: newPreferences.join(', ')
      }
    });
  };

  return (
    <div className="student-form">
      <div className="first">
        <div className="data-input">
          <label htmlFor="regnoInput">Roll Number</label>
          <input
            type="number"
            id="regnoInput"
            name="regno"
            value={formData.regno}
            readOnly
            required
          />
        </div>
        <div className="data-input">
          <label htmlFor="nameInput">Name</label>
          <input
            type="text"
            id="nameInput"
            name="name"
            value={formData.name}
            readOnly
            required
          />
        </div>
      </div>
<div className="first">
      <div className="date-input">
        <label htmlFor="dateOfAdmissionInput">Date of Admission</label>
        <input
          type="date"
          id="dateOfAdmissionInput"
          name="dateOfAdmission"
          value={formData.admissionDate}
          readOnly
          required
        />
      </div>
      </div>

      <div className="first">
        <div className="data-input">
          <label htmlFor="emailInput">Email</label>
          <input
            type="email"
            id="emailInput"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            readOnly
          />
        </div>
        <div className="data-input">
          <label htmlFor="mobileInput">Mobile No.</label>
          <input
            type="tel"
            id="mobileInput"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            readOnly
          />
        </div>
      </div>

      <div className="data-input" id="appr">
        <label>IRB Completed</label>
        <div>
          <input
            type="radio"
            id="irbYes"
            name="irbCompleted"
            value={true}
            checked={formData.irbCompleted === true}
            onChange={handleChange}
            required
            readOnly={!isEditable}
          />
          <label htmlFor="irbYes" className="small-label">
            Yes
          </label>
          <input
            type="radio"
            id="irbNo"
            name="irbCompleted"
            value={false}
            checked={formData.irbCompleted === false}
            onChange={handleChange}
            required
            readOnly={!isEditable}
          />
          <label htmlFor="irbNo" className="small-label">
            No
          </label>
        </div>
      </div>

      {formData.irbCompleted === true && (
        <div className="data-input">
          <label htmlFor="researchTitleInput">Title of PhD Thesis</label>
          <input
            type="text"
            id="researchTitleInput"
            name="researchTitle"
            value={formData.researchTitle}
            onChange={handleChange}
            required
            readOnly={!isEditable}
          />
        </div>
      )}

      {formData.irbCompleted === false && (
        <div className="data-input">
          <label htmlFor="researchTitleInput">
            Tentative Title of PhD Thesis
          </label>
          <input
            type="text"
            id="researchTitleInput"
            name="researchTitle"
            value={formData.researchTitle}
            onChange={handleChange}
            required
            readOnly={!isEditable}
          />
        </div>
      )}

      <div className="data-input">
        <label htmlFor="supervisorsInput">Supervisor(s) Allocated</label>
        <input
          type="text"
          id="supervisorsInput"
          name="supervisors"
          value={formData.supervisors.join(", ")}
          readOnly
          required
        />
      </div>
<div className="first">
      <div className="date-input">
        <label htmlFor="dateAllocatedInput">
          Date of Allocation of Supervisors
        </label>
        <input
          type="date"
          id="dateAllocatedInput"
          name="dateAllocated"
          value={formData.dateAllocated}
          readOnly
          required
        />
      </div>
      </div>

      <div className="data-input" id="appr">
        <label htmlFor="supervisorName">Supervisor(s) to be changed</label>
        <div>
          {formData.supervisors.map((supervisor, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`supervisor-${index}`}
                name="supervisor"
                value={supervisor}
                readOnly={!isEditable}
                onChange={handleSelectedSupervisorChange}
              />
              <label htmlFor={`supervisor-${index}`} className="small-label">
                {supervisor}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="data-input">
        <label htmlFor="reasonForChangeInput">Reason for Change</label>
        <input
          type="text"
          id="reasonForChangeInput"
          name="reasonForChange"
          value={formData.reasonForChange}
          onChange={handleChange}
          readOnly={!isEditable}
          required
        />
      </div>

      <div className="data-input preferences-container">
        <label htmlFor="preferenceInput">Preferences</label>
        <div className="preferences-input-container">
          {preferences.map((preference, index) => (
            <div key={index} className="preference-input-wrapper">
              <input
                type="text"
                className="preference-input"
                required
                readOnly={!isEditable}
                value={preference}
                onChange={(e) => handlePreferenceChange(index, e.target.value)}
                onFocus={() => setActiveInput(index)}
                placeholder={`Select Supervisor ${index + 1}`}
              />
              {activeInput === index && filteredSupervisors.length > 0 && (
                <ul className="filtered-supervisors">
                  {filteredSupervisors.map((supervisor, idx) => (
                    <li 
                      key={idx}
                      onClick={() => selectSupervisor(index, supervisor)}
                    >
                      {supervisor}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="supervisor-button-div">
        <button className="send" type="submit">
          SEND TO HoD and PhD Coordinator
        </button>
      </div>
    </div>
  );
};

export default StudentSideSupervisorChange;