import React, { useState, useEffect } from "react";
import "../ChangeOfStatus/StatusChange.css";
import StudentSideIrb from "./StudentSideIrb";
import SupSideIrb from "./SupSideIrb";
import HodSideIrb from "./HodSideIrb";
import DoRDCSideIrb from "./DoRDCSideIrb";
import { SERVER_URL } from "../../../config";
import { useParams } from "react-router-dom";
import StatusModal from "../Modal/Modal";

const Irb = () => {
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    gender: "",
    admissionDate: "",
    regno: "",
    department: "",
    semester: "",
    session: "",
    cgpa: "",
    chairman: "",
    supervisor: "",
    experts: ["", "", ""],
    nominees: ["", "", ""],
    chairmanExperts: [""],
    hodRecommendation: "",
    supervisorRecommendation: "",
    expertfromIRB: "",
    nomineeDoRDC: "",
    student_lock: true,
    supervisor_lock: true,
    hod_lock: true,
    dordc_lock: true,
    role: "dordc",
    suggestions: [],
    status: "awaited",
  });

  const [options, setOptions] = useState({
    experts: [],
    nominees: [],
    chairmanExpertsOptions: [],
  });

  const [lastUpdate, setLastUpdate] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/forms/irb/constitutuion/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            student_id: params.id,
          }), // Replace with actual id
        });
        // const response=await

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data.nominee_cognates.length < 3) {
            for (let i = data.nominee_cognates.length; i < 3; i++) {
              data.nominee_cognates.push({});
            }
          }
          setFormData({
            date: new Date(data.date_of_registration)
              .toISOString()
              .split("T")[0],
            name: data.name,
            gender: data.gender,
            admissionDate: new Date(data.date_of_registration)
              .toISOString()
              .split("T")[0],
            regno: data.roll_no,
            department: data.department,
            semester: "", // Map accordingly if available
            session: "", // Map accordingly if available
            cgpa: data.cgpa,
            chairman: data.chairman.name,
            supervisor: data.supervisors.map((s) => s.name).join(", "),
            experts: data.outside_experts?.name || ["", "", ""], // Map accordingly if available
            nominees: data.nominee_cognates || [{}, {}, {}], // Map accordingly if available
            chairmanExperts: data.chairman_experts || [{}], // Map accordingly if available// Map accordingly if available
            expertfromIRB: "", // Map accordingly if available
            nomineeDoRDC: "", // Map accordingly if available
            student_lock: data.student_lock, // Adjust this based on your logic
            supervisor_lock: data.supervisor_lock, // Adjust this based on your logic
            hod_lock: data.hod_lock, // Adjust this based on your logic
            dordc_lock: data.dordc_lock, // Adjust this based on your logic
            role: data.role,
            supervisor_comments: data.SuperVisorComments,
            hod_comments: data.HODComments,
            dordc_comments: data.dordc_comments,
            suggestions: data.suggestions,
            status: data.status,
          });
          const update =
            data.form_histories[data.form_histories.length - 1].change;
          const time = new Date(
            data.form_histories[data.form_histories.length - 1].created_at
          ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          const date = new Date(
            data.form_histories[data.form_histories.length - 1].created_at
          ).toLocaleDateString();
          const formattedDateTime = `${date} at ${time}`;
          setLastUpdate({
            change: update,
            time: formattedDateTime,
          });
          setOptions({
            experts: data.experts || [], // Map accordingly if available in data
            nominees: data.nominees || [], // Map accordingly if available in data
            chairmanExpertsOptions: data.chairmanExpertsOptions || [], // Map accordingly if available in data
          });
        } else {
          throw response;
        }
      } catch (error) {
        console.log("Error has occurred:", error);
        if (error instanceof Response) {
          error
            .json()
            .then((data) => {
              if (error.status === 422) {
                alert(data.message);
              } else if (error.status === 401) {
                alert("Invalid email or password");
              } else if (error.status === 500) {
                alert("Server error. Please try again later.");
              }
            })
            .catch((jsonError) => {
              console.error("Error parsing JSON:", jsonError);
            });
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    // fetchData();
  }, []);

  const handleExpertChange = (index, value) => {
    setFormData((prevData) => {
      const newExperts = [...prevData.experts];
      newExperts[index] = value;
      return { ...prevData, experts: newExperts };
    });
  };

  const handleNomineeChange = (index, value) => {
    setFormData((prevData) => {
      const newNominees = [...prevData.nominees];
      newNominees[index] = value;
      return { ...prevData, nominees: newNominees };
    });
  };

  const handleChairmanExpertChange = (index, value) => {
    setFormData((prevData) => {
      const newChairmanExperts = [...prevData.chairmanExperts];
      newChairmanExperts[index] = value;
      return { ...prevData, chairmanExperts: newChairmanExperts };
    });
  };

  const addChairmanExpert = () => {
    setFormData((prevData) => ({
      ...prevData,
      chairmanExperts: [...prevData.chairmanExperts, ""],
    }));
  };

  const handleHodRecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      hodRecommendation: e.target.value,
    }));
  };

  const handleRecommendationChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      supervisorRecommendation: value,
    }));
  };

  const handleDoRDCChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };
  const params = useParams();
  return (
    <div className="extensionBody-div">
      <div className="extensionform-div">
        <div className="heading">
          <h1>Constitute of Institute Research Board</h1>
          <div className='top-button'>
          <button onClick={openModal}>View Status</button>
          {isModalOpen && <StatusModal closeModal={closeModal} />}
        </div>
        </div>
        {/* <h2 className="last-update">
          Last update - {lastUpdate.change} on {lastUpdate.time}
        </h2> */}
        {/* <StudentSideIrb formData={formData} /> */}
        <form onSubmit={handleSubmit} className="studentSideform">
          {formData.role === "student" && (
            <StudentSideIrb formData={formData} />
          )}
          {formData.role === "faculty" && (
            <div className="supervisor-form">
              <StudentSideIrb formData={formData} />
              <SupSideIrb
                formData={formData}
                options={options}
                handleExpertChange={handleExpertChange}
                handleNomineeChange={handleNomineeChange}
                handleRecommendationChange={handleRecommendationChange}
              />
            </div>
          )}
          {formData.role === "hod" && (
            <div>
              <StudentSideIrb formData={formData} />
              <SupSideIrb
                formData={formData}
                options={options}
                handleExpertChange={handleExpertChange}
                handleNomineeChange={handleNomineeChange}
                handleRecommendationChange={handleRecommendationChange}
              />
              <HodSideIrb
                formData={formData}
                options={options}
                handleExpertChange={handleExpertChange}
                handleChairmanExpertChange={handleChairmanExpertChange}
                addChairmanExpert={addChairmanExpert}
                handleHodRecommendationChange={handleHodRecommendationChange}
              />
            </div>
          )}
          {formData.role === "dordc" && (
            <div>
              <StudentSideIrb formData={formData} />
              <SupSideIrb
                formData={formData}
                options={options}
                handleExpertChange={handleExpertChange}
                handleNomineeChange={handleNomineeChange}
                handleRecommendationChange={handleRecommendationChange}
              />
              <HodSideIrb
                formData={formData}
                options={options}
                handleExpertChange={handleExpertChange}
                handleChairmanExpertChange={handleChairmanExpertChange}
                addChairmanExpert={addChairmanExpert}
                handleHodRecommendationChange={handleHodRecommendationChange}
              />
              <DoRDCSideIrb
                formData={formData}
                options={options}
                handleDoRDCChange={handleDoRDCChange}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Irb;
