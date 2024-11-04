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
import { customFetch } from "../../../../api/base";
import { toast } from "react-toastify";
import DateField from "../../fields/DateField";
import { generateReportPeriods } from "../../../../utils/semester";

const Student = ({ formData }) => {
  const [body, setBody] = useState({});
  const [lock, setLock] = useState(formData?.locks?.student);
  const [isLoaded, setIsLoaded] = useState(true);
  const location = useLocation();
  const { setLoading } = useLoading();
  const [showPublication, setShowPublication] = useState(false);
  const [temp, setTemp] = useState([]);
  const [files, setFiles] = useState([]);

  const [prevOff,setPrevOff]= useState(null);

  useEffect(() => {

    if(formData.previous_off?.length>0){
      let prev=formData.previous_off[formData.previous_off.length-1].semester_off_required
      setPrevOff(prev);
    }
    setLock(formData?.locks?.student);
    setIsLoaded(true);
  }, []);




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
                label="Date of Admission"
                initialValue={formatDate(formData.date_of_registration)}
                isLocked={true}
              />,
              <InputField
                label="Department"
                initialValue={formData.department}
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
                label="Phone Number"
                initialValue={formData.phone}
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


          <GridContainer elements={[
              <InputField
              label="Semester Off (if any earlier)"
              initialValue={prevOff?prevOff:"N/A"}
              isLocked={true}
            />,
            <>
            {prevOff && (    
              <FileUploadField
            label={"Attach Previous Approval"}
            onChange={(file) => {
              setFiles([{ key: "previous_approval_pdf", file }]);
            }}
            isLocked={prevOff && lock}
            initialValue={formData.previous_approval_pdf}
          />)}
            </>
          ]} />



        
        

      
           <GridContainer elements={[
             <InputField
             label="Reason for Semester Off"
             initialValue={formData.reason}
             isLocked={lock}
             onChange={(value)=>{
              setBody((prev) => ({
                ...prev,
                reason: value,
              }));
            }}
           />
           ]} space={2}/>
        </>


      )}
      {formData?.role === "student" && !lock && (
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
    </div>
  );
};

export default Student;
