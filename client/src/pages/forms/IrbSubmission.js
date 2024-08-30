import React, { useState, useEffect } from "react";
import "./IrbSubmission.css";
import StatusModal from "./Modal/Modal";
import IrbSup from "./IrbSubmissionSup";
import { SERVER_URL } from "../../config";
import { useParams } from "react-router-dom";

const Irb = () => {
  const [formData, setFormData] = useState({
    name: "",
    regno: "",
    admissionDate: "",
    department: "",
    cgpa: "",
    title: "",
    address: "",
    formtype:null,
    telephoneNumber: "",
    number: "",
    objectives: [""],
    revisedTitle: "",
    revisedObjectives: "",
    revisedPdf: null,
    irbMeetingDate: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/forms/irb/submission/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            student_id: params.id,
          }),
        });
        const data = await response.json();
        console.log(data);
        setFormData({
          name: data.name,
          regno: data.roll_no,
          formtype: data.formtype,
          department:data.department,
          cgpa: data.cgpa,
          title: data.phd_title,
          address: data.address,
          telephoneNumber: data.telephoneNumber,
          number: data.number,
          objectives: data.objectives,
          revisedTitle: data.revisedTitle,
          revisedObjectives: data.revisedObjectives,
          revisedPdf: null,
        });
        console.log("formData");
        console.log(formData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [showRevisedFields, setShowRevisedFields] = useState(formData.formtype === "revised");

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

  const handleSubmitStudent = (e) => async (e) => {
    e.preventDefault();
    const response = await fetch(`${SERVER_URL}/forms/irb/submission/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: formData.title,
        objectives: formData.objectives,
        address: formData.address,
      }),
    });
    console.log(response);
    const data = await response.json();

  };
  const handleRevisedSubmitStudent = (e) => async (e) => {
    e.preventDefault();
    const response = await fetch(`${SERVER_URL}/forms/irb/submission/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        revised_phd_title: formData.revisedTitle,
        objectives: formData.objectives,
      }),
    });
    console.log(response);
    const data = await response.json();

  };
  const handleSubmit = (e) => {
    e.preventDefault();

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

  const params = useParams();

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
              {formData.objectives.map((objective, index) => {
                if(objective.type==='draft') {
                  return (
                    <li key={index}>
                      <input
                        type="text"
                        id={`objective${index + 1}Input`}
                        name={`objective${index + 1}`}
                        value={objective.objective}
                        onChange={(e) =>
                          handleObjectiveChange(index, e.target.value)
                        }
                        required
                      />
                    </li>
                  );
                }
                return null;
              })}
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
            
            <button className="send" type="submit" onSubmit={handleSubmitStudent}>
              SEND TO SUPERVISOR
            </button>
          </div>

          
          {formData.formtype === "revised" && (
            <div><button
            className="send"
            type="submit"
            onClick={handleRevisedClick}
          >
            REVISED IRB
          </button>
          <br />
          <br />
          </div>
          
          )}
          

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
                  {formData.objectives.map((objective, index) => {
                    if(objective.type==='revised') {
                      return (
                        <li key={index}>
                          <input
                            type="text"
                            id={`objective${index + 1}Input`}
                            name={`objective${index + 1}`}
                            value={objective.objective}
                            onChange={(e) =>
                              handleObjectiveChange(index, e.target.value)
                            }
                            required
                          />
                        </li>
                      );
                    }
                    return null;
                  })}
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
                
                <button className="send" type="submit" onSubmit={handleRevisedSubmitStudent}>
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
