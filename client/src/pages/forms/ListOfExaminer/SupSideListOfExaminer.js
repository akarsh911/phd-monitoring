import React, { useState } from "react";
import "./ListOfExaminer.css";
import "../FormForExtension/SupervisorSideExtension.css";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Make sure to bind modal to your appElement

const SupSideListOfExaminer = ({ formData, handleChange }) => {
  const [supervisors, setSupervisors] = useState([
    { serialno: "1", name: "", recommended: null, remarks: "" },
    { serialno: "2", name: "", recommended: null, remarks: "" },
    { serialno: "3", name: "", recommended: null, remarks: "" },
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editNationality, setEditNationality] = useState("");
  const [nationalExaminers, setNationalExaminers] = useState([]);
  const [internationalExaminers, setInternationalExaminers] = useState([]);
  const [FormData, setFormData] = useState({
    nationality: "Indian",
    examinerName: "",
    designation: "",
    department: "",
    university: "",
    city: "",
    pincode: "",
    country: "",
    mobile: "",
    email: "",
    referenceNo: "",
  });

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      if (editNationality === "Indian") {
        const updatedExaminers = [...nationalExaminers];
        updatedExaminers[editIndex] = FormData;
        setNationalExaminers(updatedExaminers);
      } else {
        const updatedExaminers = [...internationalExaminers];
        updatedExaminers[editIndex] = FormData;
        setInternationalExaminers(updatedExaminers);
      }
      setEditIndex(null);
      setEditNationality("");
    } else {
      if (FormData.nationality === "Indian") {
        if (nationalExaminers.length < 4) {
          setNationalExaminers([...nationalExaminers, FormData]);
        } else {
          alert("You can add up to 4 national examiners only.");
        }
      } else {
        if (internationalExaminers.length < 4) {
          setInternationalExaminers([...internationalExaminers, FormData]);
        } else {
          alert("You can add up to 4 international examiners only.");
        }
      }
    }
    setFormData({
      nationality: "Indian",
      examinerName: "",
      designation: "",
      department: "",
      university: "",
      city: "",
      pincode: "",
      country: "",
      mobile: "",
      email: "",
      referenceNo: "",
    });
    closeModal();
  };

  const openModal = (nationality, index = null) => {
    setFormData({
      nationality,
      examinerName: "",
      designation: "",
      department: "",
      university: "",
      city: "",
      pincode: "",
      country: "",
      mobile: "",
      email: "",
      referenceNo: "",
    });
    if (index !== null) {
      if (nationality === "Indian") {
        setFormData(nationalExaminers[index]);
      } else {
        setFormData(internationalExaminers[index]);
      }
      setEditIndex(index);
      setEditNationality(nationality);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDelete = (nationality, index) => {
    if (nationality === "Indian") {
      setNationalExaminers(nationalExaminers.filter((_, i) => i !== index));
    } else {
      setInternationalExaminers(
        internationalExaminers.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <div>
      <div className="student-form">
        <div className="first">
          <div className="data-input">
            <label htmlFor="regnoInput">Roll Number</label>
            <input
              type="number"
              id="regnoInput"
              name="regno"
              value={FormData.regno}
              readOnly
              required
            />
          </div>
          <div className="data-input">
            <label htmlFor="nameInput">Name</label>
            <input
              id="nameInput"
              name="name"
              value={FormData.name}
              readOnly
              required
            />
          </div>
        </div>
        <div className="date-input">
          <label htmlFor="dateOfAdmissionInput">Date of Admission</label>
          <input
            type="date"
            id="dateOfAdmissionInput"
            name="dateOfAdmission"
            value={FormData.dateOfAdmission}
            readOnly
            required
          />
        </div>
        <div className="data-input">
          <label htmlFor="researchTitleInput">Title of PhD Thesis</label>
          <input
            id="researchTitleInput"
            name="researchTitle"
            value={FormData.researchTitle}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="supervisor-table">
        <h2 className="headingg">Supervisors Details</h2>
        <table>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Name</th>
              <th>Contact No.</th>
              <th>Email ID</th>
            </tr>
          </thead>
          <tbody>
            {supervisors.map((supervisor, index) => (
              <tr key={index}>
                <td>{supervisor.serialno}</td>
                <td>{/* Supervisor name input */}</td>
                <td>{/* Supervisor contact number input */}</td>
                <td>{/* Supervisor email input */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="student-form">
        <div className="submitted-data">
          <div className="data-input">
            <label>List of Examiners</label>
          </div>
          <div className="columns">
            <div className="column">
              <h5>
                National Examiners <br />{" "}
                <button
                  className="add-button"
                  onClick={() => openModal("Indian")}
                >
                  Add +{" "}
                </button>
              </h5>
              {nationalExaminers.map((examiner, index) => (
                <div key={index} className="examiner-details">
                  <p>
                    <strong>Name of Examiner:</strong>{" "}
                    <span className="value">{examiner.examinerName}</span>
                  </p>
                  <p>
                    <strong>Designation:</strong>{" "}
                    <span className="value">{examiner.designation}</span>
                  </p>
                  <p>
                    <strong>Department:</strong>{" "}
                    <span className="value">{examiner.department}</span>
                  </p>
                  <p>
                    <strong>Name of University:</strong>{" "}
                    <span className="value">{examiner.university}</span>
                  </p>
                  <p>
                    <strong>Name of City:</strong>{" "}
                    <span className="value">{examiner.city}</span>
                  </p>
                  <p>
                    <strong>Pincode:</strong>{" "}
                    <span className="value">{examiner.pincode}</span>
                  </p>
                  <p>
                    <strong>Name of Country:</strong>{" "}
                    <span className="value">{examiner.country}</span>
                  </p>
                  <p>
                    <strong>Mobile No.:</strong>{" "}
                    <span className="value">{examiner.mobile}</span>
                  </p>
                  <p>
                    <strong>Institutional Email ID:</strong>{" "}
                    <span className="value">{examiner.email}</span>
                  </p>
                  <p>
                    <strong>Reference No. in Thesis:</strong>{" "}
                    <span className="value">{examiner.referenceNo}</span>
                  </p>
                  <button
                    className="two-button"
                    onClick={() => openModal("Indian", index)}
                  >
                    Edit
                  </button>
                  <button
                    className="two-button"
                    onClick={() => handleDelete("Indian", index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <div className="column">
              <h5>
                International Examiners <br />
                <button
                  className="add-button"
                  onClick={() => openModal("International")}
                >
                  Add +{" "}
                </button>
              </h5>
              {internationalExaminers.map((examiner, index) => (
                <div key={index} className="examiner-details">
                  <p>
                    <strong>Name of Examiner:</strong>{" "}
                    <span className="value">{examiner.examinerName}</span>
                  </p>
                  <p>
                    <strong>Designation:</strong>{" "}
                    <span className="value">{examiner.designation}</span>
                  </p>
                  <p>
                    <strong>Department:</strong>{" "}
                    <span className="value">{examiner.department}</span>
                  </p>
                  <p>
                    <strong>Name of University:</strong>{" "}
                    <span className="value">{examiner.university}</span>
                  </p>
                  <p>
                    <strong>Name of City:</strong>{" "}
                    <span className="value">{examiner.city}</span>
                  </p>
                  <p>
                    <strong>Pincode:</strong>{" "}
                    <span className="value">{examiner.pincode}</span>
                  </p>
                  <p>
                    <strong>Name of Country:</strong>{" "}
                    <span className="value">{examiner.country}</span>
                  </p>
                  <p>
                    <strong>Mobile No.:</strong>{" "}
                    <span className="value">{examiner.mobile}</span>
                  </p>
                  <p>
                    <strong>Institutional Email ID:</strong>{" "}
                    <span className="value">{examiner.email}</span>
                  </p>
                  <p>
                    <strong>Reference No. in Thesis:</strong>{" "}
                    <span className="value">{examiner.referenceNo}</span>
                  </p>
                  <button onClick={() => openModal("International", index)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete("International", index)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="data-input">
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Allot Examiners Modal"
            className="Modal"
            overlayClassName="Overlay"
          >
            <h2>Allot Examiners</h2>
            <form onSubmit={handleSubmit}>
              <div className="student-form">
                <div className="first">
                  <div className="modal-input">
                    <label htmlFor="examinerNameInput">Name of Examiner</label>
                    <input
                      type="text"
                      id="examinerNameInput"
                      name="examinerName"
                      value={FormData.examinerName}
                      onChange={HandleChange}
                      required
                    />
                  </div>
                  <div className="modal-input">
                    <label htmlFor="designationInput">Designation</label>
                    <input
                      type="text"
                      id="DesignationInput"
                      name="designation"
                      value={FormData.designation}
                      onChange={HandleChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-input">
                  <label htmlFor="departmentInput">Department</label>
                  <input
                    type="text"
                    id="DepartmentInput"
                    name="department"
                    value={FormData.department}
                    onChange={HandleChange}
                    required
                  />
                </div>
                <div className="first">
                  <div className="modal-input">
                    <label htmlFor="universityInput">Name of University</label>
                    <input
                      type="text"
                      id="universityInput"
                      name="university"
                      value={FormData.university}
                      onChange={HandleChange}
                      required
                    />
                  </div>
                  <div className="modal-input">
                    <label htmlFor="cityInput">Name of City</label>
                    <input
                      type="text"
                      id="cityInput"
                      name="city"
                      value={FormData.city}
                      onChange={HandleChange}
                      required
                    />
                  </div>
                </div>
                <div className="first">
                  <div className="modal-input">
                    <label htmlFor="pincodeInput">Pincode</label>
                    <input
                      type="text"
                      id="pincodeInput"
                      name="pincode"
                      value={FormData.pincode}
                      onChange={HandleChange}
                      required
                    />
                  </div>
                  <div className="modal-input">
                    <label htmlFor="countryInput">Name of Country</label>
                    <input
                      type="text"
                      id="countryInput"
                      name="country"
                      value={FormData.country}
                      onChange={HandleChange}
                      required
                    />
                  </div>
                </div>
                <div className="first">
                  <div className="modal-input">
                    <label htmlFor="mobileInput">Mobile No.</label>
                    <input
                      type="text"
                      id="mobileInput"
                      name="mobile"
                      value={FormData.mobile}
                      onChange={HandleChange}
                      required
                    />
                  </div>
                  <div className="modal-input">
                    <label htmlFor="emailInput">Institutional Email ID</label>
                    <input
                      type="email"
                      id="emailInput"
                      name="email"
                      value={FormData.email}
                      onChange={HandleChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-input">
                  <label htmlFor="referenceNoInput">
                    Reference No. in Thesis
                  </label>
                  <input
                    type="text"
                    id="referenceNoInput"
                    name="referenceNo"
                    value={FormData.referenceNo}
                    onChange={HandleChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="two-button">
                Save
              </button>
            </form>
          </Modal>
        </div>

        <div className="supervisor-button-div">
          <button className="send" type="submit">
            SEND TO DoRDC
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupSideListOfExaminer;
