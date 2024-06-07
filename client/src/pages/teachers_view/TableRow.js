import React from 'react';
import './StudentList.css';

const TableRow = ({ index, row }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{row.name}</td>
      <td>{row.rollNumber}</td>
      <td>{row.numberOfForms}</td>
      <td className={row.status.replace(/ /g, '').toLowerCase()}>{row.status}</td>
    </tr>
  );
};

export default TableRow;
