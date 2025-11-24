import React, { useState } from 'react';
import Layout from '../../components/dashboard/layout';
import { useLoading } from '../../context/LoadingContext';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import FilterBar from '../../components/filterBar/FilterBar';
import PagenationTable from '../../components/pagenationTable/PagenationTable';
import CustomModal from '../../components/forms/modal/CustomModal';
import FacultyForm from '../../components/facultyForm/FacultyForm'; // assume it's placed here
import { baseURL } from '../../api/urls';
import CustomButton from '../../components/forms/fields/CustomButton';

const FacultyPage = () => {
  const [filter, setFilter] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showBulkImportModal, setShowBulkImportModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
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

  const handleBulkImport = async () => {
    if (!csvFile) {
      toast.error('Please select a CSV file');
      return;
    }

    try {
      setSubmitting(true);
      setLoading(true);
      
      const formData = new FormData();
      formData.append('file', csvFile);

      const response = await fetch(`${baseURL}/faculties/bulk-import`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        if (data.data.errors.length > 0) {
          console.log('Import errors:', data.data.errors);
          toast.info(`Check console for ${data.data.error_count} errors`);
        }
        setShowBulkImportModal(false);
        setCsvFile(null);
        setRefreshKey(prev => prev + 1);
      } else {
        toast.error(data.message || 'Failed to import');
      }
    } catch (error) {
      console.error('Error importing CSV:', error);
      toast.error('Failed to import CSV');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Layout
      children={
        <>
          <FilterBar onSearch={handleFilterChange} />
          <PagenationTable
            key={refreshKey}
            endpoint={location.pathname}
            filters={filter}
            enableApproval={false}
            customOpenForm={openForm}
            extraTopbarComponents={
              <div style={{ display: 'flex', gap: '1rem' }}>
                <CustomButton 
                  text="Bulk Import CSV" 
                  onClick={() => setShowBulkImportModal(true)} 
                />
                <CustomButton text="Add Faculty +" onClick={() => openForm()} />
              </div>
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

          {/* Bulk Import Modal */}
          <CustomModal
            isOpen={showBulkImportModal}
            onClose={() => {
              setShowBulkImportModal(false);
              setCsvFile(null);
            }}
            title="Bulk Import Faculty"
            width="600px"
          >
            <div className="modal-form">
              <div className="info-box" style={{
                background: '#f0f9ff',
                border: '1px solid #bae6fd',
                borderRadius: '0.5rem',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <p style={{ margin: '0.25rem 0', fontSize: '0.875rem' }}>
                  <strong>CSV Format for Internal Faculty:</strong>
                </p>
                <p style={{ margin: '0.25rem 0', fontSize: '0.875rem' }}>
                  first_name,last_name,email,phone,designation,internal,faculty_code,department_code,website_link
                </p>
                <p style={{ margin: '0.5rem 0 0.25rem 0', fontSize: '0.875rem' }}>
                  <strong>CSV Format for External Faculty:</strong>
                </p>
                <p style={{ margin: '0.25rem 0', fontSize: '0.875rem' }}>
                  first_name,last_name,email,phone,designation,external,department_code,institution,website_link
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                  Note: For internal faculty, faculty_code and department_code are required. 
                  For external faculty, faculty_code is auto-generated and institution is required. 
                  Department_code is optional for external faculty. If a faculty with the same email exists, their record will be updated.
                </p>
              </div>
              
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setCsvFile(e.target.files[0])}
                style={{
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              />
              
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem',
                marginTop: '1rem'
              }}>
                <button
                  onClick={() => {
                    setShowBulkImportModal(false);
                    setCsvFile(null);
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'white',
                    color: '#6b7280',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkImport}
                  disabled={submitting || !csvFile}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: submitting || !csvFile ? '#9ca3af' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: submitting || !csvFile ? 'not-allowed' : 'pointer'
                  }}
                >
                  {submitting ? 'Importing...' : 'Import'}
                </button>
              </div>
            </div>
          </CustomModal>
        </>
      }
    />
  );
};

export default FacultyPage;
