import './Navbar.css';

const Navbar = ({ activeButton }) => {
    const headings = [
        'Dashboard',
        'Supervisors',
        'Doctoral Committee',
        'Presentation',
        'Publications',
        'Patents',
        'Thesis',
        'Documents',
        'Profile',
        'Sign Out',
        'Forms'
      ];
    
    
      const headingText = headings[activeButton] || '';

    return (
      <div className="navbar">
    
        <h2>{headingText}</h2>
        
      </div>
    );
  };
  
  export default Navbar;