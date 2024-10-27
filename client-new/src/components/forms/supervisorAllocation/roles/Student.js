import React from 'react';
import InputSuggestions from '../../fields/InoutSuggestions';
import { baseURL } from '../../../../api/urls';


const Student = () => {
    const apiUrl = baseURL+'/suggestions/faculty'; // Replace with your API URL
    const initialValue = 'Initial Value'; // Set your initial value here

    const handleSuggestionSelect = (selectedSuggestion) => {
        console.log('Selected Suggestion:', selectedSuggestion);
       
    };

    return (
        <div>
            <h1>Custom Input with Suggestions</h1>
            
            <InputSuggestions 
                apiUrl={apiUrl} 
                hint={'Type to get faculty suggestions...'}
                lock={true}
                initialValue={initialValue}
                onSuggestionSelect={handleSuggestionSelect} 
            />
        </div>
    );
};

export default Student;
