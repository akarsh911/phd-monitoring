import React, { useState } from 'react';
import "./Fields.css";
import { toast } from 'react-toastify';

const FileUploadField = ({ label, initialValue = null, isLocked = false, onChange, showLabel = true }) => {
    const [fileName, setFileName] = useState(initialValue ? "Open file" : "Upload PDF (Max 2MB)");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            if (file.type !== "application/pdf") {
                toast.error("Only PDF files are allowed.");
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                toast.error("File size should be less than 2 MB.");
                return;
            }
            setFileName(file.name);
            onChange(file); // Pass the file to the parent component
        }
    };

    return (
        <div className="file-upload-container">
            {showLabel && (<label className="input-label">{label}</label>)}
            
            {initialValue && isLocked ? (
                <a href={initialValue} target="_blank" rel="noopener noreferrer" className="file-link">
                    {fileName}
                </a>
            ) : (
                <input
                    type="file"
                    accept=".pdf"
                    className="file-input"
                    onChange={handleFileChange}
                    disabled={isLocked}
                />
            )}
        </div>
    );
};

export default FileUploadField;
