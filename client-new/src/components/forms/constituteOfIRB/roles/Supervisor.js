import { useEffect, useState } from "react";
import { formatDate } from "../../../../utils/timeParse";
import GridContainer from "../../fields/GridContainer";
import InputField from "../../fields/InputField";
import InputSuggestion from "../../fields/InputSuggestions";
import DropdownField from "../../fields/DropdownField";
import CustomButton from "../../fields/CustomButton";
import { submitForm } from "../../../../api/form";
import { useLocation } from "react-router-dom";
import { useLoading } from "../../../../context/LoadingContext";
import { baseURL } from "../../../../api/urls";
import TableComponent from "../../table/TableComponent";

const Supervisor = ({ formData }) => {
  const [lock, setLock] = useState(formData.locks?.supervisor);
  const [body, setBody] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const [greater, setGreater] = useState(true);

  const location = useLocation();
  const { setLoading } = useLoading();
  const apiURL = baseURL + "/suggestions/faculty";
  const apiURL2 = baseURL + "/suggestions/outside-expert";
  useEffect(() => {
    setLock(formData.locks?.supervisor);
    let cognates = formData.nominee_cognates.map((item) => {
      return item.faculty_code;
    });
    if (!cognates || cognates.length !== 3 || cognates[0] === null) {
      cognates = [-1, -1, -1];
    }

    let outside_experts = formData.outside_experts.map((item) => {
      return item.id;
    });
    if (
      !outside_experts ||
      outside_experts.length !== 3 ||
      outside_experts[0] === null
    ) {
      outside_experts = [-1, -1, -1];
    }
    setBody({
      approval: true,
      nominee_cognates: cognates,
      outside_experts: outside_experts,
    });
    setIsLoaded(true);
  }, [formData]);

  return (
    <>
      {isLoaded && formData && (
        <>
          <p>List of nominee of the DoRDC in cognate area from the institute</p>
          {greater && lock && formData.nominee_cognates.length === 3 ? (
            <>
              <GridContainer
                elements={[
                  <TableComponent
                    data={formData.nominee_cognates}
                    keys={["name", "department", "designation"]}
                    titles={["Name", "Department", "Designation"]}
                  />,
                ]}
                space={3}
              />
            </>
          ) : (
            <>
              <GridContainer
                elements={[
                  <InputSuggestion
                    apiUrl={apiURL}
                    showLabel={false}
                    initialValue={formData.nominee_cognates[0]?.name}
                    onSelect={(value) => {
                      body.nominee_cognates[0] = value.id;
                    }}
                    body={{ department_id: formData.department_id }}
                    lock={lock}
                  />,
                  <InputSuggestion
                    apiUrl={apiURL}
                    showLabel={false}
                    initialValue={formData.nominee_cognates[1]?.name}
                    onSelect={(value) => {
                      body.nominee_cognates[1] = value.id;
                    }}
                    body={{ department_id: formData.department_id }}
                    lock={lock}
                  />,
                  <InputSuggestion
                    apiUrl={apiURL}
                    showLabel={false}
                    initialValue={formData.nominee_cognates[2]?.name}
                    onSelect={(value) => {
                      body.nominee_cognates[2] = value.id;
                    }}
                    body={{ department_id: formData.department_id }}
                    lock={lock}
                  />,
                ]}
              />
            </>
          )}

          <p>List of 3 outside experts proposed by the Supervisor</p>
          {greater && lock && formData.outside_experts.length === 3 ? (
            <>
              <GridContainer
                elements={[
                  <TableComponent
                    data={formData.outside_experts}
                    keys={["name", "institution", "department", "designation"]}
                    titles={[
                      "Name",
                      "Institution",
                      "Department",
                      "Designation",
                    ]}
                  />,
                ]}
                space={3}
              />
            </>
          ) : (
            <>
              <GridContainer
                elements={[
                  <InputSuggestion
                    apiUrl={apiURL2}
                    showLabel={false}
                    initialValue={formData.outside_experts[0]?.name}
                    onSelect={(value) => {
                      body.outside_experts[0] = value.id;
                    }}
                    lock={lock}
                  />,
                  <InputSuggestion
                    apiUrl={apiURL2}
                    showLabel={false}
                    initialValue={formData.outside_experts[1]?.name}
                    onSelect={(value) => {
                      body.outside_experts[1] = value.id;
                    }}
                    lock={lock}
                  />,
                  <InputSuggestion
                    apiUrl={apiURL2}
                    showLabel={false}
                    initialValue={formData.outside_experts[2]?.name}
                    onSelect={(value) => {
                      body.outside_experts[2] = value.id;
                    }}
                    lock={lock}
                  />,
                ]}
              />
            </>
          )}
          {formData.role === "faculty" && !lock && (
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
        </>
      )}
    </>
  );
};

export default Supervisor;
