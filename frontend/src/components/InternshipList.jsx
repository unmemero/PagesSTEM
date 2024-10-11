import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/styles/pages.css';

const InternshipList = ({ currentUser }) => {
  const [internships, setInternships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [internshipsPerPage, setInternshipsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/internships')
      .then(response => setInternships(response.data))
      .catch(error => console.error('Error fetching internships:', error));
  }, []);

  const handleSort = (key, direction) => {
    const sortedInternships = [...internships].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  
    setInternships(sortedInternships);
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const indexOfLastInternship = currentPage * internshipsPerPage;
  const indexOfFirstInternship = indexOfLastInternship - internshipsPerPage;
  const currentInternships = internships.slice(indexOfFirstInternship, indexOfLastInternship);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/internships/${id}`)
      .then(() => {
        setInternships(prevInternships => prevInternships.filter(internship => internship.id !== id));
      })
      .catch(error => console.error('Error deleting internship:', error));
  };

  const handleUpdate = (id) => {
    // Will connect to the update form
  };

  const handleInternshipsPerPageChange = (e) => {
    setInternshipsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing the number of items per page
  };

  return (
    <div className="internship-list">
      <div className="pagination-control">
        <label htmlFor="internshipsPerPage" className="per-page-heading">Internships per page:</label>
        <select
          id="internshipsPerPage"
          value={internshipsPerPage}
          onChange={handleInternshipsPerPageChange}
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
              <button onClick={() => handleSort('title', 'ascending')}>▲</button>
              <button onClick={() => handleSort('title', 'descending')}>▼</button>
            </th>
            <th className="table-header">
              Company
              <button onClick={() => handleSort('company', 'ascending')}>▲</button>
              <button onClick={() => handleSort('company', 'descending')}>▼</button>
            </th>
            <th className="table-header">
              Pay
              <button onClick={() => handleSort('payAmount', 'ascending')}>▲</button>
              <button onClick={() => handleSort('payAmount', 'descending')}>▼</button>
            </th>
            <th className="table-header">
              Period
              <button onClick={() => handleSort('payPeriod', 'ascending')}>▲</button>
              <button onClick={() => handleSort('payPeriod', 'descending')}>▼</button>
            </th>
            <th className="table-header">
              Deadline
              <button onClick={() => handleSort('deadline', 'ascending')}>▲</button>
              <button onClick={() => handleSort('deadline', 'descending')}>▼</button>
            </th>
            {currentUser && currentUser.role === 'admin' && (
              <>
                <th>
                  Uploader
                  <button onClick={() => handleSort('uploader', 'ascending')}>▲</button>
                  <button onClick={() => handleSort('uploader', 'descending')}>▼</button>  
                </th>
                <th>Actions</th>
              </>
            )}
            <th className="table-header">More Info</th>
          </tr>
        </thead>
        <tbody>
          {currentInternships.map(internship => (
            <tr key={internship._id || internship.id} className="table-row">
              <td>
                <a href={internship.applicationLink} target="_blank" rel="noopener noreferrer"  className="link">{internship.title}</a>
              </td>
              <td>{internship.company}</td>
              <td>
                {internship.payType}: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(internship.payAmount)}/{internship.payPeriod}
              </td>
              <td>{new Date(internship.startDate).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })} to {new Date(internship.endDate).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>
              <td>{new Date(internship.deadline).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>

              {currentUser && currentUser.role === 'admin' && (
                <>
                  <td>{internship.uploader}</td>
                  <td>
                    <button onClick={() => handleUpdate(internship.id)} className="button-update">Update</button>
                    <button onClick={() => handleDelete(internship.id)} className="button-delete">Delete</button>
                  </td>
                </>
              )}
              <td>
                <Link to={`/internships/${internship._id}`} state={{ currentUser }} className="more-link">
                  See more
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {[...Array(Math.ceil(internships.length / internshipsPerPage)).keys()].map(number => (
          <button
            key={number + 1}
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

export default InternshipList;
