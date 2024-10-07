import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/style.css';
function Home() {
  return (
    <div>
      <main>
        <h1>How can we help you today?</h1>
        <div className="searchbar">
          <input type="text" className="searchbar-text" id="searchbox" placeholder="Search" />
          <button id="searchbutton" className="searchbar-button">Search</button>
        </div>
        <div className="links">
          <Link to="/scholarships" className="links-link">
            <img src="/images/Scholarships logo.jpeg" alt="Scholarships" className="links-link-image" />
            <span className="links-link-text">Scholarships</span>
          </Link>
          <Link to="/internships" className="links-link">
            <img src="/images/Internships logo.jpeg" alt="Internships" className="links-link-image" />
            <span className="links-link-text">Internships</span>
          </Link>
          <Link to="/jobs" className="links-link">
            <img src="/images/Entry Level Jobs logo.jpeg" alt="Entry Level Jobs" className="links-link-image" />
            <span className="links-link-text">Entry Level Jobs</span>
          </Link>
          <Link to="/organizations" className="links-link">
            <img src="/images/Student Organizations logo.jpeg" alt="Student Organizations" className="links-link-image" />
            <span className="links-link-text">Student Organizations</span>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Home;
