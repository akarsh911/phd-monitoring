import React from 'react';
import './TableComponent.css';

const TableComponent = ({ data, keys, titles }) => {
    return (
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        {titles.map((title, index) => (
                            <th key={index}>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td> {/* S.No */}
                            {keys.map((key, keyIndex) => (
                                <td key={keyIndex}>{item[key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
