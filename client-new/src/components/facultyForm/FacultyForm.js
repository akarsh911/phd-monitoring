import { useEffect, useState } from "react";
import InputField from "../forms/fields/InputField";
import GridContainer from "../forms/fields/GridContainer";
import CustomButton from "../forms/fields/CustomButton";
import InputSuggestions from "../forms/fields/InputSuggestions";
import { customFetch } from "../../api/base";
import { baseURL } from "../../api/urls";

const FacultyForm = ({ edit = false, facultyData = {} }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    department_id: "",
    designation: "",
    faculty_code: "",
  });

  useEffect(() => {
    if (edit && facultyData) {
      setFormData({
        first_name: facultyData.first_name || "",
        last_name: facultyData.last_name || "",
        email: facultyData.email || "",
        phone: facultyData.phone || "",
        department_id: facultyData.department_id || "",
        designation: facultyData.designation || "",
        faculty_code: facultyData.faculty_code || "",
      });
    }
  }, [edit, facultyData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const endpoint = edit
      ? baseURL + `/faculty/update/${facultyData.id}`
      : baseURL + "/faculty/add";

    const method = edit ? "PUT" : "POST";

    const res = await customFetch(endpoint, method, formData);
    if (res.success) {
      if (!edit) {
        alert("Faculty created. Temporary Password: " + res.response.password);
      } else {
        alert("Faculty updated successfully.");
      }
    }
  };

  return (
    <>
      <GridContainer
        space={3}
        elements={[
          <div className="form-title">
            {!edit ? "Create " : "Edit "}Faculty Form
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
          <InputSuggestions
            label="Department*"
            initialValue={formData.department_id}
            onSelect={(val) => handleChange("department_id", val.id)}
            apiUrl={baseURL + "/suggestions/department"}
          />,
          <InputSuggestions
            label="Designation*"
            initialValue={formData.designation}
            onSelect={(val) => {console.log(val);handleChange("designation", val.name)}}
            apiUrl={baseURL + "/suggestions/designation"}
          />,
        ]}
      />
      <GridContainer
        elements={[
          <InputField
            label="Faculty Code*"
            initialValue={formData.faculty_code}
            onChange={(val) => handleChange("faculty_code", val)}
          />,
        ]}
      />
      <GridContainer
        elements={[
          <CustomButton
            text={edit ? "Update Faculty" : "Add Faculty"}
            onClick={handleSubmit}
          />,
        ]}
      />
    </>
  );
};

export default FacultyForm;
