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
  
  useEffect(() => {
    setLock(formData.locks?.supervisor);
    let cognates = formData.nominee_cognates.map((item) => {
      return item.faculty_code;
    });
    if (!cognates || cognates.length !== 3 || cognates[0] === null) {
      cognates = [-1, -1, -1];
    }

  
    setBody({
      approval: true,
      nominee_cognates: cognates,
     
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
