import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrganizationList = ({ currentUser }) => {
  const [organizations, setOrganizations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [organizationsPerPage, setOrganizationsPerPage] = useState(10);

  useEffect(() => {
    axios.get('http://localhost:5000/api/organizations')
      .then(response => setOrganizations(response.data))
      .catch(error => console.error('Error fetching organizations:', error));
  }, []);

  // Pagination logic
  const indexOfLastOrganization = currentPage * organizationsPerPage;
  const indexOfFirstOrganization = indexOfLastOrganization - organizationsPerPage;
  const currentOrganizations = organizations.slice(indexOfFirstOrganization, indexOfLastOrganization);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleDelete = (id) => {
    // Logic to delete the organization
    axios.delete(`http://localhost:5000/api/organizations/${id}`)
      .then(() => {
        setOrganizations(prevOrganizations => prevOrganizations.filter(organization => organization.id !== id));
      })
      .catch(error => console.error('Error deleting organization:', error));
  };

  const handleUpdate = (id) => {
    // Will connect to the update form
  };

  const handleOrganizationsPerPageChange = (e) => {
    setOrganizationsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing the number of items per page
  };

  return (
    <div className="organization-list">
      <div className="pagination-control">
        <label htmlFor="organizationsPerPage">Organizations per page:</label>
        <select
          id="organizationsPerPage"
          value={organizationsPerPage}
          onChange={handleOrganizationsPerPageChange}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Description</th>
            <th>Majors</th>
            <th>Meetings</th>
            <th>Website</th>
            <th>Contact Email</th>
            {currentUser && currentUser.role === 'admin' && (
              <>
                <th>Uploader</th>
                <th>Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {currentOrganizations.map(organization => (
            <tr key={organization.id}>
              <td>{organization.title}</td>
              <td>{organization.location}</td>
              <td>{organization.description}</td>
              <td>
                <ul>
                  {organization.majors.map((major, index) => (
                    <li key={index}>{major}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {organization.meetings?.map((meeting, index) => (
                    <li key={index}>{meeting}</li>
                  ))}
                </ul>
              </td>
              <td>
                <a href={organization.website} target="_blank" rel="noopener noreferrer">{organization.website}</a>
              </td>
              <td>
                <a href={`mailto:${organization.contactEmail}`}>
                  {organization.contactEmail}
                </a>
              </td>
              {currentUser && currentUser.role === 'admin' && (
                <>
                  <td>{organization.uploader}</td>
                  <td>
                    <button onClick={() => handleUpdate(organization.id)}>Update</button>
                    <button onClick={() => handleDelete(organization.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {[...Array(Math.ceil(organizations.length / organizationsPerPage)).keys()].map(number => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={currentPage === number + 1 ? 'active' : ''}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrganizationList;