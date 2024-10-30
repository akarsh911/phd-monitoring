import { useEffect, useState } from "react";
import { formatDate } from "../../../../utils/timeParse";
import GridContainer from "../../fields/GridContainer";
import InputField from "../../fields/InputField";
import InputSuggestion from "../../fields/InoutSuggestions";
import DropdownField from "../../fields/DropdownField";
import CustomButton from "../../fields/CustomButton";
import { submitForm } from "../../../../api/form";
import { useLocation } from "react-router-dom";
import { useLoading } from "../../../../context/LoadingContext";
import { baseURL } from "../../../../api/urls";
import Recommendation from "../../layouts/Recommendation";
import { toast } from "react-toastify";
import TableComponent from "../../table/TableComponent";

const Hod = ({ formData }) => {
  const [lock, setLock] = useState(formData.locks?.hod);
  const [body, setBody] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const location = useLocation();
  const { setLoading } = useLoading();

  const apiURL = baseURL + "/suggestions/faculty";

  useEffect(() => {
    setLock(formData.locks?.hod);
    let cognates = formData.chairman_experts?.map((item) => {
      return item.faculty_code;
    });
    if (!cognates || cognates.length === 0 || cognates[0] === null) {
      cognates = [-1];
    }
    
    setBody({
      approval: formData.approvals.hod,
      comments: formData.comments.hod,
      chairman_experts: cognates,
    });
    setIsLoaded(true);
  }, [formData]);

  const onUpdateApproval = (data) => {
    console.log(data);
    setBody((prevBody) => ({
      ...prevBody,
      approval: data.approval,
      comments: data.comments,
    }));
    console.log(body);
  };
  const handleAddExpert = () => {
    if(body.chairman_experts.length>=2)
        toast.error("You can only add max 2 experts");
    else
        setBody((prevBody) => ({
            ...prevBody, 
            chairman_experts: [...prevBody.chairman_experts, ""],}));
  }
  return (
    <>
      {isLoaded && formData && (
        <>
          <Recommendation
            formData={formData}
            role="hod"
            allowRejection={false}
            moreFields={true}
            handleRecommendationChange={onUpdateApproval}
          ></Recommendation>
          {body.approval && (
            <>
            
            {lock && formData.chairman_experts ?(<>
                <GridContainer
                elements={[
                  <p>
                    Expert(s) recommended by chairman board of the studies of
                    concerned department in cognate area of department:{" "}
                  </p>,  
                ]} space={3}
              />
                <GridContainer elements={[
                <TableComponent
                    data={formData.chairman_experts}
                    keys={["name", "department", "designation"]}
                    titles={["Name", "Department", "Designation"]}
                    />,
                ]} space={3}/>
            </>):(<> 
                <GridContainer
                elements={[
                  <p>
                    Expert(s) recommended by chairman board of the studies of
                    concerned department in cognate area of department:{" "}
                  </p>,
                  <></>,
                  <>{!lock && ( <CustomButton text="Add Expert +" onClick={handleAddExpert}></CustomButton>)}</>
                 
                ]}
              />
                <GridContainer
                    elements={body.chairman_experts.map((expert, index) => (
                    <InputSuggestion
                        apiUrl={apiURL}
                        label={`Expert ${index + 1}`}
                        initialValue={formData.chairman_experts[index]?.name}
                        onSelect={(value) => {
                        body.chairman_experts[index] = value.id;
                        }}
                        lock={lock}
                        body={{ department_id: formData.department_id }}
                    />
                    ))}
                /></>)}
            
                
            </>
          )}
           {
            formData.role === "hod" && !lock && (
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

export default Hod;
