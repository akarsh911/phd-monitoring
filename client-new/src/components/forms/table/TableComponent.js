import React from 'react';
import './TableComponent.css';

const TableComponent = ({ data, keys, titles, components = [], rowStyle }) => {
    // Create a dictionary from components for easy lookup
    const componentMap = components.reduce((acc, comp) => {
        acc[comp.key] = comp.component;
        return acc;
    }, {});

    return (
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        {titles?.map((title, index) => (
                            <th key={index}>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((row, index) => (
                        <tr key={index} style={rowStyle ? rowStyle(row) : {}}>
                            <td>{index + 1}</td> {/* S.No */}
                            {keys?.map((key, keyIndex) => {
                                const value = row[key];
                                const CustomComponent = componentMap[key];

                                return (
                                    <td key={keyIndex}>
                                        {CustomComponent ? (
                                            <CustomComponent row={row} data={value} /> // Pass the row and data
                                        ) : (
                                            typeof value === 'string' && value.startsWith('http') ? (
                                                <a href={value} target="_blank" rel="noopener noreferrer">link</a>
                                            ) : (
                                                value
                                            )
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
