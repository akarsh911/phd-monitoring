import React, { useEffect, useState } from 'react';
import Table from './Table';
import './StudentList.css';
import { SERVER_URL } from '../../config';
import { toast } from 'react-toastify';

const StudentList = () => {
  const [data, setData] = useState([
  
   
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${SERVER_URL}/students`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // const response=await

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        let count=1;
       if(data)
        setData(
      data.map((item) => ({
        id: count++,
        name: item.name,
        rollNumber: item.roll_no,
        numberOfForms: 1,
        status: 'NOT APPROVED'
      }))
      )
      } else {
        var msg=await response.json()
        
        toast.error(msg.message);
        throw response;
      }

    }
    fetchData();
  },[])
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }; 
  const callBack = (id) => {
    window.location.href = `/dashboard/students/forms/irbconstitution/${id}`;
    console.log(id);
  }
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
      <Table data={sortedData} callBack={callBack}/>
    </div>
  );
};

export default StudentList;
