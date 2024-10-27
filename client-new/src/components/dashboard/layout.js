import React from 'react';
import { useLocation } from 'react-router-dom';
import './layout.css'; 
import TopBar from '../topbar/TopBar';
import NavBar from '../navbar/CustomNavBar';

const Layout = ({ children }) => {
    const location = useLocation();

    // Updated headerTextMap to include the new route
    const headerTextMap = {
        "/home": "Home",
        "/forms": "Forms",
        "/forms/supervisor-allocation": "Supervisor Allocation", // New route added
        "/students": "Students",
    };

    const headerText = headerTextMap[location.pathname] || "Dashboard";

    return (
        <div className="layout">
            <div className="sidebar">
                <NavBar />
            </div>
            <div className="main-content">
                <header className="topbar">
                    <TopBar headingText={headerText} />
                </header>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
