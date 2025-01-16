import React, { useState } from 'react';
import CustomButton from "../../fields/CustomButton";
import GridContainer from "../../fields/GridContainer";
import { baseURL } from '../../../../api/urls';
import InputSuggestions from '../../fields/InputSuggestions';
import TableComponent from '../../table/TableComponent';


const Supervisor = ({ formData }) => {
  
    const [examiners, setExaminers] = useState([]);
    const handleSearchSelect = (selectedExaminer) => {
        
        setExaminers([...examiners, selectedExaminer]);
   };

  return (
    <div>
      <GridContainer
        elements={[
          <InputSuggestions
            apiUrl={baseURL + "/api/examiners/search"}
            hint="Search here..."
            onSelect={handleSearchSelect}
            label=""
            showLabel={false}
          />,
          <CustomButton text="Add New" onClick={() => { /* Implement add action */ }} />
        ]}
        ratio={[2, 1]}
        space={2}
        label='National Examiners'
      />
      <GridContainer
      elements={[<TableComponent data={examiners} keys={["name", "department", "designation"]} />]}
      space={3}/>
    </div>
  );
};
export default Supervisor;
