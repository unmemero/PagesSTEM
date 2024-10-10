import React from 'react';
import JobList from '../components/JobList';
import '../assets/styles/pages.css';

const JobsPage = ({ currentUser }) => {
  const userRole = currentUser ? currentUser.role : 'user';

  return (
    <div className="jobs-page">
      <h1 className="page-title">Job Listings</h1>
      <JobList currentUser={{ role: userRole }} />
    </div>
  );
};

export default JobsPage;