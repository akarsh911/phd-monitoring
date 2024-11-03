import React, { useEffect, useState } from "react";
import InputSuggestions from "../../fields/InoutSuggestions";
import { baseURL } from "../../../../api/urls";
import GridContainer from "../../fields/GridContainer";
import InputField from "../../fields/InputField";
import { formatDate } from "../../../../utils/timeParse";
import TableComponent from "../../table/TableComponent";
import CustomButton from "../../fields/CustomButton";
import DropdownField from "../../fields/DropdownField";
import FileUploadField from "../../fields/FileUploadField";
import { useLocation } from "react-router-dom";
import { submitForm } from "../../../../api/form";
import { useLoading } from "../../../../context/LoadingContext";
import ShowPublications from "../../../publications/ShowPublications";
import CustomModal from "../../modal/CustomModal";

const Student = ({ formData }) => {
  const [body, setBody] = useState({});
  const [lock, setLock] = useState(formData?.locks?.student);
  const [isLoaded, setIsLoaded] = useState(true);
  const location = useLocation();
  const { setLoading } = useLoading();
  const [showPublication, setShowPublication] = useState(false);
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    setBody({});
    setLock(formData?.locks?.student);
    setIsLoaded(true);
  }, []);

  const [open, setOpen] = useState(false);
  const openModal = () => {
      setOpen(true);
  }
  const closeModal = () => {
      setOpen(false);
  }

  const submitPublication = (data) => {
        setBody((prev) => ({
            ...prev,
            ...temp,
        }));
   
  }
  const updateValue = (selectedRows) => {
    const tt = {};

    Object.keys(selectedRows).forEach((type) => {
        // Get all selected IDs for the type
        const selectedIds = Object.keys(selectedRows[type]).filter(
            (id) => selectedRows[type][id] === true
        );

        selectedIds.forEach((id) => {
            if (!tt[type]) {
                tt[type] = [];
            }

            // Find the publication object with a matching id
            const publication = formData.student_publications[type].find(
                (pub) => pub.id === parseInt(id, 10)
            );

            if (publication) {
                tt[type].push(publication);
            }
        });
    });

    setTemp(tt);
};
useEffect(() => {
    console.log(body);
}, [body]);

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
                label="Period of Report"
                initialValue={formData.period_of_report}
                isLocked={true}
              />,
            ]}
          />

          <GridContainer
            elements={[
              <InputField
                label="Title of Phd Thesis"
                initialValue={formData.phd_title}
                isLocked={true}
              />,
            ]}
            space={2}
          />

          <GridContainer
            elements={[
              <InputField
                label="Extenstion Availed"
                initialValue={formData.extention_availed ? "Yes" : "No"}
                isLocked={true}
              />,
              <DropdownField
                label="Teaching Work Done"
                options={[
                  { title: "UG", value: "UG" },
                  { title: "PG", value: "PG" },
                  { title: "UG & PG (Both)", value: "Both" },
                  { title: "Not Applicable", value: "None" },
                ]}
                isLocked={lock}
                onChange={(value) => {
                  setBody((prev) => ({
                    ...prev,
                    teaching_work: value,
                  }));
                }}
              />,
            ]}
          />

          <GridContainer
            elements={[
              <DropdownField
                label="Publication During the Period Under Report"
                options={[
                  { title: "Yes", value: true },
                  { title: "No", value: false },
                ]}
                isLocked={lock}
                onChange={(value) => {
                  setBody((prev) => ({
                    ...prev,
                    publication_under_report: value,
                  }));
                  setShowPublication(value);
                }}
              />,
            ]}
            space={2}
          />

          {showPublication === "true" && (
            <>
             
              <GridContainer
                elements={[
                  <InputField
                    label="No. of Papers in SCI/SCIE/SSCI/ABCD/AHCI Journal"
                    initialValue={formData.no_paper_sci_journal}
                    isLocked={lock}
                    onChange={(value) => {
                      setBody((prev) => ({
                        ...prev,
                        no_paper_sci_journal: value,
                      }));
                    }}
                  />,
                ]}
                space={2}
              />
              <GridContainer
                elements={[
                  <InputField
                    label="No. of Papers in Scopus Journal"
                    initialValue={formData.no_paper_scopus_journal}
                    isLocked={lock}
                    onChange={(value) => {
                      setBody((prev) => ({
                        ...prev,
                        no_paper_scopus_journal: value,
                      }));
                    }}
                  />,
                ]}
                space={2}
              />
              <GridContainer
                elements={[
                  <InputField
                    label="No. of Papers in Conferences Under Report"
                    initialValue={formData.no_paper_conference}
                    isLocked={lock}
                    onChange={(value) => {
                      setBody((prev) => ({
                        ...prev,
                        no_paper_conference: value,
                      }));
                    }}
                  />,
                ]}
                space={2}
              />
              <GridContainer
                elements={[
                  <InputField
                    label="Total of Papers in SCI/SCIE/SSCI/ABCD/AHCI Journal"
                    initialValue={formData.total_paper_sci_journal}
                    isLocked={true}
                    onChange={(value) => {
                      setBody((prev) => ({
                        ...prev,
                        total_paper_sci_journal: value,
                      }));
                    }}
                  />,
                ]}
                space={2}
              /> {formData?.role === "student" && !lock && (
                <GridContainer
                  elements={[
                    <>
                      <h1 style={{ fontSize: "24px", textAlign: "left" }}>
                        Publications
                      </h1>
                    </>,
                    <></>,
                    <CustomButton text="Add Publications" onClick={() => {openModal()}} />,
                  ]}
                />
              )}
              <GridContainer
                elements={[<ShowPublications formData={body} />]}
                space={3}
              />
            </>
          )}
          <GridContainer
            elements={[
              <FileUploadField
                label={"Upload PDF"}
                onChange={(value) => {
                  setBody((prev) => ({
                    ...prev,
                    presentation_pdf: value,
                  }));
                }}
              />,
            ]}
          />
              <CustomModal isOpen={open} onClose={closeModal} title={'Add Publication'}
                    minHeight='200px' maxHeight='600px' minWidth='650px' maxWidth='700px' closeOnOutsideClick={false}>
                        <ShowPublications formData={formData.student_publications} enableSelect={true} enableSubmit={true} onSelect={updateValue} onSubmit={submitPublication}/>
              </CustomModal>
        </>    
      )}
      {formData?.role === "student" && !lock && (
        <>
          <GridContainer
            elements={[
              <CustomButton
                text="Submit"
                onClick={() => {
                  submitForm(body, location, setLoading);
                }}
              />,
            ]}
          />
        </>
      )}
    </div>
  );
};

export default Student;
