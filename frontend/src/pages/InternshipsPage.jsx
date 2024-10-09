import React from 'react';
import InternshipList from '../components/InternshipList';

const InternshipsPage = ({ currentUser }) => {
  const userRole = currentUser ? currentUser.role : 'user';

  return (
    <div className="internships-page">
      <h1>Internship Listings</h1>
      <InternshipList currentUser={{ role: userRole }} />
    </div>
  );
};

export default InternshipsPage;