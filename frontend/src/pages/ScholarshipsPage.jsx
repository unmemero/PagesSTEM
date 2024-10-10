import React from 'react';
import ScholarshipList from '../components/ScholarshipList';
import '../assets/styles/pages.css';

const ScholarshipsPage = ({ currentUser }) => {
  const userRole = currentUser ? currentUser.role : 'user';

  return (
    <div className="scholarships-page">
      <h1 className="page-title">Scholarship Listings</h1>
      <ScholarshipList currentUser={{ role: userRole }} />
    </div>
  );
};

export default ScholarshipsPage;