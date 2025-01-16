import React, { useState } from 'react';
import { customFetch } from '../../../api/base';
import "./Fields.css";

const InputSuggestions = ({ apiUrl,hint, initialValue, onSelect,label ,lock=false,showLabel=true,body }) => {
    const [inputValue, setInputValue] = useState(initialValue || '');
    const [suggestions, setSuggestions] = useState([]);
    const [isLocked, setIsLocked] = useState(lock || false);
    const [hintText, setHintText] = useState(hint || 'Type to get suggestions...');

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setInputValue(value);
        
        if (value) {
            const finalBody = body ? {...body, text: value} : {text: value};
            const data = await customFetch(apiUrl, 'POST',finalBody,false);
            if (data && data.success) {
                setSuggestions(data.response || []); // Adjust according to your API response structure
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion.name); 
        setSuggestions([]);
        if (onSelect) {
            onSelect(suggestion); // Call the callback with the entire suggestion
        }
    };

    return (
        <div className="input-suggestions-container">
             <div className="input-field-container">
            {showLabel && (<label className="input-label">{label}</label>)}
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={hintText}
                className="input-field"
                disabled={isLocked}
            />
           </div>
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.id} // Assuming each suggestion has a unique 'id'
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="suggestion-item"
                        >
                            {suggestion.name} {/* Display the suggestion name */}
                        </li>
                    ))}
                </ul>
            ) 
            }
            
        </div>
    );
};

export default InputSuggestions;
