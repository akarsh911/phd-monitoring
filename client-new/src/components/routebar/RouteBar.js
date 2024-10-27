// RouteBar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './RouteBar.css'; // Import your custom CSS

const RouteBar = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className="route-bar">
      <ul>
        <li>Route: </li>
        {pathnames.length > 0 ? (
          pathnames.map((name, index) => {
            const routePath = `/${pathnames.slice(0, index + 1).join('/')}`;
            return (
              <li key={routePath}>
                <Link to={routePath}>{name.charAt(0).toUpperCase() + name.slice(1)}</Link>
                {index < pathnames.length - 1 && <span> &gt; </span>}
              </li>
            );
          })
        ) : (
          <li>Home</li>
        )}
      </ul>
    </nav>
  );
};

export default RouteBar;
