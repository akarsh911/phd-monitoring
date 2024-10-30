import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useLocation, useParams } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import "./ProfileCard.css";
import { formatDate } from "../../utils/timeParse";
import { baseURL } from "../../api/urls";
import { customFetch } from "../../api/base";

function ProfileCard({ dataIP = null, link=false }) {
    const { state: locationState } = useLocation(); 
    let { roll_no } = useParams();
    const [state, setState] = useState(locationState || dataIP);
    const [loading, setLoading] = useState(!state); // Start in loading if no initial state

    useEffect(() => {
        if (!state) {
            const rollNumber = roll_no || "";
            const url = `${baseURL}/students/${rollNumber}`;

            customFetch(url, "GET").then((data) => {
                if (data && data.success) {
                    roll_no = data.response[0].id;
                    setState(data.response[0]);
                } else {
                    console.error("No data found or unauthorized access.");
                }
                setLoading(false); // Stop loading regardless of outcome
            });
        } else {
            setLoading(false); // Stop loading if state is already set
        }
    }, [roll_no, state]);

   
    const handleForms = () => {
        if(link){
            window.location.href= '/forms';
        }
        else
        window.location.href = `${window.location.pathname}/forms`;
    };

    const handleProgress = () => {
        if(link){
            window.location.href= '/progress';
        }
        else
        window.location.href = `${window.location.pathname}/progress`;

    };

    if (loading) {
        return <p>Loading...</p>;
    }

    const {
        name,
        phd_title,
        overall_progress,
        department,
        supervisors,
        email,
        phone,
        current_status,
        fathers_name,
        address,
        date_of_registration,
        date_of_irb,
        date_of_synopsis,
        cgpa
    } = state;

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
        { label: "Date of Admission", value: formatDate(date_of_registration) },
        { label: "Date of IRB", value: formatDate(date_of_irb) },
        { label: "Date of Synopsis", value: formatDate(date_of_synopsis) },
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
