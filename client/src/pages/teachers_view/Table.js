import React from 'react';
import TableRow from './TableRow';
import './StudentList.css';

const Table = ({ data,callBack }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>S. no</th>
          <th>Name</th>
          <th>Roll number</th>
          <th>Number of forms</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <TableRow key={row.id} index={index} row={row} callBack={callBack}/>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
