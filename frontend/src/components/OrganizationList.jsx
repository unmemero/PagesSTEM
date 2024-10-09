import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    axios.delete(`http://localhost:5000/api/organizations/${id}`)
      .then(() => {
        setOrganizations(prevOrganizations => prevOrganizations.filter(organization => organization._id !== id)); // Use `_id` consistently
      })
      .catch(error => console.error('Error deleting organization:', error));
  };

  const handleUpdate = (id) => {
    // Will connect to the update form
  };

  const handleOrganizationsPerPageChange = (e) => {
    setOrganizationsPerPage(Number(e.target.value));
    setCurrentPage(1); 
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
            <th>Majors</th>
            {currentUser && currentUser.role === 'admin' && (
              <React.Fragment>
                <th>Uploader</th>
                <th>Actions</th>
              </React.Fragment>
            )}
            <td>Organizations</td>
          </tr>
        </thead>
        <tbody>
          {currentOrganizations.map(organization => (
            <tr key={organization._id}> 
              <td><a href={organization.website} target='_blank' rel='noopener noreferrer'></a>{organization.title}</td>
              <td>{organization.location}</td>
              <td>
                <ul>
                  {organization.majors.map(major => (
                    <li key={major}>{major}</li>
                  ))}
                </ul>
              </td>
              {currentUser && currentUser.role === 'admin' && (
                <React.Fragment>
                  <td>{organization.uploader}</td>
                  <td>
                    <button onClick={() => handleUpdate(organization._id)}>Update</button> {/* Use `_id` */}
                    <button onClick={() => handleDelete(organization._id)}>Delete</button> {/* Use `_id` */}
                  </td>
                </React.Fragment>
              )}
              <td><Link to={`/organizations/${organization._id}`}>See more</Link></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {[...Array(Math.ceil(organizations.length / organizationsPerPage)).keys()].map(number => (
          <button
            key={number} // Use `number` itself for pagination button keys
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
