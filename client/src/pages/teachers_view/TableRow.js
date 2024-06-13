import React from 'react';
import './StudentList.css';

const TableRow = ({ index, row, callBack }) => {
  const handleClick = () => {
    callBack(row.rollNumber);
  };

  return (
    <tr onClick={handleClick}>
      <td>{index + 1}</td>
      <td>{row.name}</td>
      <td>{row.rollNumber}</td>
      <td>{row.numberOfForms}</td>
      <td className={row.status.replace(/ /g, '').toLowerCase()}>{row.status}</td>
    </tr>
  );
};

export default TableRow;
