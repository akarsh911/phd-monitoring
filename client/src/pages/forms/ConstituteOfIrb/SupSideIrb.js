import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SupSideIrb.css";
import "./ConstituteOfIrb.css";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../../../config";

const SupSideIrb = ({
  formData,
  handleNomineeChange,
  handleRecommendationChange,
}) => {
  const [searchQuery, setSearchQuery] = useState(["", "", ""]);
  const [selectedNominee, setSelectedNominee] = useState([{}, {}, {}]);
  const [comments, setComments] = useState(formData.supervisor_comments || "");

  const [isEditable, setIsEditable] = useState(!formData.supervisor_lock);
  const params = useParams();

  // useEffect(() => {
  //   setIsEditable(!formData.supervisor_lock);
  //   if (formData.supervisor_lock) {
  //     setSelectedNominee(formData.nomineeCognates || []);
  //   } else {
  //     var data;
  //     if (formData.nomineeCognates) data = formData.nomineeCognates;
  //     else data = [{}, {}, {}];

  //     setSelectedNominee(data);
  //   }
  // }, [formData.supervisor_lock, formData.nominees, formData.nomineeCognates]);
  

  const handleSearchChange = (index, value) => {
    const newSearchQuery = [...searchQuery];
    newSearchQuery[index] = value;
    setSearchQuery(newSearchQuery);
  };
  useEffect(() => {
    setIsEditable(!formData.supervisor_lock);
    if (formData.supervisor_lock) {
      setSelectedNominee(formData.nominees || [{},{},{}]);
    } else {
      var data = [{}, {}, {}] ;
      // console.log("formData.nominees : " + JSON.stringify(formData.nominees));
      if (formData.nominees) {
        if(formData.nominees[0])
          {
            data = formData.nominees
            setSelectedNominee(data);
          }
      }
      else data = [{}, {}, {}];
      
      // Check if selectedNominee is empty before setting it
      // if (selectedNominee.every(nominee => Object.keys(nominee).length === 0)) {
        console.log("selectedNominee : " + JSON.stringify(selectedNominee));
        // setSelectedNominee(data);
      
    }
  }, []);
  
  
  const updatePrefs = async () => {
    if (selectedNominee.length < 3) {
      toast.error("Please select 3 nominees");
      return;
    }
    if (comments === "") {
      toast.error("Please enter comments");
      return;
    }
    if (formData.supervisorRecommendation === "awaited") {
      toast.error("Please select recommendation");
      return;
    }
    try {
      const response = await fetch(
        `${SERVER_URL}/forms/irb/constitutuion/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            supervisorRecommendation: formData.supervisorRecommendation,
            student_id: params.id,
            nomineeCognates: selectedNominee.map(nominee => ({ nominee_id: nominee.faculty_code })),
            comments: comments,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        toast.success("Successfully updated preferences");
      } else {
        const msg = await response.json();
        toast.error(msg.message);
        throw response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredOptions = (index) => {
    const query = searchQuery[index] ? searchQuery[index].toLowerCase() : "";
    // Check if formData.suggestions is defined before filtering
    if (formData.suggestions) {
      return formData.suggestions.filter(
        (option) =>
          option.name.toLowerCase().includes(query) ||
          option.department.toLowerCase().includes(query) ||
          option.email.toLowerCase().includes(query) ||
          option.faculty_code.toString().includes(query)
      );
    } else {
      return [];
    }
  };

  const handleNomineeChangeWithCheck = (index, selectedNominee) => {
    const newNominees = [...formData.nominees];
    const isDuplicate = newNominees.some(
      (nominee, idx) =>
        idx !== index && nominee.faculty_code === selectedNominee.faculty_code
    );

    if (isDuplicate) {
      toast.error(
        "Duplicate nominee selected. Please select different nominees."
      );
    } else {
      const updatedNominees = [...newNominees];
      updatedNominees[index] = selectedNominee;
      // if(updatedNominees.length < 3) {
      //   for(let i = updatedNominees.length; i < 3; i++) {
      //     updatedNominees.push({});
      //     console.log("hiiii")
      //      console.log(updatedNominees);
      //   }
      // }
      formData.nominees = updatedNominees;
      setSelectedNominee(updatedNominees);
      // handleNomineeChange(index, selectedNominee);
     
    }
  };
  const SendToHOD = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/forms/irb/constitutuion/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            student_id: params.id,
            comments: comments,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        toast.success("Successfully send to HOD");
      } else {
        const msg = await response.json();
        toast.error(msg.message);
        throw response;
      }
    } catch (error) {
      console.error(error);
    }
  }
  // Inside the rendering part

  return (
    <div className="supervisorSide-form">
      <ToastContainer />
      <div className="data-input" id="appr">
        <label htmlFor="supervisorRecommendation">
          Recommendation of Supervisor
        </label>
        <div>
          <input
            type="radio"
            id="supervisorApproved"
            name="supervisorRecommendation"
            value="approved"
            checked={formData.status == "approved"}
            onChange={handleRecommendationChange}
            disabled={!isEditable}
            required
          />
          <label htmlFor="supervisorApproved" className="small-label">
            Approved
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="supervisorNotApproved"
            name="supervisorRecommendation"
            value="rejected"
            checked={formData.status == "rejected"}
            onChange={handleRecommendationChange}
            disabled={!isEditable}
            required
          />
          <label htmlFor="supervisorNotApproved" className="small-label">
            Not Approved
          </label>
        </div>
      </div>

      <div className="data-input">
        <label>
          List of 3 nominees of the DoRDC in cognate area from the institute
        </label>
        <table>
          <tbody>
            {selectedNominee.slice(0, 3).map((nominee, index) => (
              // console.log("hi : "+JSON.stringify(nominee)),
              <tr key={index}>
                <td>
                  <div className="select-wrapper">
                    <input
                      type="text"
                      className="search-bar"
                      placeholder="Search by name, department, email, or id"
                      value={searchQuery[index]}
                      onChange={(e) =>
                        handleSearchChange(index, e.target.value)
                      }
                      disabled={!isEditable}
                    />
                    {/* {console.log(index)} */}
                    {/* {console.log(selectedNominee[index])} */}
                    <select
                      onChange={(e) =>
                        handleNomineeChangeWithCheck(
                          index,
                          formData.suggestions.find(
                            (opt) =>
                              opt.faculty_code === parseInt(e.target.value)
                          )
                        )
                      }
                      disabled={!isEditable}
                      required
                      value={selectedNominee[index].faculty_code || ""}
                    >
                      <option value="">Select Nominee</option>
                      {filteredOptions(index).length > 0 ? (
                        filteredOptions(index).map((option, idx) => (
                          <option key={idx} value={option.faculty_code}>
                            {option.name} ({option.department}, {option.email},{" "}
                            {option.faculty_code})
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          No names
                        </option>
                      )}
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="data-input">
        <label htmlFor="supCom">Comments</label>
        <input
          type="text"
          className="comments"
          id="supCom"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          disabled={!isEditable}
        />
      </div>
      {formData.role === "faculty" && isEditable && (
        <div className="supervisor-button-div">
          <button className="send" type="button" onClick={updatePrefs}>
            UPDATE PREFERENCES
          </button>
          <button className="send" type="submit" onClick={SendToHOD}>
            SEND TO HOD
          </button>
        </div>
      )}
    </div>
  );
};

export default SupSideIrb;
