import React from 'react';
import JobList from '../components/JobList';

const JobsPage = ({ currentUser }) => {
  const userRole = currentUser ? currentUser.role : 'user';

  return (
    <div className="jobs-page">
      <h1>Job Listings</h1>
      <JobList currentUser={{ role: userRole }} />
    </div>
  );
};

export default JobsPage;