import React from 'react';

const HorizontalProfilePage = () => {
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
      <div style={styles.row}>
        <div style={styles.label}><strong>Name:</strong></div>
        <div style={styles.value}>{profile.name}</div>
      </div>
      <div style={styles.row}>
        <div style={styles.label}><strong>Roll Number:</strong></div>
        <div style={styles.value}>{profile.rollNumber}</div>
      </div>
      <div style={styles.row}>
        <div style={styles.label}><strong>Title of PhD:</strong></div>
        <div style={styles.value}>{profile.title}</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '100%',
    margin: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    justifyContent:'space-between',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  label: {
    flex: '1',
    fontWeight: 'bold',
  },
  value: {
    flex: '2',
    textAlign: 'left',
  },
  list: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
};

export default HorizontalProfilePage;
