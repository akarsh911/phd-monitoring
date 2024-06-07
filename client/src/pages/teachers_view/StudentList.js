import React, { useState } from 'react';
import Table from './Table';
import './StudentList.css';

const StudentList = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Abhinav Jain', rollNumber: '102203689', numberOfForms: 5, status: 'APPROVED' },
    { id: 2, name: 'Nandini Jain', rollNumber: '123456789', numberOfForms: 5, status: 'TO BE APPROVED' },
    { id: 3, name: 'Akarsh Srivastav', rollNumber: '123455432', numberOfForms: 5, status: 'NOT APPROVED' },
    { id: 4, name: 'xyz', rollNumber: '123455432', numberOfForms: 5, status: 'NOT APPROVED' }// Add other rows as needed
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortField(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === '' || item.status === filterStatus)
  );

  const sortedData = filteredData.sort((a, b) => {
    if (sortField === '') return 0;
    return a[sortField] > b[sortField] ? 1 : -1;
  });

  return (
    <div className="StudentList">
     
      <div className="controls">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
        <select onChange={handleSort} value={sortField}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="rollNumber">Roll Number</option>
          <option value="status">Status</option>
        </select>
        <select onChange={handleFilter} value={filterStatus}>
          <option value="">Filter By</option>
          <option value="APPROVED">Approved</option>
          <option value="TO BE APPROVED">To Be Approved</option>
          <option value="NOT APPROVED">Not Approved</option>
        </select>
      </div>
      <Table data={sortedData} />
    </div>
  );
};

export default StudentList;
