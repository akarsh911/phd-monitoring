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
import { toast } from "react-toastify";

const Supervisor = ({ formData }) => {
  const [lock, setLock] = useState(formData.locks?.supervisor);
  const [body, setBody] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const [greater, setGreater] = useState(true);
  const [externalMembers, setExternalMembers] = useState([]);

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

    // Initialize external members (can be loaded from formData if available)
    setExternalMembers([]);
    setIsLoaded(true);
  }, [formData]);

  const handleAddExternalMember = () => {
    if (externalMembers.length >= 3) {
      toast.error("You can only add maximum 3 external members");
      return;
    }
    setExternalMembers([
      ...externalMembers,
      { name: "", email: "", phone: "", college: "" },
    ]);
  };

  const handleExternalMemberChange = (index, field, value) => {
    const updatedMembers = [...externalMembers];
    updatedMembers[index][field] = value;
    setExternalMembers(updatedMembers);
  };

  const handleRemoveExternalMember = (index) => {
    const updatedMembers = externalMembers.filter((_, i) => i !== index);
    setExternalMembers(updatedMembers);
  };

  return (
    <>
      {isLoaded && formData && (
        <>
          <p>List of nominees of the DoRDC in cognate area from the institute</p>
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
                    // body={{ department_id: formData.department_id }}
                    lock={lock}
                  />,
                  <InputSuggestion
                    apiUrl={apiURL}
                    showLabel={false}
                    initialValue={formData.nominee_cognates[1]?.name}
                    onSelect={(value) => {
                      body.nominee_cognates[1] = value.id;
                    }}
                    // body={{ department_id: formData.department_id }}
                    lock={lock}
                  />,
                  <InputSuggestion
                    apiUrl={apiURL}
                    showLabel={false}
                    initialValue={formData.nominee_cognates[2]?.name}
                    onSelect={(value) => {
                      body.nominee_cognates[2] = value.id;
                    }}
                    // body={{ department_id: formData.department_id }}
                    lock={lock}
                  />,
                ]}
              />
            </>
          )}

                    <p>List of external members recommended by Supervisor</p>
          {false && externalMembers.length > 0 ? (
            <>
              <GridContainer
                elements={[
                  <TableComponent
                    data={externalMembers}
                    keys={["name", "email", "phone", "college"]}
                    titles={["Name", "Email", "Phone", "College"]}
                  />,
                ]}
                space={3}
              />
            </>
          ) : (
            <>
  
              <GridContainer
                elements={[
                  <></>,
                  <></>,
                  <>
                    {(
                      <CustomButton
                        text="+ Add External Member"
                        onClick={handleAddExternalMember}
                      />
                    )}
                  </>,
                ]}
              />

              {externalMembers.map((member, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <GridContainer
                    elements={[
                      <p style={{ fontWeight: "bold" }}>
                        External Member {index + 1}
                      </p>,
                      <></>,
                      <>
                        {!lock && (
                          <CustomButton
                            text="Remove"
                            onClick={() => handleRemoveExternalMember(index)}
                          />
                        )}
                      </>,
                    ]}
                  />
                  <GridContainer
                    elements={[
                      <InputField
                        label="Name"
                        initialValue={member.name}
                        isLocked={lock}
                        onChange={(value) =>
                          handleExternalMemberChange(index, "name", value)
                        }
                      />,
                      <InputField
                        label="Email"
                        initialValue={member.email}
                        isLocked={lock}
                        onChange={(value) =>
                          handleExternalMemberChange(index, "email", value)
                        }
                      />,
                    ]}
                  />
                  <GridContainer
                    elements={[
                      <InputField
                        label="Phone"
                        initialValue={member.phone}
                        isLocked={lock}
                        onChange={(value) =>
                          handleExternalMemberChange(index, "phone", value)
                        }
                      />,
                      <InputField
                        label="College"
                        initialValue={member.college}
                        isLocked={lock}
                        onChange={(value) =>
                          handleExternalMemberChange(index, "college", value)
                        }
                      />,
                    ]}
                  />
                </div>
              ))}
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
