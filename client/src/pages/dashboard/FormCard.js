import React from 'react';
import PropTypes from 'prop-types';
import './FormCard.css';

const FormCard = ({ title, icon, onClick }) => {
  return (
    <div className="form-card" onClick={onClick}>
      <div className='form-card-icon'>
      {icon}
      </div>
      {/* <img src={icon} alt={`${title} icon`} className="form-card-icon" /> */}
      <div className="form-card-title">{title}</div>
    </div>
  );
};

FormCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FormCard;
