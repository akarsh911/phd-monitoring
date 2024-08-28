import React, { useState, useEffect } from "react";
import "./SupervisorChange.css";
import StudentSideSupervisorChange from "./StudentSideSupervisorChange";
// import PHDCoordinatorSideSupervisorChange from './PHDCoordinatorSideSupervisorChange';
import HoDSideSupervisorChange from "./HoDSideSupervisorChange";
import DoRDCSideSupervisorChange from "./DoRDCSideSupervisorChange";
import DrASideSupervisorChange from "./DrASideSupervisorChange";
import StatusModal from "../Modal/Modal";
import { SERVER_URL } from "../../../config";
import { useParams } from "react-router-dom";

const SupervisorChange = () => {
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    regno: "",
    gender: "",
    admissionDate: "",
    regno: "",
    mobile: "",
    irbCompleted: "",
    email: "",
    role: "student",
    researchTitle: "",
    supervisorsAllocated: "",
    dateAllocated: "",
    supervisorChange: "",
    reasonForChange: "",
    preference: "",
    selectedSupervisors: [], // Holds the selected supervisors
    newSupervisors: [], // Holds the names of the new supervisors
    student_lock: true,
    supervisor_lock: true,
    hod_lock: true,
    dordc_lock: true,
    supervisors: ["Sup 1", "Sup 2", "Sup 3"],

    HoDRecommendation: "",
  });
  const handleSelectedSupervisorChange = (event) => {
    const supervisorName = event.target.value;

    // Check if supervisorName is already in selectedSupervisors
    const isSelected = formData.selectedSupervisors.includes(supervisorName);

    if (event.target.checked && !isSelected) {
      // Add supervisorName to selectedSupervisors if checked
      const updatedSelectedSupervisors = [
        ...formData.selectedSupervisors,
        supervisorName,
      ];
      setFormData({
        ...formData,
        selectedSupervisors: updatedSelectedSupervisors,
      });
    } else if (!event.target.checked && isSelected) {
      // Remove supervisorName from selectedSupervisors if unchecked
      const updatedSelectedSupervisors = formData.selectedSupervisors.filter(
        (name) => name !== supervisorName
      );
      setFormData({
        ...formData,
        selectedSupervisors: updatedSelectedSupervisors,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    let finalValue;
    if (name === "irbCompleted") {
      finalValue = value === "true";
    } else {
      finalValue = value;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: finalValue,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/forms/supervisor/change`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            student_id: params.id,
          }), // Replace with actual id
        }); // API endpoint
        const data = await response.json();
        console.log(data);
        setFormData({
          date: new Date(data.date_of_registration).toISOString().split("T")[0],
          name: data.name,
          gender: data.gender,
          admissionDate: new Date(data.date_of_registration)
            .toISOString()
            .split("T")[0],
          regno: data.roll_no,
          email: data.email,
          mobile: data.phone,
          irbCompleted: data.irb_completed,
          researchTitle: data.title_of_phd,
          supervisorsAllocated: "",
          dateAllocated: new Date(data.date_of_supervisor_allocation)
            .toISOString()
            .split("T")[0],
          supervisorChange: "",
          reasonForChange: "",
          preference: "",
          role:data.role,
         // Adjust this based on your logic
          supervisor_lock: data.supervisor_lock, // Adjust this based on your logic
          hod_lock: data.hod_lock, // Adjust this based on your logic
          dordc_lock: data.dordc_lock, 
          selectedSupervisors: [], // Holds the selected supervisors
          newSupervisors: [], // Holds the names of the new supervisors

          supervisors: data.supervisors.map((supervisor) => supervisor.name),

          HoDRecommendation: "",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleHoDRecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      HoDRecommendation: e.target.value,
    }));
  };

  const handlePHDCoordinatorRecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      HoDRecommendation: e.target.value,
    }));
  };

  const handleDoRDCRecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      HoDRecommendation: e.target.value,
    }));
  };

  const handleDRARecommendationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      HoDRecommendation: e.target.value,
    }));
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prevData) => ({ ...prevData, date: today }));

    const fetchData = async () => {
      try {
        const response = await fetch(""); // API
        const data = await response.json();
        setFormData((prevData) => ({ ...prevData, ...data }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <h1>Application for Supervisor Change
          </h1>
          <div className='top-button'>
          <button onClick={openModal}>View Status</button>
          {isModalOpen && <StatusModal closeModal={closeModal} />}
        </div>
        </div>
        
        <form onSubmit={handleSubmit} className="studentSideform">
        {formData.role == "student" && (
            <StudentSideSupervisorChange
            formData={formData}
            handleChange={handleChange}
            handleSelectedSupervisorChange={handleSelectedSupervisorChange}
          />
          )}
          

          {/* STUDENT SIDE ENDS */}

          {/* <PHDCoordinatorSideSupervisorChange formData={formData} handlePHDCoordinatorRecommendationChange={handlePHDCoordinatorRecommendationChange} />

PHD Coordinator Side Ends */}
        {formData.role === "hod" && (
            <div>
              <StudentSideSupervisorChange
            formData={formData}
            handleChange={handleChange}
            handleSelectedSupervisorChange={handleSelectedSupervisorChange}
          />
              <HoDSideSupervisorChange
            formData={formData}
            handleHoDRecommendationChange={handleHoDRecommendationChange}
            handleChange={handleChange}
          />
          {/* HoD SIDE ENDS */}

          <DoRDCSideSupervisorChange
            formData={formData}
            handleDoRDCRecommendationChange={handleDoRDCRecommendationChange}
          />

          {/* DoRDC side ends */}
          <DrASideSupervisorChange
            formData={formData}
            handleDRARecommendationChange={handleDRARecommendationChange}
          />
            </div>
          )}
          {formData.role === "dordc" && (
            <div>
              <StudentSideSupervisorChange
            formData={formData}
            handleChange={handleChange}
            handleSelectedSupervisorChange={handleSelectedSupervisorChange}
          />
              <HoDSideSupervisorChange
            formData={formData}
            handleHoDRecommendationChange={handleHoDRecommendationChange}
            handleChange={handleChange}
          />
          {/* HoD SIDE ENDS */}

          <DoRDCSideSupervisorChange
            formData={formData}
            handleDoRDCRecommendationChange={handleDoRDCRecommendationChange}
          />
            </div>
          )}
          {formData.role === "dra" && (
            <div>
              <StudentSideSupervisorChange
            formData={formData}
            handleChange={handleChange}
            handleSelectedSupervisorChange={handleSelectedSupervisorChange}
          />
              <HoDSideSupervisorChange
            formData={formData}
            handleHoDRecommendationChange={handleHoDRecommendationChange}
            handleChange={handleChange}
          />
          {/* HoD SIDE ENDS */}

          <DoRDCSideSupervisorChange
            formData={formData}
            handleDoRDCRecommendationChange={handleDoRDCRecommendationChange}
          />

          {/* DoRDC side ends */}
          <DrASideSupervisorChange
            formData={formData}
            handleDRARecommendationChange={handleDRARecommendationChange}
          />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// function App() {
//   const [results, setResults] = useState([]);
//   const [input, setInput] = useState("");

//   const fetchData = (value) => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((json) => {
//         const results = json.filter((user) => {
//           return (
//             value &&
//             user &&
//             user.name &&
//             user.name.toLowerCase().includes(value)
//           );
//         });
//         setResults(results);
//       });
//   };

//   const handleChange = (value) => {
//     setInput(value);
//     fetchData(value);
//   };

//   return (
//     <div className="App">
//       <div className="search-bar-container">
//         <div className="input-wrapper">
//           <input
//             placeholder="Type to search..."
//             value={input}
//             onChange={(e) => handleChange(e.target.value)}
//           />
//         </div>
//         {results && results.length > 0 && (
//           <div className="results-list">
//             {results.map((result, id) => {
//               return (
//                 <div
//                   className="search-result"
//                   onClick={(e) => alert(`You selected ${result}!`)}
//                 >
//                   {result}
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

export default SupervisorChange;
