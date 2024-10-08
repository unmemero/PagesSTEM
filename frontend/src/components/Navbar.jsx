import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/style.css';
import '../assets/styles/header.css';

function Navbar() {
    const location = useLocation();
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


        <Link to="/login" id="login">
            <span className="material-symbols-outlined">login</span> Log in
        </Link>
        </header>
    );
}

export default Navbar;
