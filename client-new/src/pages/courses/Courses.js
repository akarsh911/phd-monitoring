import React, { useState } from "react";
import CustomModal from "../../components/forms/modal/CustomModal";
import CustomButton from "../../components/forms/fields/CustomButton";
import GridContainer from "../../components/forms/fields/GridContainer";
import DropdownField from "../../components/forms/fields/DropdownField";
import InputField from "../../components/forms/fields/InputField";
import { coursesData } from "../../data/coursesData";
import "./Courses.css";
import Layout from "../../components/dashboard/layout";

const Courses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);
  const [gradeModalOpen, setGradeModalOpen] = useState(false);
  const [gradeInput, setGradeInput] = useState("");

  const statusOptions = [
    { label: "Registered", value: "registered" },
    { label: "Ongoing", value: "ongoing" },
    { label: "Completed", value: "completed" },
  ];

  const openEnrollModal = () => {
    setIsModalOpen(true);
    setSelectedCourse(null);
    setSearchTerm("");
  };

  const closeEnrollModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleCourseSelect = (courseCode) => {
    const course = coursesData.find((c) => c.code === courseCode);
    setSelectedCourse(course);
  };

  const enrollInCourse = () => {
    if (selectedCourse) {
      const alreadyEnrolled = enrolledCourses.some(
        (c) => c.code === selectedCourse.code && c.name === selectedCourse.name
      );
      
      if (alreadyEnrolled) {
        alert("You are already enrolled in this course!");
        return;
      }

      const newEnrollment = {
        ...selectedCourse,
        id: Date.now(), // Unique identifier
        status: "registered",
        grade: null,
        gradeStatus: null, // null, 'pending', 'approved'
      };
      
      setEnrolledCourses([...enrolledCourses, newEnrollment]);
      closeEnrollModal();
    }
  };

  const handleStatusChange = (courseId, newStatus) => {
    if (newStatus === "completed") {
      // Open grade modal
      const course = enrolledCourses.find((c) => c.id === courseId);
      setEditingCourse(course);
      setGradeModalOpen(true);
    } else {
      // Update status directly for registered/ongoing
      setEnrolledCourses(
        enrolledCourses.map((course) =>
          course.id === courseId
            ? { ...course, status: newStatus, grade: null, gradeStatus: null }
            : course
        )
      );
    }
  };

  const submitGrade = () => {
    if (!gradeInput || gradeInput.trim() === "") {
      alert("Please enter a grade!");
      return;
    }

    setEnrolledCourses(
      enrolledCourses.map((course) =>
        course.id === editingCourse.id
          ? {
              ...course,
              status: "completed",
              grade: gradeInput,
              gradeStatus: "pending",
            }
          : course
      )
    );

    setGradeModalOpen(false);
    setEditingCourse(null);
    setGradeInput("");
  };

  const closeGradeModal = () => {
    setGradeModalOpen(false);
    setEditingCourse(null);
    setGradeInput("");
  };

  const deleteCourse = (courseId) => {
    if (window.confirm("Are you sure you want to remove this course?")) {
      setEnrolledCourses(enrolledCourses.filter((c) => c.id !== courseId));
    }
  };

  const filteredCourses = coursesData.filter(
    (course) =>
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCredits = enrolledCourses.reduce(
    (sum, course) => sum + course.credits,
    0
  );

  return (
    <Layout>
    <div className="courses-container">
      <div className="courses-header">
        <h1>My Courses</h1>
        <CustomButton text="+ Enroll in New Course" onClick={openEnrollModal} />
      </div>

      <div className="courses-summary">
        <div className="summary-card">
          <h3>Total Enrolled</h3>
          <p className="summary-value">{enrolledCourses.length}</p>
        </div>
        <div className="summary-card">
          <h3>Total Credits</h3>
          <p className="summary-value">{totalCredits}</p>
        </div>
        <div className="summary-card">
          <h3>Completed</h3>
          <p className="summary-value">
            {enrolledCourses.filter((c) => c.status === "completed").length}
          </p>
        </div>
        <div className="summary-card">
          <h3>Ongoing</h3>
          <p className="summary-value">
            {enrolledCourses.filter((c) => c.status === "ongoing").length}
          </p>
        </div>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="empty-state">
          <p>You haven't enrolled in any courses yet.</p>
          <CustomButton
            text="Enroll in Your First Course"
            onClick={openEnrollModal}
          />
        </div>
      ) : (
        <div className="courses-table-container">
          <table className="courses-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Credits</th>
                <th>Status</th>
                <th>Grade</th>
                <th>Grade Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrolledCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.code}</td>
                  <td>{course.name}</td>
                  <td>{course.credits}</td>
                  <td>
                    <select
                      value={course.status}
                      onChange={(e) =>
                        handleStatusChange(course.id, e.target.value)
                      }
                      className="status-dropdown"
                      disabled={course.gradeStatus === "pending"}
                    >
                      <option value="registered">Registered</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td>
                    {course.grade ? (
                      <span className="grade-badge">{course.grade}</span>
                    ) : (
                      <span className="grade-na">—</span>
                    )}
                  </td>
                  <td>
                    {course.gradeStatus === "pending" ? (
                      <span className="status-badge pending">
                        Pending Review
                      </span>
                    ) : course.gradeStatus === "approved" ? (
                      <span className="status-badge approved">Approved</span>
                    ) : (
                      <span className="grade-na">—</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteCourse(course.id)}
                      disabled={course.gradeStatus === "pending"}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Enrollment Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeEnrollModal}
        title="Enroll in New Course"
        minHeight="400px"
        maxHeight="600px"
        minWidth="600px"
        maxWidth="800px"
      >
        <div className="enrollment-modal-content">
          <GridContainer
            elements={[
              <InputField
                label="Search Courses"
                hint="Enter course code or name..."
                onChange={(value) => setSearchTerm(value)}
                initialValue={searchTerm}
              />,
            ]}
            space={2}
          />

          <div className="courses-list">
            {filteredCourses.length === 0 ? (
              <p className="no-results">No courses found</p>
            ) : (
              filteredCourses.slice(0, 20).map((course, index) => (
                <div
                  key={index}
                  className={`course-item ${
                    selectedCourse?.code === course.code &&
                    selectedCourse?.name === course.name
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleCourseSelect(course.code)}
                >
                  <div className="course-item-header">
                    <span className="course-code">{course.code}</span>
                    <span className="course-credits">
                      {course.credits} Credits
                    </span>
                  </div>
                  <div className="course-name">{course.name}</div>
                </div>
              ))
            )}
          </div>

          {selectedCourse && (
            <div className="selected-course-info">
              <h3>Selected Course:</h3>
              <p>
                <strong>{selectedCourse.code}</strong> - {selectedCourse.name}
              </p>
              <p>Credits: {selectedCourse.credits}</p>
            </div>
          )}

          <GridContainer
            elements={[
              <CustomButton text="Cancel" onClick={closeEnrollModal} />,
              <CustomButton
                text="Enroll"
                onClick={enrollInCourse}
                disabled={!selectedCourse}
              />,
            ]}
          />
        </div>
      </CustomModal>

      {/* Grade Input Modal */}
      <CustomModal
        isOpen={gradeModalOpen}
        onClose={closeGradeModal}
        title="Enter Grade for Completed Course"
        minHeight="250px"
        maxHeight="400px"
        minWidth="500px"
        maxWidth="600px"
      >
        <div className="grade-modal-content">
          {editingCourse && (
            <>
              <p className="course-info-text">
                <strong>Course:</strong> {editingCourse.code} -{" "}
                {editingCourse.name}
              </p>
              <p className="course-info-text">
                <strong>Credits:</strong> {editingCourse.credits}
              </p>

              <GridContainer
                elements={[
                  <InputField
                    label="Total Grade"
                    hint="Enter your grade (e.g., A, B+, 85, etc.)"
                    onChange={(value) => setGradeInput(value)}
                    initialValue={gradeInput}
                  />,
                ]}
                space={2}
              />

              <p className="info-note">
                Once you submit, the grade will be marked as "Pending for
                Review" and you won't be able to modify the status until
                approved.
              </p>

              <GridContainer
                elements={[
                  <CustomButton text="Cancel" onClick={closeGradeModal} />,
                  <CustomButton text="Submit Grade" onClick={submitGrade} />,
                ]}
              />
            </>
          )}
        </div>
      </CustomModal>
    </div>
    </Layout>
  );
};

export default Courses;
