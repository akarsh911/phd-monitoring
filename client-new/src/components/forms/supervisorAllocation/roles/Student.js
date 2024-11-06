import React, { useEffect, useState } from "react";
import InputSuggestions from "../../fields/InoutSuggestions";
import { baseURL } from "../../../../api/urls";
import GridContainer from "../../fields/GridContainer";
import InputField from "../../fields/InputField";
import { formatDate } from "../../../../utils/timeParse";
import TableComponent from "../../table/TableComponent";
import CustomButton from "../../fields/CustomButton";

import { useLocation } from "react-router-dom";
import { submitForm } from "../../../../api/form";
import { useLoading } from "../../../../context/LoadingContext";

const Student = ({ formData }) => {
  const apiUrl_suggestion = baseURL + "/suggestions/faculty";
  const apiUrl_broad_suggestion = baseURL + "/suggestions/specialization";
  const [body, setBody] = useState({});
  const [lock, setLock] = useState(formData.locks?.student);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const { setLoading } = useLoading();
  useEffect(() => {
    const prefrences = formData?.prefrences.map(
      (prefrence) => prefrence.faculty_code
    );
    if (prefrences.length < 6) {
      for (let i = prefrences.length; i < 6; i++) prefrences.push(null);
    }
    setBody({
      prefrences: prefrences,
      broad_area_of_research: formData.broad_area_of_research_id,
    });
    setLock(formData.locks?.student);
    setIsLoaded(true);
  }, [formData]);

  const handlePrefrenceSelect = (value, index) => {
    body.prefrences[index] = value.id;
  };

  const handleBroadAreaSelect = (value, index) => {
    body.broad_area_of_research[index] = value;
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

          <GridContainer elements={[<p>Select 3 Broad Areas of Research</p>]} />

          <GridContainer
            elements={[
              <InputSuggestions
                initialValue={formData.broad_area_of_research[0]}
                apiUrl={apiUrl_broad_suggestion}
                onSelect={(value) => handleBroadAreaSelect(value, 0)}
                lock={lock}
                showLabel={false}
              />,
            ]}
            space={2}
          />
          <GridContainer
            elements={[
              <InputSuggestions
                initialValue={formData.broad_area_of_research[1]}
                apiUrl={apiUrl_broad_suggestion}
                onSelect={(value) => handleBroadAreaSelect(value, 1)}
                lock={lock}
                showLabel={false}
              />,
            ]}
            space={2}
          />
          <GridContainer
            elements={[
              <InputSuggestions
                initialValue={formData.broad_area_of_research[2]}
                apiUrl={apiUrl_broad_suggestion}
                onSelect={(value) => handleBroadAreaSelect(value, 2)}
                lock={lock}
                showLabel={false}
              />,
            ]}
            space={2}
          />
        </>
      )}
      {(formData.role === "student" && !lock) ? (
        <>
          <GridContainer
            elements={[<p>Select 6 Tentative Name of Supervisor (in order)</p>]}
            space={2}
          />

          <GridContainer
            elements={[
              <InputSuggestions
                initialValue={formData.prefrences[0]?.name}
                apiUrl={apiUrl_suggestion}
                onSelect={(value) => handlePrefrenceSelect(value, 0)}
                lock={lock}
                label={"Preference 1"}
              />,
              <InputSuggestions
                initialValue={formData.prefrences[1]?.name}
                apiUrl={apiUrl_suggestion}
                onSelect={(value) => handlePrefrenceSelect(value, 1)}
                lock={lock}
                label={"Preference 2"}
              />,
              <InputSuggestions
                initialValue={formData.prefrences[2]?.name}
                apiUrl={apiUrl_suggestion}
                onSelect={(value) => handlePrefrenceSelect(value, 2)}
                lock={lock}
                label={"Preference 3"}
              />,
            ]}
          />

          <GridContainer
            elements={[
              <InputSuggestions
                initialValue={formData.prefrences[3]?.name}
                apiUrl={apiUrl_suggestion}
                onSelect={(value) => handlePrefrenceSelect(value, 3)}
                lock={lock}
                label={"Preference 4"}
              />,
              <InputSuggestions
                initialValue={formData.prefrences[4]?.name}
                apiUrl={apiUrl_suggestion}
                onSelect={(value) => handlePrefrenceSelect(value, 4)}
                lock={lock}
                label={"Preference 5"}
              />,
              <InputSuggestions
                initialValue={formData.prefrences[5]?.name}
                apiUrl={apiUrl_suggestion}
                onSelect={(value) => handlePrefrenceSelect(value, 5)}
                lock={lock}
                label={"Preference 6"}
              />,
            ]}
          />
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
      ) : (
        <>
          <GridContainer elements={[<p>Student Prefrences</p>]} space={2} />
          <GridContainer
            elements={[
              <TableComponent
                data={formData.prefrences}
                keys={["name", "department"]}
                titles={["Supervisor Name", "Department"]}
              />,
            ]}
            space={3}
          />
        </>
      )}
    </div>
  );
};

export default Student;
