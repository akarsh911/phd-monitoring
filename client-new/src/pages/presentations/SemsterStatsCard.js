import React, { useEffect, useState } from "react";
import { customFetch } from "../../api/base";
import { baseURL } from "../../api/urls";

const SemesterStatsCard = () => {
  const [semesterStats, setSemesterStats] = useState(null);

  useEffect(() => {
    fetchSemesterStats();
  }, []);

  const fetchSemesterStats = async () => {
    try {
      const res = await customFetch(baseURL + "/semester/recent", "GET");
   
        console.log(res.response.data);
        setSemesterStats(res.response.data);
      
    } catch (error) {
      console.error("Error fetching semester stats:", error);
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
    <div
      className="semester-stats"
      style={{
        marginBottom: "20px",
        background: "#ffffff",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <h3 style={{ marginBottom: "12px", fontSize: "1.5rem", color: "#333" }}>
      {semester_name} Semester Stats
      </h3>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          fontSize: "14px",
          color: "#555",
        }}
      >
        <div>
          <strong>Semester:</strong> {semester_name}
        </div>
        <div>
          <strong>Start Date:</strong>{" "}
          {new Date(start_date).toLocaleDateString()}
        </div>
        <div>
          <strong>End Date:</strong>{" "}
          {new Date(end_date).toLocaleDateString()}
        </div>
        <div>
          <strong>Leave Scheduled:</strong> {leave}
        </div>
        <div>
          <strong>Scheduled:</strong> {scheduled}
        </div>
        <div>
          <strong>Unscheduled:</strong> {unscheduled}
        </div>
      </div>
    </div>
  );
};

export default SemesterStatsCard;