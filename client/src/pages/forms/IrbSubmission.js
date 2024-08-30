import React, { useState } from "react";
import "./IrbSubmission.css";
import StatusModal from "./Modal/Modal";
import IrbSup from "./IrbSubmissionSup";

const Irb = () => {
  const [formData, setFormData] = useState({
    name: "",
    regno: "",
    admissionDate: "",
    department: "",
    cgpa: "",
    title: "",
    address: "",
    telephoneNumber: "",
    number: "",
    objectives: [""],
    revisedTitle: "",
    revisedObjectives: "",
    revisedPdf: null,
  });

  const [showRevisedFields, setShowRevisedFields] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue =
      type === "checkbox" ? checked : type === "file" ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleObjectiveChange = (index, value) => {
    const newObjectives = formData.objectives.map((obj, i) =>
      i === index ? value : obj
    );
    setFormData({ ...formData, objectives: newObjectives });
  };

  const addObjective = () => {
    setFormData({ ...formData, objectives: [...formData.objectives, ""] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  const handleRevisedClick = () => {
    setShowRevisedFields(!showRevisedFields);
  };


  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='extensionBody-div'>
      <div className='extensionform-div'>
        <div className="heading">
          <h1>IRB Submission Form</h1>
          <div className='top-button'>
          <button onClick={openModal}>View Status</button>
          {isModalOpen && <StatusModal closeModal={closeModal} />}
        </div>
        </div>
        <form onSubmit={handleSubmit} className="irbSubform">
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
            <div className="data-input">
              <label htmlFor="departmentInput">Department</label>
              <input
                type="text"
                id="departmentInput"
                name="department"
                value={formData.department}
                readOnly
                required
              />
            </div>
            <div className="date-input">
            <label htmlFor="dateInput">Date of Admission</label>
            <input
              type="date"
              id="dateInput"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleChange}
              required
            />
          </div>
           
          </div>
         <div className="first">
         <div className="data-input">
              <label htmlFor="cgpaInput">CGPA</label>
              <input
                type="number"
                step="0.01"
                id="cgpaInput"
                name="cgpa"
                value={formData.cgpa}
                onChange={handleChange}
                required
              />
            </div>
         </div>
          <div className="data-input">
            <label htmlFor="titleInput">Title of PHD Thesis</label>
            <input
              type="text"
              id="titleInput"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="data-input">
            <label htmlFor="objectivesInput">Objectives</label>
            <ol className="objectives-list">
              {formData.objectives.map((objective, index) => (
                <li key={index}>
                  <input
                    type="text"
                    id={`objective${index + 1}Input`}
                    name={`objective${index + 1}`}
                    value={objective}
                    onChange={(e) =>
                      handleObjectiveChange(index, e.target.value)
                    }
                    required
                  />
                </li>
              ))}
            </ol>
            <button type="button" onClick={addObjective}>
              Add another Objective
            </button>
          </div>
          <div className="data-input">
            <label htmlFor="addressInput">Address for correspondence</label>
            <input
              type="text"
              id="addressInput"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="data-input">
          <button  type="submit">
              UPLOAD IRB PDF
            </button>
          </div>
          <div className="supervisor-button-div">
            
            <button className="send" type="submit">
              SEND TO SUPERVISOR
            </button>
          </div>

          <button
            className="send"
            type="submit"
            onClick={handleRevisedClick}
          >
            REVISED IRB
          </button>
          <br />
          <br />

          {showRevisedFields && (
            <div className="revised-irb-fields">
              <div className="data-input">
                <label htmlFor="revisedTitleInput">
                  Revised Title of PHD Thesis
                </label>
                <input
                  type="text"
                  id="revisedTitleInput"
                  name="revisedTitle"
                  value={formData.revisedTitle}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="data-input">
                <label htmlFor="objectivesInput"> Revised Objectives</label>
                <ol className="objectives-list">
                  {formData.objectives.map((objective, index) => (
                    <li key={index}>
                      <input
                        type="text"
                        id={`objective${index + 1}Input`}
                        name={`objective${index + 1}`}
                        value={objective}
                        onChange={(e) =>
                          handleObjectiveChange(index, e.target.value)
                        }
                        required
                      />
                    </li>
                  ))}
                </ol>
                <button type="button" onClick={addObjective}>
                  Add another Objective
                </button>
              </div>
              <div className="first">
              <div className="date-input">
                <label htmlFor="irbMeetingDateInput">Date of IRB meeting</label>
                <input
                  type="date"
                  id="irbMeetingDateInput"
                  name="irbMeetingDate"
                  value={formData.irbMeetingDate}
                  readOnly
                  required
                />
              </div>
              </div>
              <div className="data-input">
              <button className="upload-button" type="submit">
                  UPLOAD REVISED IRB PDF
                </button>
              </div>
              <div className="supervisor-button-div">
                
                <button className="send" type="submit">
                  SEND TO SUPERVISOR
                </button>
              </div>
            </div>
          )}
        </form>
        <IrbSup/>
      </div>
        
    </div>
  
  );
};

export default Irb;
