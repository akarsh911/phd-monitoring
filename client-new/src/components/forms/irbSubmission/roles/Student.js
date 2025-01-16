import React, { useEffect, useState } from "react";
import InputSuggestions from "../../fields/InputSuggestions";
import { baseURL } from "../../../../api/urls";
import GridContainer from "../../fields/GridContainer";
import InputField from "../../fields/InputField";
import { formatDate } from "../../../../utils/timeParse";
import TableComponent from "../../table/TableComponent";
import CustomButton from "../../fields/CustomButton";

import { useLocation } from "react-router-dom";
import { submitForm } from "../../../../api/form";
import { useLoading } from "../../../../context/LoadingContext";
import FileUploadField from "../../fields/FileUploadField";
import DateField from "../../fields/DateField";

const Student = ({ formData }) => {
  const apiUrl_suggestion = baseURL + "/suggestions/faculty";
  const apiUrl_broad_suggestion = baseURL + "/suggestions/specialization";
  const [body, setBody] = useState({});
  const [files, setFiles] = useState([]);
  const [lock, setLock] = useState(formData.locks?.student);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const { setLoading } = useLoading();

  useEffect(() => {
    let objectives =
      formData.form_type === "revised"
        ? formData.objectives.revised
        : formData.objectives.draft;

    let title =
      formData.form_type === "revised"
        ? formData.revised_phd_title
        : formData.phd_title;

    if (!objectives || objectives.length === 0) {
      objectives = [""];
    }
    setBody({
      title: title,
      address: formData.address,
      revised_objectives:
        formData.objectives.revised.length > 0
          ? formData.objectives.revised
          : [""],
      draft_objectives:
        formData.objectives.draft.length > 0 ? formData.objectives.draft : [""],
      objectives: objectives,
      date_of_irb: formData.date_of_irb,
    });
    setLock(formData.locks?.student);
    setIsLoaded(true);
  }, [formData]);

  const addObjective = () => {
    setBody((prevBody) => ({
      ...prevBody,
      objectives: [...prevBody.objectives, ""],
    }));
    if (formData.form_type === "revised") {
      setBody((prevBody) => ({
        ...prevBody,
        revised_objectives: [...prevBody.revised_objectives, ""],
      }));
    } else {
      setBody((prevBody) => ({
        ...prevBody,
        draft_objectives: [...prevBody.draft_objectives, ""],
      }));
    }
  };
  return (
    <div>
      {isLoaded && formData && (
        <>
          <GridContainer
            elements={[
              <InputField
                label="Roll Number"
                initialValue={formData.roll_no}
                isLocked={true}
              />,
              <InputField
                label="Name"
                initialValue={formData.name}
                isLocked={true}
              />,
            ]}
          />

          <GridContainer
            elements={[
              <InputField
                label="Date Of Admission"
                initialValue={formatDate(formData.date_of_registration)}
                isLocked={true}
              />,
              <InputField
                label="Department"
                initialValue={formData.department}
                isLocked={true}
              />,
              <InputField
                label="CGPA"
                initialValue={formData.cgpa}
                isLocked={true}
              />,
            ]}
          />

          <GridContainer
            elements={[
              <InputField
                label="Email"
                initialValue={formData.email}
                isLocked={true}
              />,
              <InputField
                label="Mobile Number"
                initialValue={formData.phone}
                isLocked={true}
              />,
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
              <p>Objectives</p>,
              <></>,
              <>
                {!lock && formData.form_type === "draft" && (
                  <CustomButton text={"+ Add"} onClick={addObjective} />
                )}
              </>,
            ]}
          />

          <GridContainer
            elements={body.draft_objectives.map((objective, index) => {
              return (
                <InputField
                  initialValue={objective}
                  isLocked={lock || formData.form_type === "revised"}
                  onChange={(value) => {
                    body.objectives[index] = value;
                    body.draft_objectives[index] = value;
                  }}
                  showLabel={false}
                />
              );
            })}
          />
          <GridContainer
            elements={[
              <FileUploadField
                label={"IRB PDF File"}
                initialValue={formData.irb_pdf}
                isLocked={lock || formData.form_type === "revised"}
                onChange={(file) => {
                  setFiles([{ key: "irb_pdf", file }]);
                }}
              />,
            ]}
          />
          {formData.form_type === "revised" && (
            <>
              <GridContainer
                elements={[
                  <InputField
                    initialValue={formData.revised_phd_title}
                    label={"Revised Title of Phd Thesis"}
                    isLocked={lock || formData.form_type === "draft"}
                    onChange={(value) => {
                      body.title = value;
                    }}
                  />,
                ]}
                space={2}
              />
              <GridContainer
                elements={[
                  <DateField
                    label={"Date of IRB"}
                    initialValue={formatDate(formData.date_of_irb)}
                    hint={"Select Date..."}
                    isLocked={lock}
                    onChange={(value) => {
                      body.date_of_irb = value;
                    }}
                  />,
                ]}
                space={2}
              />

              <GridContainer
                elements={[
                  <p>Revised Objectives</p>,
                  <></>,
                  <>
                    {!lock && formData.form_type === "revised" && (
                      <CustomButton text={"+ Add"} onClick={addObjective} />
                    )}
                  </>,
                ]}
              />

              <GridContainer
                elements={body.revised_objectives.map((objective, index) => {
                  return (
                    <InputField
                      initialValue={objective}
                      isLocked={lock || formData.form_type === "draft"}
                      onChange={(value) => {
                        body.objectives[index] = value;
                        body.revised_objectives[index] = value;
                      }}
                      showLabel={false}
                    />
                  );
                })}
              />
              <GridContainer
                elements={[
                  <FileUploadField
                    label={"Revised IRB PDF File"}
                    initialValue={formData.revised_irb_pdf}
                    isLocked={lock}
                    onChange={(file) => {
                      setFiles([{ key: "irb_pdf", file }]);
                    }}
                  />,
                ]}
              />
            </>
          )}
          {!lock && formData.role === "student" && (
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
    </div>
  );
};

export default Student;
