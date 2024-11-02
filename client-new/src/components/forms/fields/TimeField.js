import React, { useState, useEffect } from 'react';
import "./Fields.css";

const TimeField = ({ label, initialValue, isLocked, onChange, hint = null, showLabel = true }) => {
    const [hintText] = useState(hint || 'Select Time...');
    const [value, updateValue] = useState('');

    // Format the initial value to "HH:MM" if it’s provided
    useEffect(() => {
        if (initialValue) {
            const date = new Date(initialValue);
            const formattedTime = date.toISOString().substr(11, 5); // "HH:MM" format
            updateValue(formattedTime);
        }
    }, [initialValue]);

    return (
        <div className="input-field-container">
            {showLabel && (<label className="input-label">{label}</label>)}
            <input
                type="time"
                className="input-field"
                value={value}
                placeholder={hintText}
                onChange={(e) => {
                    updateValue(e.target.value);
                    onChange(e.target.value);
                }}
                readOnly={isLocked}
                disabled={isLocked}
            />
        </div>
    );
};

export default TimeField;
