import React from 'react';
import OrganizationList from '../components/OrganizationList';
import '../assets/styles/pages.css';

const OrganizationsPage = ({ currentUser }) => {
  const userRole = currentUser ? currentUser.role : 'user';

  return (
    <div className="organizations-page">
      <h1 className="page-title">Organization Listings</h1>
      <OrganizationList currentUser={{ role: userRole }} />
    </div>
  );
};

export default OrganizationsPage;