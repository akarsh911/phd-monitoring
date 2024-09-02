import React from 'react';

const ProfilePage = () => {
  const profile = {
    name: 'John Doe',
    rollNumber: '2024PHX001',
    title: 'Deep Learning in Natural Language Processing',
    dateOfAdmission: 'September 1, 2024',
    fathersName: 'Michael Doe',
    phoneNumber: '+1 234 567 8901',
    emailAddress: 'john.doe@example.com',
    supervisorList: ['Dr. Jane Smith', 'Dr. Robert Brown'],
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>PhD Profile</h1>
      <div style={styles.info}>
        <strong>Name:</strong> {profile.name}
      </div>
      <div style={styles.info}>
        <strong>Roll Number:</strong> {profile.rollNumber}
      </div>
      <div style={styles.info}>
        <strong>Title of PhD:</strong> {profile.title}
      </div>
      <div style={styles.info}>
        <strong>Date of Admission:</strong> {profile.dateOfAdmission}
      </div>
      <div style={styles.info}>
        <strong>Father's Name:</strong> {profile.fathersName}
      </div>
      <div style={styles.info}>
        <strong>Phone Number:</strong> {profile.phoneNumber}
      </div>
      <div style={styles.info}>
        <strong>Email Address:</strong> {profile.emailAddress}
      </div>
      <div style={styles.info}>
        <strong>Supervisors:</strong>
        <ul>
          {profile.supervisorList.map((supervisor, index) => (
            <li key={index}>{supervisor}</li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  info: {
    marginBottom: '10px',
  },
};

export default ProfilePage;
