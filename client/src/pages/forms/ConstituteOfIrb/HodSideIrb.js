import React, { useEffect, useState } from 'react';
import './SupSideIrb.css';
import './ConstituteOfIrb.css';
import { SERVER_URL } from '../../../config.js';
import { toast } from 'react-toastify';

const HodSideIrb = ({
  formData,
  addChairmanExpert,
}) => {
  if(formData.experts){
    console.log(formData.experts)
    formData.experts=[{},{},{}]
  }
  const [experts, setExperts] = useState(formData.experts.map(expert => ({

    firstName: expert.first_name || '',
    lastName: expert.last_name || '',
    email: expert.email || '',
    designation: expert.designation || '',
    department: expert.department || '',
    institution: expert.institution || '',
    phone: expert.phone || '',
    suggestions: [],
    instituteSuggestions: [] // Add institution suggestions to state
  })));
  console.log(experts)
  const [expertChairman, setExpertChairman] = useState( []);
 


  formData.suggestions = formData.suggestions.filter(option => {
    return option.department === formData.department;
  });

  const handleHodRecommendationChange = (e) => {
    formData.hodRecommendation = e.target.value;
  }

  const fetchSuggestions = async (input, index) => {
    if (input.length > 0) {
      try {
        const response = await fetch(
          `${SERVER_URL}/external/autocomplete`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              search: input,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          const updatedExperts = [...experts];
          updatedExperts[index].suggestions = data.externals;
          setExperts(updatedExperts);
        } else {
          const msg = await response.json();
          toast.error(msg.message);
          throw response;
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      const updatedExperts = [...experts];
      updatedExperts[index].suggestions = [];
      setExperts(updatedExperts);
    }
  };

  const fetchInstituteSuggestions = async (input, index) => {
    if (input.length > 0) {
      try {
        const response = await fetch(
          `${SERVER_URL}/external/institution/autocomplete`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              search: input,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          const updatedExperts = [...experts];
          updatedExperts[index].instituteSuggestions = data.institutions;
       
          setExperts(updatedExperts);
        } else {
          const msg = await response.json();
          toast.error(msg.message);
          throw response;
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      const updatedExperts = [...experts];
      updatedExperts[index].instituteSuggestions = [];
      setExperts(updatedExperts);
    }
  };

  const sendToDordc = async (e) => {
    try{
      experts.forEach(expert => {
          if(!expert.firstName || !expert.lastName || !expert.email || !expert.designation || !expert.department || !expert.institution || !expert.phone){
            toast.error("Please fill all the fields for expert "+(experts.indexOf(expert)+1));
            return;
          }
          if(!expert.id)
            {
              toast.error("Please save the expert before submitting");
              return;
            }
      });
      if(expertChairman.length < 1){
        toast.error("Please add the chairman expert before submitting");
        return;
      }

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
            student_id: formData.regno,
            outside_experts: experts.map(expert=>{
              return {
                expert_id: expert.id,
              }
            }),
            cognate_experts: expertChairman.map(expert=>{
              return {
                faculty_code: expert,
              }            
            }),
            recommendation: formData.hodRecommendation
          }),
        }
      );
      if(response.ok){
        const res = await response.json();
        toast.success("form submitted to DoRDC");}
      else{
        const msg = await response.json();
        toast.error(msg.message);
        throw response;
      }
    }
    catch(error){
      console.error(error);
    }
  }

  const isDuplicateExpert = (newExpert) => {
    return experts.some(expert =>
      expert.firstName === newExpert.firstName &&
      expert.lastName === newExpert.lastName &&
      expert.email === newExpert.email
    );
  };

  const isDuplicateChairmanExpert = (facultyCode) => {
    return expertChairman.includes(facultyCode);
  };

  const addExpert = async (index) => {
    try {
      const expert = experts[index];

      if (!expert.firstName || !expert.lastName || !expert.email || !expert.designation || !expert.department || !expert.institution || !expert.phone) {
        toast.error("Please fill all the fields for Expert " + (index + 1));
        return;
      }

      const response = await fetch(
        `${SERVER_URL}/external/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            first_name: expert.firstName,
            last_name: expert.lastName,
            email: expert.email,
            designation: expert.designation,
            department: expert.department,
            institution: expert.institution,
            phone: expert.phone
          }),
        }
      );
      if (response.ok) {
        const res = await response.json();
        const data = res.external;
        const updatedExperts = [...experts];
        updatedExperts[index] = {
          id: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          designation: data.designation,
          department: data.department,
          institution: data.institution,
          phone: data.phone,
          suggestions: [],
          instituteSuggestions: [] // Clear suggestions
        };
        setExperts(updatedExperts);
        toast.success("Successfully " + res["mode"] + " expert");
      } else {
        const msg = await response.json();
        toast.error(msg.message);
        throw response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleExpertChange = (index, field, value) => {
    const updatedExperts = [...experts];
    updatedExperts[index][field] = value;
    setExperts(updatedExperts);
  };

  const handleSuggestionSelect = (index, suggestion) => {
    const updatedExperts = [...experts];
    updatedExperts[index] = {
      id: suggestion.id,
      firstName: suggestion.first_name,
      lastName: suggestion.last_name,
      email: suggestion.email,
      designation: suggestion.designation,
      department: suggestion.department,
      institution: suggestion.institution,
      phone: suggestion.phone,
      suggestions: [],
      instituteSuggestions: [] // Clear suggestions
    };
    if(isDuplicateExpert(updatedExperts[index])){
      toast.error("Duplicate expert entry");
    }
    setExperts(updatedExperts);
  };

  const handleInstituteSuggestionSelect = (index, institution) => {
    const updatedExperts = [...experts];
    updatedExperts[index].institution = institution;
    updatedExperts[index].instituteSuggestions = [];
    setExperts(updatedExperts);
  };

  const changeExpertChairman = (index, value) => {
    console.log(value);
    console.log(expertChairman);
    if (isDuplicateChairmanExpert(value)) {
      toast.error("Duplicate chairman expert entry");
      return;
    }
    const updatedExperts = [...expertChairman];
    updatedExperts[index] = value;
    formData.chairmanExperts = updatedExperts;
    setExpertChairman(updatedExperts);
  };

  return (
    <div className='hodSide-form'>
      <div className='data-input'>
        <label>List of 3 outside experts Proposed by the HOD from the duly approved panel by the Senate</label>
        <table>
          <tbody>
            {experts.map((expert, index) => (
              <tr key={index}>
                <td>
                  <div className="suggestions-list">
                    <input
                      type="text"
                      placeholder='First Name'
                      autoComplete='allo'
                      value={expert.firstName}
                      onChange={(e) => {
                        handleExpertChange(index, 'firstName', e.target.value);
                        fetchSuggestions(e.target.value, index);
                      }}
                      readOnly={formData.hod_lock}
                    />
                    <input
                      type="text"
                      placeholder='Last Name'
                      value={expert.lastName}
                      autoComplete='allo'
                      onChange={(e) => handleExpertChange(index, 'lastName', e.target.value)}
                      readOnly={formData.hod_lock}
                    />
                    {expert.suggestions.map((suggestion, i) => (
                      <div
                        key={i}
                        className="suggestion-item"
                        onClick={() => handleSuggestionSelect(index, suggestion)}
                      >
                        {`${suggestion.first_name} ${suggestion.last_name} - ${suggestion.institution} (${suggestion.department})`}
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={expert.email}
                    onChange={(e) => handleExpertChange(index, 'email', e.target.value)}
                    placeholder='Email'
                    readOnly={formData.hod_lock}
                  />
                  <input
                    type="text"
                    value={expert.designation}
                    onChange={(e) => handleExpertChange(index, 'designation', e.target.value)}
                    placeholder='Designation'
                    readOnly={formData.hod_lock}
                  />
                  <input
                    type="text"
                    value={expert.department}
                    onChange={(e) => handleExpertChange(index, 'department', e.target.value)}
                    placeholder='Department'
                    readOnly={formData.hod_lock}
                  />
                  <div className="suggestions-list">
                    <input
                      type="text"
                      value={expert.institution}
                      autoComplete='allo'
                      onChange={(e) => {
                        handleExpertChange(index, 'institution', e.target.value);
                        fetchInstituteSuggestions(e.target.value, index);
                      }}
                      placeholder='institution'
                      readOnly={formData.hod_lock}
                    />
                    {expert.instituteSuggestions.map((suggestion, i) => (
                      <div
                        key={i}
                        className="suggestion-item"
                        onClick={() => handleInstituteSuggestionSelect(index, suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={expert.phone}
                    onChange={(e) => handleExpertChange(index, 'phone', e.target.value)}
                    placeholder='Phone Number'
                    readOnly={formData.hod_lock}
                  />
                  {!formData.hod_lock && (
                    <button type="button" onClick={() => addExpert(index)}>{expert.id ? "Edit" : "Save"}</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='data-input'>
        <label htmlFor="chairmanExpertInput">Expert(s) recommended by Chairman Board of Studies of concerned department in cognate area from the Department/School</label>
        {formData.chairmanExperts.map((expert, index) => 
        (
          
          <div key={index} className='chairman-expert-input'>

            {console.log(expert)}
            {
              changeExpertChairman(index, expert)
            }
            <select
              id="chairmanExpertInput"
              name="chairmanExpert"
              // value={expert|| ''}
              onChange={(e) => changeExpertChairman(index, e.target.value)}
              required
              // disabled={formData.hod_lock}
            >

              <option value="">Select Expert</option>
              {formData.suggestions.map((option, idx) => (
                <option key={idx} value={option.faculty_code}>
                  {`${option.name} (${option.faculty_code}) - ${option.designation}`}
                </option>
              ))}
            </select>
          </div>
        ))}
        {!formData.hod_lock && (
          <button type="button" onClick={addChairmanExpert} className='add-button'>
            +
          </button>
        )}
      </div>

      <div className='data-input' id='appr'>
        <label htmlFor="hodRecommendation">Recommendation of HOD</label>
        <div>
          <input
            type="radio"
            id="approved"
            name="hodRecommendation"
            value="approved"
            checked={formData.hodRecommendation === 'approved'}
            onChange={handleHodRecommendationChange}
            required
            disabled={formData.hod_lock}
          />
          <label htmlFor="approved" className="small-label">Approved</label>
        </div>
        <div>
          <input
            type="radio"
            id="notApproved"
            name="hodRecommendation"
            value="notApproved"
            checked={formData.hodRecommendation === 'notApproved'}
            onChange={handleHodRecommendationChange}
            required
            disabled={formData.hod_lock}
          />
          <label htmlFor="notApproved" className="small-label">Not Approved</label>
        </div>
      </div>
      {!formData.hod_lock && (
        <div className='supervisor-button-div'>
          <button className='send' type="submit" onClick={sendToDordc}>SEND TO DoRDC</button>
        </div>
      )}
    </div>
  );
};

export default HodSideIrb;
