import React, { useEffect, useState } from "react";
import InputSuggestions from "../../fields/InputSuggestions";
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
import { customFetch } from "../../../../api/base";
import { toast } from "react-toastify";

const Student = ({ formData }) => {
  const [body, setBody] = useState({});
  const [lock, setLock] = useState(formData?.locks?.student);
  const [isLoaded, setIsLoaded] = useState(true);
  const location = useLocation();
  const { setLoading } = useLoading();
  const [showPublication, setShowPublication] = useState(false);
  const [temp, setTemp] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setBody({
      sci: formData.sci,
      non_sci: formData.non_sci,
      patents: formData.patents,
      books: formData.books,
      national: formData.national,
      international: formData.international,
    });
    setLock(formData?.locks?.student);
    if (formData.publication_count > 0 || formData.patents.length > 0) {
      setBody((prev) => ({
        ...prev,
        publication_under_report: true,
      }));
      setShowPublication(true);
    }
    setIsLoaded(true);
  }, []);

  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const removePublication = (id, type) => {
    const tt = {
      publications: [],
      patents: [],
    };
    if (type === "patents") {
      tt.patents.push(id);
    } else {
      tt.publications.push(id);
    }
    setLoading(true);
    customFetch(baseURL + location.pathname + "/unlink", "POST", tt)
      .then((data) => {
        if (data && data.success) {
          customFetch(baseURL + location.pathname, "GET").then((data) => {
            if (data && data.success) {
              setBody(data.response);
              setLoading(false);
              closeModal();
            }
          });
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Error in linking publications: " + error);
      });
  };

  const submitPublication = (data) => {
    // setBody((prev) => ({
    //     ...prev,
    //     ...temp,
    // }));
    let tt = {
      publications: [],
      patents: [],
    };

    Object.keys(temp).forEach((type) => {
      console.log("type", type);
      const selectedIds = temp[type];
      console.log("selectedIds", selectedIds);

      selectedIds.forEach((id) => {
        const targetType = type !== "patents" ? "publications" : "patents"; // Use targetType instead of modifying type
        console.log("id", id.id);
        tt[targetType].push(id.id);
      });
    });
    setLoading(true);
    customFetch(baseURL + location.pathname + "/link", "POST", tt)
      .then((data) => {
        if (data && data.success) {
          customFetch(baseURL + location.pathname, "GET").then((data) => {
            if (data && data.success) {
              let formdata=data.response;
              setBody((prev) => ({
                ...prev,
                sci:formdata.sci,
                non_sci:formdata.non_sci,
                patents:formdata.patents,
                books:formdata.books,
                national:formdata.national,
                international:formdata.international
              }));
              setLoading(false);
              closeModal();
            }
          });
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Error in linking publications: " + error);
      });
  };

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
                initialValue={formData.teaching_work}
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
                initialValue={body.publication_under_report ? "Yes" : "No"}
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

          {(showPublication === "true" ||
            showPublication === true) && (
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
                />
                {formData?.role === "student" && !lock && (
                  <GridContainer
                    elements={[
                      <>
                        <h1 style={{ fontSize: "24px", textAlign: "left" }}>
                          Publications
                        </h1>
                      </>,
                      <></>,
                      <CustomButton
                        text="Add Publications"
                        onClick={() => {
                          openModal();
                        }}
                      />,
                    ]}
                  />
                )}
                <GridContainer
                  elements={[
                    <ShowPublications
                      formData={body}
                      enableEdit={!lock}
                      enableDelete={!lock}
                      onDelete={removePublication}
                    />,
                  ]}
                  space={3}
                />
              </>
            )}
          <GridContainer
            elements={[
              <FileUploadField
                label={"Upload PDF"}
                onChange={(file) => {
                  setFiles([{ key: "presentation_pdf", file }]);
                }}
                 isLocked={lock}
                initialValue={formData.presentation_pdf}
              />,
            ]}
          />
          <CustomModal
            isOpen={open}
            onClose={closeModal}
            title={"Add Publication"}
            minHeight="200px"
            maxHeight="600px"
            minWidth="650px"
            maxWidth="700px"
            closeOnOutsideClick={false}
          >
           
            <ShowPublications
              formData={formData.student_publications}
              enableSelect={true}
              enableSubmit={true}
              onSelect={updateValue}
              onSubmit={submitPublication}
            />
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
                  submitForm(body, location, setLoading, files.length > 0 ? files : null);
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
