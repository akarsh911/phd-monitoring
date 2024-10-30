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

const Dordc = ({ formData }) => {
  const [lock, setLock] = useState(formData.locks?.dordc);
  const [body, setBody] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const location = useLocation();
  const { setLoading } = useLoading();

  

  useEffect(() => {
    setLock(formData.locks?.dordc);
    setBody({
      approval: formData.approvals.dordc,
      comments: formData.comments.dordc,
      cognate_expert: formData.cognate_expert?.faculty_code,
      outside_expert: formData.outside_expert?.id,
    });
    if(formData.role !== "dordc"){
      setLock(true);
    }
    setIsLoaded(true);
  }, [formData]);

  const onUpdateApproval = (data) => {
    setBody((prevBody) => ({
      ...prevBody,
      approval: data.approval,
      comments: data.comments,
    }));
  };

  return (
    <>
      {isLoaded && formData && (
        <>
          <Recommendation
            formData={formData}
            role="dordc"
            allowRejection={false}
            moreFields={true}
            isLocked={lock}
            handleRecommendationChange={onUpdateApproval}
          ></Recommendation>
          {body.approval && (
            <>
             <GridContainer
                elements={[
                  <p>
                   One nominee of the DoRDC  in cognate area from the institute:{" "}
                  </p>,  
                ]} space={3}
              />
                <GridContainer
                    elements={[
                        <DropdownField   options={formData.nominee_cognates?.map((cognate)=>{
                            return {value:cognate?.faculty_code,title:cognate?.name}
                        })  } initialValue={formData.cognate_expert?.name} isLocked={lock} onChange={(value)=>{body.cognate_expert=value;}} />
                    ]}
                />   
                <GridContainer
                    elements={[
                        <p>
                           One expert from the IRB panel of outside experts of concerned 
                           department  to be nominated  by the DoRDC :{" "}
                        </p>,
                    ]} space={3}
                />
                <GridContainer
                    elements={[
                        <DropdownField   options={formData.outside_experts?.map((cognate)=>{
                            return {value:cognate?.id,title:cognate?.name}
                        })  } initialValue={formData.outside_expert?.name} isLocked={lock} onChange={(value)=>{body.outside_expert=value;}} />
                    ]}
                />   

            </>
          )}
           {
            formData.role === "dordc" && !lock && (
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

export default Dordc;
