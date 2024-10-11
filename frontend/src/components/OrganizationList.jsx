import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/pages.css';

const OrganizationList = ({ currentUser }) => {
  const [organizations, setOrganizations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [organizationsPerPage, setOrganizationsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/organizations')
      .then(response => setOrganizations(response.data))
      .catch(error => console.error('Error fetching organizations:', error));
  }, []);

  const handleSort = (key, direction) => {
    const sortedOrganizations = [...organizations].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  
    setOrganizations(sortedOrganizations);
    setSortConfig({ key, direction });
  };

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
        <label htmlFor="organizationsPerPage" className="per-page-heading">Organizations per page:</label>
        <select
          id="organizationsPerPage"
          value={organizationsPerPage}
          onChange={handleOrganizationsPerPageChange}
          className="select"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th className="table-header">
              Title
              <button onClick={() => handleSort('title', 'ascending')} className="sort-button">▲</button>
              <button onClick={() => handleSort('title', 'descending')} className="sort-button">▼</button>  
            </th>
            <th className="table-header">
              Location
              <button onClick={() => handleSort('location', 'ascending')} className="sort-button">▲</button>
              <button onClick={() => handleSort('location', 'descending')} className="sort-button">▼</button>  
            </th>
            <th className="table-header">
              Majors
              <button onClick={() => handleSort('majors', 'ascending')} className="sort-button">▲</button> 
              <button onClick={() => handleSort('majors', 'descending')} className="sort-button">▼</button>  
            </th>
            {currentUser && currentUser.role === 'admin' && (
              <React.Fragment>
                <th>
                  Uploader
                  <button onClick={() => handleSort('uploader', 'ascending')} className="sort-button">▲</button> 
                  <button onClick={() => handleSort('uploader', 'descending')} className="sort-button">▼</button>
                </th>
                <th>Actions</th>
              </React.Fragment>
            )}
            <th className="table-header">More info</th>
          </tr>
        </thead>
        <tbody>
          {currentOrganizations.map(organization => (
            <tr key={organization._id} className="table-row"> 
              <td><a href={organization.website} target='_blank' rel='noopener noreferrer'
              className="link"></a>{organization.title}</td>
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
                    <button onClick={() => handleUpdate(organization._id)} className="button-update">Update</button> {/* Use `_id` */}
                    <button onClick={() => handleDelete(organization._id)} className="button-delete">Delete</button> {/* Use `_id` */}
                  </td>
                </React.Fragment>
              )}
              <td>
                <Link to={`/organizations/${organization._id}`} state={{ currentUser }} className='more-link'>
                  See more
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {[...Array(Math.ceil(organizations.length / organizationsPerPage)).keys()].map(number => (
          <button
            key={number} // Use `number` itself for pagination button keys
            onClick={() => paginate(number + 1)}
            className={currentPage === number + 1 ? 'active' : 'pagination-button'}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrganizationList;
