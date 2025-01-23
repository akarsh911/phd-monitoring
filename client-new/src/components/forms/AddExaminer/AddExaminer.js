import { useEffect, useState } from "react";
import CustomButton from "../fields/CustomButton";
import GridContainer from "../fields/GridContainer";
import InputField from "../fields/InputField";

const AddExaminer = ({ data, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: data?.name || "",
        email: data?.email || "",
        institution: data?.institution || "",
        designation: data?.designation || "",
        department: data?.department || "",
        phone: data?.phone || "",
        recommendation: data?.recommendation || "pending",
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div>
            <GridContainer
                elements={[
                    <InputField
                        label={"Name"}
                        initialValue={formData.name}
                        isLocked={false}
                        onChange={(value) => handleInputChange("name", value)}
                    />,                    
                    <InputField
                        label={"Email"}
                        initialValue={formData.email}
                        isLocked={false}
                        onChange={(value) => handleInputChange("email", value)}
                    />,                    
                ]}
            />
            <GridContainer
                elements={[
                    <InputField
                        label={"Institution"}
                        initialValue={formData.institution}
                        isLocked={false}
                        onChange={(value) => handleInputChange("institution", value)}
                    />,
                    <InputField
                        label={"Designation"}
                        initialValue={formData.designation}
                        isLocked={false}
                        onChange={(value) => handleInputChange("designation", value)}
                    />,
                ]}
            />
            <GridContainer
                elements={[
                    <InputField
                        label={"Department"}
                        initialValue={formData.department}
                        isLocked={false}
                        onChange={(value) => handleInputChange("department", value)}
                    />,
                    <InputField
                        label={"Phone"}
                        initialValue={formData.phone}
                        isLocked={false}
                        onChange={(value) => handleInputChange("phone", value)}
                    />,
                ]}
            />
            <GridContainer
                elements={[
                    <></>,
                    <></>,
                    <CustomButton
                        text={"Add Examiner"}
                        onClick={() => onSubmit(formData)}
                    />,
                ]}
            />
        </div>
    );
};

export default AddExaminer;
