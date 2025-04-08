import { useEffect, useState } from "react";
import InputField from "../forms/fields/InputField";
import GridContainer from "../forms/fields/GridContainer";
import CustomButton from "../forms/fields/CustomButton";
import { customFetch } from "../../api/base";

import InputSuggestions from "../forms/fields/InputSuggestions";
import { baseURL } from "../../api/urls";
import DateField from "../forms/fields/DateField";
import DropdownField from "../forms/fields/DropdownField";

const StudentForm = ({ edit = false, studentData = {} }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    roll_no: "",
    department_id: "",
    date_of_registration: "",
    date_of_irb: "",
    phd_title: "",
    fathers_name: "",
    address: "",
    current_status: "",
    overall_progress: "",
    cgpa: "",
  });

  useEffect(() => {
    if (edit && studentData) {
      setFormData({
        first_name: studentData.first_name || "",
        last_name: studentData.last_name || "",
        phone: studentData.phone || "",
        email: studentData.email || "",
        roll_no: studentData.roll_no || "",
        department_id: studentData.department_id || "",
        date_of_registration: studentData.date_of_registration || "",
        date_of_irb: studentData.date_of_irb || "",
        phd_title: studentData.phd_title || "",
        fathers_name: studentData.fathers_name || "",
        address: studentData.address || "",
        current_status: studentData.current_status || "",
        overall_progress: studentData.overall_progress || "",
        cgpa: studentData.cgpa || "",
      });
    }
  }, [edit, studentData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const endpoint = edit
      ? baseURL+`/students/update/${studentData.id}` // use actual student ID
      : baseURL+"/students/add";

    const method = edit ? "PUT" : "POST";

    const res = await customFetch(endpoint, method, formData);
    if (res.success) {
      if (!edit) {
        alert("Student created. Temporary Password: " + res.response);
      } else {
        alert("Student updated successfully.");
      }
    }
  };

  return (
    <>
      <GridContainer
        space={3}
        elements={[
          <div className="form-title">
            {" "}
            {!edit ? <>Create </> : <>Edit </>}Student Form
          </div>,
        ]}
      />
      <GridContainer
        elements={[
          <InputField
            label="First Name*"
            initialValue={formData.first_name}
            onChange={(val) => handleChange("first_name", val)}
          />,
          <InputField
            label="Last Name*"
            initialValue={formData.last_name}
            onChange={(val) => handleChange("last_name", val)}
          />,
        ]}
      />
      <GridContainer
        elements={[
          <InputField
            label="Email*"
            initialValue={formData.email}
            onChange={(val) => handleChange("email", val)}
          />,
          <InputField
            label="Phone*"
            initialValue={formData.phone}
            onChange={(val) => handleChange("phone", val)}
          />,
        ]}
        space={2}
        ratio={[2, 1]}
      />

      <GridContainer
        elements={[
          <InputField
            label="Roll Number*"
            initialValue={formData.roll_no}
            onChange={(val) => handleChange("roll_no", val)}
          />,
          <InputSuggestions
            label="Department*"
            initialValue={formData.department_id}
            onSelect={(val) => {handleChange("department_id", val.id)}}
            apiUrl={baseURL + "/suggestions/department"}
          />,
        ]}
      />
      <GridContainer
        elements={[
          <DateField
            label="Date of Registration*"
            initialValue={formData.date_of_registration}
            onChange={(val) => handleChange("date_of_registration", val)}
          />,
          <DateField
            label="Date of IRB"
            initialValue={formData.date_of_irb}
            onChange={(val) => handleChange("date_of_irb", val)}
          />,
        ]}
      />
      <GridContainer
        space={3}
        elements={[
          <InputField
            label="PhD Title"
            initialValue={formData.phd_title}
            onChange={(val) => handleChange("phd_title", val)}
          />,
          <InputField
            label="Father's Name"
            initialValue={formData.fathers_name}
            onChange={(val) => handleChange("fathers_name", val)}
          />,
          <InputField
            label="Address"
            initialValue={formData.address}
            onChange={(val) => handleChange("address", val)}
          />,
        ]}
      />

      <GridContainer
        elements={[
          <DropdownField
            label={"Current Status*"}
            initialValue={formData.current_status}
            onChange={(val) => handleChange("current_status", val)}
            options={[
              { title: "Full Time", value: "full_time" },
              { title: "Part Time", value: "part_time" },
            ]}
          />,
          <InputField
            label="Overall Progress (%)"
            type="number"
            initialValue={formData.overall_progress}
            onChange={(val) => handleChange("overall_progress", val)}
          />,
          <InputField
            label="CGPA*"
            type="number"
            initialValue={formData.cgpa}
            onChange={(val) => handleChange("cgpa", val)}
          />,
        ]}
      />

      <GridContainer
        elements={[
          <CustomButton
            text={edit ? "Update Student" : "Add Student"}
            onClick={handleSubmit}
          />,
        ]}
      />
    </>
  );
};

export default StudentForm;
