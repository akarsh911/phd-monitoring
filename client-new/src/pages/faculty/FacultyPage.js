import React, { useEffect, useState } from 'react';
import Layout from '../../components/dashboard/layout';
import { useLoading } from '../../context/LoadingContext';
import { useLocation } from 'react-router-dom';
import FilterBar from '../../components/filterBar/FilterBar';
import PagenationTable from '../../components/pagenationTable/PagenationTable';
import CustomModal from '../../components/forms/modal/CustomModal';
import FacultyForm from '../../components/facultyForm/FacultyForm'; // assume it's placed here
import { customFetch } from '../../api/base';
import { baseURL } from '../../api/urls';
import CustomButton from '../../components/forms/fields/CustomButton';

const FacultyPage = () => {
  const [filter, setFilter] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const { setLoading } = useLoading();
  const location = useLocation();

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const openForm = async (data) => {
    if (data) {
      setLoading(true);
      // const res = await customFetch(baseURL + `/faculty/${id}`, 'GET');
     
        setEditData(data);
        console.log(data);
        setIsOpen(true);
    
      setLoading(false);
    } else {
      setEditData(null);
      setIsOpen(true);
    }
  };

  return (
    <Layout
      children={
        <>
          <FilterBar onSearch={handleFilterChange} />
          <PagenationTable
            endpoint={location.pathname}
            filters={filter}
            enableApproval={false}
            customOpenForm={openForm}
            extraTopbarComponents={
              <CustomButton text="Add Faculty +" onClick={() => openForm()} />
            }
            
            actions={[
              {
                icon: <i className="fa-solid fa-pen-to-square"></i>,
                tooltip: 'Edit',
                onClick: (facultyData) => openForm(facultyData),
              },
            ]}
          />
          <CustomModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            width="800px"
          >
            <FacultyForm
              edit={!!editData}
              facultyData={editData}
            />
          </CustomModal>
        </>
      }
    />
  );
};

export default FacultyPage;
