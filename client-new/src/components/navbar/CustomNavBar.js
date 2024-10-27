import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import './NavBar.css';

const buttonConfig = {
    student: [
        { path: '/home', icon: '🏠', text: 'Home' },
        { path: '/forms', icon: '📃', text: 'Forms' },
        { path: '/about', icon: 'ℹ️', text: 'About' },
        { path: '/contact', icon: '✉️', text: 'Contact' }
    ],
    admin: [
        { path: '/home', icon: '🏠', text: 'Home' },
        { path: '/admin', icon: '🛠️', text: 'Admin Panel' },
        { path: '/about', icon: 'ℹ️', text: 'About' },
        { path: '/contact', icon: '✉️', text: 'Contact' }
    ]
};

const CustomNavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const userRole = localStorage.getItem('userRole');
    const activeButton = location.pathname.startsWith('/forms') ? '/forms' : location.pathname;

    const buttons = buttonConfig[userRole] || [];

    return (
        <div className="side-left-menu">
            <div className="tietlogo">
                <img src="/images/tiet_logo.png" alt="Logo" />
            </div>
            <div className="icons">
                {buttons.map(({ path, icon, text }) => (
                    <button 
                        key={path}
                        className={`menu-button ${activeButton === path || (path === '/forms' && activeButton.startsWith('/forms')) ? 'active' : ''}`} 
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
