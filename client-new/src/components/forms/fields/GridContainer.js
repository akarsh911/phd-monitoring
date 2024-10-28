import React from 'react';
import "./Fields.css";

const GridContainer = ({ elements, space = 1 }) => {
    return (
        <div className="grid-container">
            {elements.map((element, index) => (
                <div
                    key={index}
                    className={`grid-item ${index === 0 ? `span-${space}` : ''}`}
                >
                    {element}
                </div>
            ))}
        </div>
    );
};

export default GridContainer;
