import React from 'react';
import InputSuggestions from '../../fields/InoutSuggestions';
import { baseURL } from '../../../../api/urls';
import GridContainer from '../../fields/GridContainer';
import InputField from '../../fields/InputField';


const Student = () => {
    const apiUrl = baseURL+'/suggestions/faculty'; // Replace with your API URL
    const initialValue = 'Initial Value'; // Set your initial value here

    const handleSuggestionSelect = (selectedSuggestion) => {
        console.log('Selected Suggestion:', selectedSuggestion);
       
    };

    return (
        <div>
            <GridContainer
              elements={[
                <InputSuggestions 
                apiUrl={apiUrl} 
                hint={'Type to get faculty suggestions...'}
                // onSuggestionSelect={handleSuggestionSelect} 
               />,
            <InputSuggestions 
            apiUrl={apiUrl} 
            hint={'Type to get faculty suggestions...'}
            lock={true}
            initialValue={initialValue}
            onSuggestionSelect={handleSuggestionSelect} 
        />,
         <InputField
                label="Student ID"
                defaultValue="123456"
                isLocked={false}
                hint="Enter Student ID..."
                onChange={(value) => console.log('Student ID:', value)}
              />,
           
              ]}
            />

<GridContainer elements={[ <InputSuggestions 
                apiUrl={apiUrl} 
                hint={'Type to get faculty suggestions...'}
                lock={true}
                initialValue={initialValue}
                onSuggestionSelect={handleSuggestionSelect} 
            />, <InputSuggestions 
            apiUrl={apiUrl} 
            hint={'Type to get faculty suggestions...'}
            lock={true}
            initialValue={initialValue}
            onSuggestionSelect={handleSuggestionSelect} 
        />]}  />

            <GridContainer elements={[    <InputField
                label="Student ID"
                defaultValue="123456"
                isLocked={false}
                hint="Enter Student ID..."
                onChange={(value) => console.log('Student ID:', value)}
              />,]} space={2} />
            
          
        </div>
    );
};

export default Student;
