import React, { useState } from 'react';
import "./Fields.css";

const InputField = ({ label, initialValue, isLocked, onChange,hint=null }) => {
    const [hintText, setHintText] = useState(hint || 'Enter Value...');
    const [value, updateValue] = useState(initialValue);
    return (
        <div className="input-field-container">
            <label className="input-label">{label}</label>
            <input
                type="text"
                className="input-field"
                value={value}
                placeholder={hintText}
                onChange={(e) => {updateValue(e.target.value); onChange(e.target.value)}}
                readOnly={isLocked} 
                disabled={isLocked}
            />
        </div>
    );
};

export default InputField;
