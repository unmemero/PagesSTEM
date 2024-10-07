import React from 'react';
import { Link } from 'react-router-dom';
import JobList from '../components/JobList';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-section">
        <h2>Jobs</h2>
        <div className="admin-actions">
          <Link to="/admin/jobs/new" className="btn">Add Job</Link>
        </div>
          <JobList />
        <div className="admin-list">
          
        </div>
      </div>
      
      <div className="admin-section">
        <h2>Internships</h2>
        <div className="admin-actions">
          <Link to="/admin/internships/new" className="btn">Add Internship</Link>
        </div>
        {/* Replace with a component that lists internships */}
        <div className="admin-list">
          <p>List of internships will go here...</p>
        </div>
      </div>
      
      <div className="admin-section">
        <h2>Organizations</h2>
        <div className="admin-actions">
          <Link to="/admin/organizations/new" className="btn">Add Organization</Link>
        </div>
        {/* Replace with a component that lists organizations */}
        <div className="admin-list">
          <p>List of organizations will go here...</p>
        </div>
      </div>

      <div className="admin-section">
        <h2>Scholarships</h2>
        <div className="admin-actions">
          <Link to="/admin/scholarships/new" className="btn">Add Scholarship</Link>
        </div>
        {/* Replace with a component that lists scholarships */}
        <div className="admin-list">
          <p>List of scholarships will go here...</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
