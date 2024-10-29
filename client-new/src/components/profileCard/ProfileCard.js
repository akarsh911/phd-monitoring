import React, { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useLocation } from "react-router-dom"; // Import useLocation
import "react-circular-progressbar/dist/styles.css";
import "./ProfileCard.css";
import { formatDate } from "../../utils/timeParse";

function ProfileCard({ dataIP }) {
    let { state } = useLocation(); // Access the passed state
    if (!state) state=dataIP; // Return null if state is not
    if(!state) 
        return (<div>Student not found</div>);


    const {
        name,
        phd_title,
        overall_progress,
        roll_no,
        department,
        supervisors,
        email,
        phone,
        current_status,
        fathers_name,
        address,
        date_of_registration,
        date_of_irb,
        date_of_synopsis,cgpa
    } = state; // Destructure the passed data

    const handleForms = () => {
        window.location.href = window.location.href + "/forms";
    }
    const handleProgress = () => {
        window.location.href = window.location.href + "/progress";
    }

    const data = [
        { label: "Roll Number", value: roll_no },
        { label: "Email", value: email },
        { label: "Phone", value: phone },
        { label: "Department", value: department },
        { label: "Supervisors", value: supervisors?.join(", ") },
        { label: "CGPA", value: cgpa },
        { label: "Father's Name", value: fathers_name },
        { label: "Address", value: address },
        { label: "Current Status", value: current_status },
        { label: "Date of Admission", value: formatDate(date_of_registration) }, // Formatting date
        { label: "Date of IRB", value: formatDate(date_of_irb) }, // Formatting date
        { label: "Date of Synopsis", value: formatDate(date_of_synopsis) }, // Formatting date
    ];



    return (
        <div className="profile-card">
            <div className="profile-header">
                <div>
                    <h2 className="profile-name">{name}</h2>
                    <h3 className="profile-title">{phd_title}</h3>
                </div>
                <div className="progress-circle">
                    <CircularProgressbar
                        value={overall_progress}
                        text={`${overall_progress}%`}
                        styles={buildStyles({
                            textColor: "#333",
                            pathColor: "#007bff",
                            trailColor: "#ddd"
                        })}
                    />
                </div>
            </div>

            <div className="profile-grid">
                {data.map((item, index) => (
                    <div key={index} className="profile-grid-item">
                        <strong>{item.label}</strong>
                        <span>{item.value}</span>
                    </div>
                ))}
            </div>

            <div className="profile-actions">
                <button className="profile-button" onClick={handleForms}>View Forms</button>
                <button className="profile-button" onClick={handleProgress}>View Presentations</button>
            </div>
        </div>
    );
}

export default ProfileCard;
