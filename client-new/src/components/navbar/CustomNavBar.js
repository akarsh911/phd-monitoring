import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NavBar.css';

const buttonConfig = [
    { path: '/home', icon: '🏠', text: 'Home', roles: ['student', 'hod','phd_coordinator','faculty','dordc','dra','director','doctoral','external'] },
    { path: '/forms', icon: '📃', text: 'Forms', roles: ['student','hod','phd_coordinator','faculty','dordc','dra','director','doctoral','external'] },
    { path: '/presentation', icon: 'ℹ️', text: 'Presentations', roles: ['student','hod','phd_coordinator','faculty','dordc','dra','director','doctoral'] },
    { path: '/publications', icon: '📰', text: 'Publications', roles: ['student'] },
    { path: '/students', icon: '🧑‍🎓', text: 'Students', roles: ['hod','phd_coordinator','faculty','dordc','dra','director','doctoral','external'] },
];

const CustomNavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const userRole = localStorage.getItem('userRole');
    const visibleButtons = buttonConfig.filter(button => button.roles.includes(userRole));

    return (
        <div className="side-left-menu">
            <div className="tietlogo">
                <img src="/images/tiet_logo.png" alt="Logo" />
            </div>
            <div className="icons">
                {visibleButtons.map(({ path, icon, text }) => (
                    <button
                        key={path}
                        className={`menu-button ${location.pathname.startsWith(path) ? 'active' : ''}`}
                        onClick={() => navigate(path)}
                    >
                        <span className="icon">{icon}</span>
                        <span className="text">{text}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CustomNavBar;
