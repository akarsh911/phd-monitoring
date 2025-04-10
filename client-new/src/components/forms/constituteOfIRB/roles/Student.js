import { useEffect, useState } from "react";
import { formatDate } from "../../../../utils/timeParse";
import GridContainer from "../../fields/GridContainer";
import InputField from "../../fields/InputField";
import DropdownField from "../../fields/DropdownField";
import CustomButton from "../../fields/CustomButton";
import { submitForm } from "../../../../api/form";
import { useLocation } from "react-router-dom";
import { useLoading } from "../../../../context/LoadingContext";
import FileUploadField from "../../fields/FileUploadField";

const Student = ({ formData }) => {
  const [lock, setLock] = useState(formData.locks?.student);
  const [body, setBody] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
   const [files, setFiles] = useState([]);
  const location = useLocation();
  const { setLoading } = useLoading();

  useEffect(() => {
  

    let title = (formData.form_type = "");
    setLock(formData.locks?.student);
    setBody({
      cgpa: formData.cgpa,
      address: formData.address,
      gender: formData.gender,
      title: formData.phd_title,
      objectives: formData.objectives?formData.objectives:[],
    });
    setIsLoaded(true);
  }, [formData]);
  const addObjective = () => {
    setBody((prevBody) => ({
      ...prevBody,
      objectives: [...prevBody.objectives, ""],
    }));

   
  };
  const onUpdateCGPA = (value) => {
    body.cgpa = value;
  };

  return (
    <>
      {isLoaded && formData && (
        <>
          <GridContainer
            elements={[
              <InputField
                label={"Date"}
                initialValue={formatDate(formData.created_at)}
                isLocked={true}
              />,
            ]}
          />

          <GridContainer
            elements={[
              <InputField
                label={"Roll Number"}
                initialValue={formData.roll_no}
                isLocked={true}
              />,
              <InputField
                label={"Name"}
                initialValue={formData.name}
                isLocked={true}
              />,
              <DropdownField
                label={"Gender"}
                initialValue={formData.gender}
                options={[
                  { title: "Male", value: "Male" },
                  { title: "Female", value: "Female" },
                ]}
                isLocked={lock}
                onChange={(value) => {
                  console.log("hi", body);
                  body.gender = value;
                }}
              />,
            ]}
          />
           <GridContainer
            elements={[
              <InputField
                initialValue={formData.address}
                label={"Address of Correspondence"}
                isLocked={lock}
                onChange={(value) => {
                  body.address = value;
                }}
              />,
            ]}
            space={2}
          />
          <GridContainer
            elements={[
              <InputField
                initialValue={formData.phd_title}
                label={"Title of Phd Thesis"}
                isLocked={lock}
                onChange={(value) => {
                  console.log("hi", body);
                  body.title = value;
                }}
              />,
            ]}
            space={2}
          />
          <GridContainer
            elements={[
              <InputField
                label={"Date of Admission"}
                initialValue={formatDate(formData.date_of_registration)}
                isLocked={true}
              />,
              <InputField
                label={"Department"}
                initialValue={formData.department}
                isLocked={true}
              />,
              <InputField
                label={"CGPA"}
                initialValue={formData.cgpa}
                isLocked={lock}
                onChange={onUpdateCGPA}
              />,
            ]}
          />

          <GridContainer
            elements={[
              <InputField
                label={"Chairman, Board of Studies of the Concerned Department"}
                initialValue={formData.chairman.name}
                isLocked={true}
              />,
            ]}
            space={2}
          />

          <GridContainer
            elements={formData.supervisors?.map((supervisor, index) => (
              <InputField
                label={`Supervisor ${index + 1}`}
                initialValue={supervisor?.name}
                isLocked={true}
              />
            ))}
          />

          <GridContainer
            label={[<p>Objectives of Research</p>]}
            elements={[
              <></>,
              <></>,
              <>
                {!lock && (
                  <CustomButton text={"+ Add"} onClick={addObjective} />
                )}
              </>,
            ]}
          />

          <GridContainer
            elements={body.objectives?.map((objective, index) => (
          
                <InputField
                  initialValue={objective}
                  isLocked={lock}
                  onChange={(value) => {
       
                    body.objectives[index] = value;
                  }}
                  hint={`Enter Objective ${index+1} Here`}
                  showLabel={false}
                />
            
            ))}
            space={1}
            
          />
          <GridContainer
          label="Upload IRB PDF File"
            elements={[
              <FileUploadField
                initialValue={formData.irb_pdf}
                showLabel={false}
                isLocked={lock || formData.form_type === "revised"}
                onChange={(file) => {
                  setFiles([{ key: "irb_pdf", file }]);
                }}
              />,
            ]}
          />

          {formData.role === "student" && !lock && (
            <>
             
                   <GridContainer
                elements={[
                  <CustomButton
                    text="Submit"
                    onClick={() => {
                      submitForm(
                        body,
                        location,
                        setLoading,
                        files.length > 0 ? files : null
                      );
                    }}
                  />,
                  
                  
                ]}
              />
            </>
          )}
        </>
      )}
    </>
  );
};
export default Student;
