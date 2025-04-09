import React from "react";
import "./FacultyProfile.css";
import { useNavigate } from "react-router-dom";

const FacultyProfile = ({ faculty }) => {
  const navigate = useNavigate();

  if (!faculty) {
    return <div className="faculty-container"><p>Loading faculty data...</p></div>;
  }

  return (
    <div className="faculty-container">
      <h2>{faculty.faculty_name}</h2>
      <p className="faculty-sub">
        {faculty.designation}, {faculty.department}
      </p>

      <div className="faculty-info-grid">
        <div><strong>Email:</strong> {faculty.email}</div>
        <div><strong>Phone:</strong> {faculty.phone || "N/A"}</div>
        <div><strong>Faculty Code:</strong> {faculty.faculty_code}</div>
        <div><strong>Supervised (Campus):</strong> {faculty.supervised_campus ?? 0}</div>
        <div><strong>Supervised (Outside):</strong> {faculty.supervised_outside ?? 0}</div>
      </div>

      {/* Supervised Students */}
      <div className="faculty-table-section">
        <h3>Supervised Students</h3>
        {faculty.supervised_students?.length === 0 ? (
          <p className="empty-msg">No students currently supervised.</p>
        ) : (
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {faculty.supervised_students?.map((student, idx) => (
                  <tr
                    key={idx}
                    onClick={() => navigate(`/students/${student.roll_no}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{idx + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.roll_no}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>{student.overall_progress}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Doctoral Committee */}
      <div className="faculty-table-section">
        <h3>Doctoral Committee Membership</h3>
        {faculty.doctoral_committee_students?.length === 0 ? (
          <p className="empty-msg">Not a member of any doctoral committee.</p>
        ) : (
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Student Name</th>
                  <th>Roll No</th>
                  <th>Email</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {faculty.doctoral_committee_students?.map((student, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.roll_no}</td>
                    <td>{student.email}</td>
                    <td>{student.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyProfile;
