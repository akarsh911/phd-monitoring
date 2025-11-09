import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';
import './ProfileCard.css';

import { formatDate } from '../../utils/timeParse';
import { baseURL } from '../../api/urls';
import { customFetch } from '../../api/base';
import GridContainer from '../forms/fields/GridContainer';
import TableComponent from '../forms/table/TableComponent';
import CustomButton from '../forms/fields/CustomButton';

const ProfileCard = ({ dataIP = null, link = false }) => {
  const { state: locationState, pathname } = useLocation();
  const { roll_no } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(locationState || dataIP);
  const [loading, setLoading] = useState(!profile);

  useEffect(() => {
    if (!profile) {
      let url = roll_no
        ? `${baseURL}/students/${roll_no}`
        : `${baseURL}/students`;

      customFetch(url, 'GET', {}, true, false).then((data) => {
        if (data?.success) {
          const student = data.response.data[0];
          setProfile(student);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [roll_no, profile]);

  const navigateToForms = () => {
    navigate(pathname + '/forms');
  };

  const navigateToProgress = () => {
    navigate(pathname + '/presentation');
  };

  if (loading) return <p>Loading...</p>;

  if (profile) {
    const {
      name,
      phd_title,
      overall_progress,
      department,
      supervisors,
      email,
      phone,
      current_status,
      fathers_name,
      address,
      date_of_registration,
      date_of_irb,
      date_of_synopsis,
      cgpa,
      doctoral,
    } = profile;

  const personalInfo = [
    { label: 'Roll Number', value: profile.roll_no },
    { label: 'Email', value: email },
    { label: 'Phone', value: phone },
    { label: 'Department', value: department },
    // { label: 'Supervisors', value: supervisors?.join(', ') },
    { label: 'CGPA', value: cgpa },
    { label: "Father's Name", value: fathers_name },
    { label: 'Address', value: address },
    { label: 'Current Status', value: current_status },
    { label: 'Date of Admission', value: formatDate(date_of_registration) },
    { label: 'Date of IRB', value: formatDate(date_of_irb) },
    { label: 'Date of Synopsis', value: formatDate(date_of_synopsis) },
  ];

  const supervisorTableData = (supervisors || []).map((sup, index) => {
    // Support both object and string formats
    if (typeof sup === 'string') {
      return {
        name: sup,
        email: '—',
        phone: '—',
        designation: '—',
      };
    }
    return {
      name: sup.name || '—',
      email: sup.email || '—',
      phone: sup.phone || '—',
      designation: sup.designation || '—',
    };
  });

  const doctoralTableData = (doctoral || []).map((member) => ({
    name: member.name || '—',
    email: member.email || '—',
    phone: member.phone || '—',
    designation: member.designation || '—',
  }));

  return (
    // <div className='profile-card'>
    //   <div className='profile-header'>
    //     <div>
    //       <h2 className='profile-name'>{name}</h2>
    //       <h3 className='profile-subtitle'>{phd_title}</h3>
    //     </div>
    //     <div className='progress-container'>
    //       <CircularProgressbar
    //         value={overall_progress}
    //         text={`${overall_progress}%`}
    //         styles={buildStyles({
    //           textColor: '#333',
    //           pathColor: '#2563eb',
    //           trailColor: '#e5e7eb',
    //         })}
    //       />
    //       <span className='progress-label'>Progress</span>
    //     </div>
    //   </div>

    //   <div className='profile-grid'>
    //     {personalInfo.map((item, idx) => (
    //       <div key={idx} className='profile-grid-item'>
    //         <strong>{item.label}</strong>
    //         <span>{item.value || '—'}</span>
    //       </div>
    //     ))}
    //   </div>

      

    //   {/* <GridContainer
    //     label="Doctoral Committee"
    //     elements={[
    //       <TableComponent
    //         data={doctoral}
    //         keys={["name", "email", "phone", "designation", "actions"]}
    //         titles={["Name", "Email", "Phone", "Designation", "Actions"]}
    //         components={[
    //           {
    //             key: "actions",
    //             component: ({ row }) => (
    //               <GridContainer
    //                 space={1}
    //                 elements={[
    //                   <CustomButton text="Edit" />,
    //                   <CustomButton text="Delete" variant="danger" />,
    //                 ]}
    //               />
    //             ),
    //           },
    //         ]}
    //       />,
    //     ]}
    //     space={3}
    //   /> */}
    // </div>
    <div className='student-container'>
      <div className='student-header'>
        <div className='student-header-text'>
          <h2>{name}</h2>
          <p className='student-sub'>
            {phd_title || 'Ph.D. Title Not Available'}
          </p>
        </div>
        <div className='student-progress'>
          <CircularProgressbar
            value={overall_progress}
            text={`${overall_progress}%`}
            styles={buildStyles({
              textColor: '#111827',
              pathColor: '#2563eb',
              trailColor: '#e5e7eb',
            })}
          />
          <span className='progress-label'>Progress</span>
        </div>
      </div>

      <div className='student-info-grid'>
        {personalInfo.map((item, idx) => (
          <div key={idx}>
            <strong>{item.label}:</strong> {item.value || '—'}
          </div>
        ))}
      </div>

      {/* <div className='student-table-section'>
        <h3>Overall Progress</h3>
        <div style={{ maxWidth: '100px', marginTop: '1rem' }}>
          <CircularProgressbar
            value={overall_progress}
            text={`${overall_progress}%`}
            styles={buildStyles({
              textColor: '#111827',
              pathColor: '#2563eb',
              trailColor: '#e5e7eb',
            })}
          />
        </div>
      </div> */}
    <div className='profile-actions'>
        <CustomButton text='View Forms' onClick={navigateToForms} />
        <CustomButton text='View Presentations' onClick={navigateToProgress} disabled={true} />
      </div>

      <GridContainer
        label='Supervisors'
        elements={[
          <TableComponent
            data={supervisorTableData}
            keys={['name', 'email', 'phone', 'designation']}
            titles={['Name', 'Email', 'Phone', 'Designation']}
          />,
        ]}
        space={3}
      />

      <GridContainer
        label='Doctoral Committee'
        elements={[
          <TableComponent
            data={doctoralTableData}
            keys={['name', 'email', 'phone', 'designation']}
            titles={['Name', 'Email', 'Phone', 'Designation']}
          />,
        ]}
        space={3}
      /> 


    </div>
  )}
  else {
    return <p>Profile data not available.</p>;
  }
};

export default ProfileCard;
