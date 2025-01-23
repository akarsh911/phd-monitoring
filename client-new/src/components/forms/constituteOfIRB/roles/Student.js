import { useEffect, useState } from "react";
import { formatDate } from "../../../../utils/timeParse";
import GridContainer from "../../fields/GridContainer";
import InputField from "../../fields/InputField";
import DropdownField from "../../fields/DropdownField";
import CustomButton from "../../fields/CustomButton";
import { submitForm } from "../../../../api/form";
import { useLocation } from "react-router-dom";
import { useLoading } from "../../../../context/LoadingContext";

const Student = ({ formData }) => {

  const [lock, setLock] = useState(formData.locks?.student);
  const [body, setBody] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const {setLoading}=useLoading();

  useEffect(() => {
    let objectives =
   [];

  let title =
    formData.form_type ="";
    setLock(formData.locks?.student);
    setBody({
        cgpa: formData.cgpa,
        gender: formData.gender,
        title: title,
        draft_objectives: [""],
        objectives: objectives,
    })
    setIsLoaded(true);
  }, [formData]);
  const addObjective = () => {
    setBody((prevBody) => ({
      ...prevBody,
      objectives: [...prevBody.objectives, ""],
    }));
   
      setBody((prevBody) => ({
        ...prevBody,
        draft_objectives: [...prevBody.draft_objectives, ""],
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
                    {title: "Male", value: "Male"},
                    {title: "Female", value: "Female"}
                ]}
                isLocked={lock}
                onChange={(value) => {console.log("hi",body); body.gender = value}}
             />
            ]}
          />
            <GridContainer
            elements={[
              <InputField
                initialValue={formData.phd_title}
                label={"Title of Phd Thesis"}
                isLocked={lock || formData.form_type === "revised"}
                onChange={(value) => {
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
            elements={[
              <p>Objectives</p>,
              <></>,
              <>
                {!lock && (
                  <CustomButton text={"+ Add"} onClick={addObjective} />
                )}
              </>,
            ]}
            space={2}
          />

          <GridContainer
            elements={body.draft_objectives.map((objective, index) => {
              return (
                <InputField
                  initialValue={objective}
                  isLocked={lock}
                  onChange={(value) => {
                    body.objectives[index] = value;
                    body.draft_objectives[index] = value;
                  }}
                  showLabel={false}
                />
              );
            })}
            space={2}
          />
          {
            formData.role === "student" && !lock && (
                <>
                  <GridContainer elements={[
                    <CustomButton text="Submit" onClick={() => {submitForm(body,location,setLoading)}}/>
                  ]}/>
                </>
            )
          }

        </>
      )}
    </>
  );
};
export default Student;
