import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../assets/styles/style.css';
import '../assets/styles/header.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('authToken') !== null;
  const currentUser = {role: 'admin'};

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className="navbar">
      <Link to="/" className="header-logo">
        <img src="/images/main logo.jpeg" alt="Main Logo" />
        <h2>STEM Resources</h2>
      </Link>

      {location.pathname !== "/" && (
        <div className="header-links">
          <Link to="/scholarships" className="header-link">Scholarships</Link>
          <Link to="/internships" className="header-link">Internships</Link>
          <Link to="/jobs" className="header-link">Entry Level Jobs</Link>
          <Link to="/organizations" className="header-link">Student Organizations</Link>
        </div>
      )}

      <div className="auth-links">
        {isAuthenticated ? (
          <>
            <Link to="/user/dashboard" className="header-link"><span className="material-symbols-outlined">person</span>Dashboard</Link>
            <button onClick={handleLogout} className="header-link"><span className='material-symbols-outlined'>logout</span>Logout</button>
          </>
        ) : (
          <Link to="/login" id="login">
            <span className="material-symbols-outlined">login</span> Log in
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;