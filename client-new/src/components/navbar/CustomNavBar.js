import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NavBar.css';

const buttonConfig = [
    { path: '/home', icon: <i class="fa fa-home" aria-hidden="true"></i>, text: 'Home', roles: ['student', 'hod','phd_coordinator','faculty','dordc','dra','director','doctoral','external'] },
    { path: '/forms', icon: <i class="fa fa-file-text" aria-hidden="true"></i>, text: 'Forms', roles: ['student','hod','phd_coordinator','faculty','dordc','dra','director','doctoral','external'] },
    { path: '/presentation/form', icon: <i class="fa fa-tasks" aria-hidden="true"></i>, text: 'Presentations', roles: ['student','hod','phd_coordinator','faculty','dordc','dra','director','doctoral'] },
    { path: '/publications', icon: <i class="fa fa-book" aria-hidden="true"></i>, text: 'Publications', roles: ['student', 'faculty','hod'] },
    { path: '/students', icon: <i class="fa fa-users" aria-hidden="true"></i>, text: 'Students', roles: ['hod','phd_coordinator','faculty','dordc','dra','director','doctoral','external'] },
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
