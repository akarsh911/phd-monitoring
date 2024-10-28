import React, { useState } from 'react';
import { customFetch } from '../../../api/base';

const InputSuggestions = ({ apiUrl,hint, initialValue, onSuggestionSelect,label ,lock=false }) => {
    const [inputValue, setInputValue] = useState(initialValue || '');
    const [suggestions, setSuggestions] = useState([]);
    const [isLocked, setIsLocked] = useState(lock || false);
    const [hintText, setHintText] = useState(hint || 'Type to get suggestions...');

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setInputValue(value);
        
        if (value) {
            const data = await customFetch(apiUrl, 'POST', { text: value });
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
        if (onSuggestionSelect) {
            onSuggestionSelect(suggestion); // Call the callback with the entire suggestion
        }
    };

    return (
        <div className="input-suggestions-container">
             <div className="input-field-container">
            <label className="input-label">{label}</label>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={hintText}
                className="input-field"
                disabled={isLocked}
            />
           </div>
            {suggestions.length > 0 ? (
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
            : (
                initialValue && !lock && (
                    <ul className="suggestions-list">
                        <p>No Suggestions Available</p>
                    </ul>
                )
            )
            }
            
        </div>
    );
};

export default InputSuggestions;
