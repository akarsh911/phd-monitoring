import React, { useState } from 'react';
import "./Fields.css";

const InputField = ({ label, initialValue, isLocked, value, onChange,hint=null }) => {
    const [hintText, setHintText] = useState(hint || 'Enter Value...');
    return (
        <div className="input-field-container">
            <label className="input-label">{label}</label>
            <input
                type="text"
                className="input-field"
                value={isLocked ? initialValue : value}
                placeholder={hintText}
                onChange={(e) => !isLocked && onChange(e.target.value)}
                readOnly={isLocked} 
                disabled={isLocked}
            />
        </div>
    );
};

export default InputField;
