import React, { useEffect } from 'react';
import './CustomModal.css'; // Ensure you have this CSS file

const CustomModal = ({ 
    isOpen, 
    onClose, 
    children, 
    minWidth = '300px', 
    maxWidth = '800px', 
    minHeight = '200px', 
    maxHeight = '600px' ,
    closeOnOutsideClick = true
}) => {
    
    // Close the modal on outside click
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                if(closeOnOutsideClick)
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div 
                className="modal-content"
                style={{ minWidth, maxWidth, minHeight, maxHeight }}
            >
                <button className="modal-close-button" onClick={onClose}>
                    ✖
                </button>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
