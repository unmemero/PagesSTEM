import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/pages.css';

const ScholarshipList = ({ currentUser }) => {
  const [scholarships, setScholarships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [scholarshipsPerPage, setScholarshipsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/scholarships')
      .then(response => setScholarships(response.data))
      .catch(error => console.error('Error fetching scholarships:', error));
  }, []);

  const handleSort = (key, direction) => {
    const sortedScholarships = [...scholarships].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  
    setScholarships(sortedScholarships);
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const indexOfLastScholarship = currentPage * scholarshipsPerPage;
  const indexOfFirstScholarship = indexOfLastScholarship - scholarshipsPerPage;
  const currentScholarships = scholarships.slice(indexOfFirstScholarship, indexOfLastScholarship);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/scholarships/${id}`)
      .then(() => {
        setScholarships(prevScholarships => prevScholarships.filter(scholarship => scholarship._id !== id));
      })
      .catch(error => console.error('Error deleting scholarship:', error));
  };

  const handleUpdate = (id) => {
    // Will connect to the update form
  };

  const handleScholarshipsPerPageChange = (e) => {
    setScholarshipsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing the number of items per page
  };

  return (
    <div className="scholarship-list">
      <div className="pagination-control">
        <label htmlFor="scholarshipsPerPage" className="per-page-heading">Scholarships per page:</label>
        <select
          id="scholarshipsPerPage"
          value={scholarshipsPerPage}
          onChange={handleScholarshipsPerPageChange}
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
              Organization
              <button onClick={() => handleSort('organization', 'ascending')} className="sort-button">▲</button>
              <button onClick={() => handleSort('organization', 'descending')} className="sort-button">▼</button>
            </th>
            <th className="table-header">
              Majors
              <button onClick={() => handleSort('majors', 'ascending')} className="sort-button">▲</button>
              <button onClick={() => handleSort('majors', 'descending')} className="sort-button">▼</button>  
            </th>
            <th className="table-header">
              Deadline
              <button onClick={() => handleSort('deadline', 'ascending')} className="sort-button">▲</button>
              <button onClick={() => handleSort('deadline', 'descending')} className="sort-button">▼</button>  
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
          {currentScholarships.map((scholarship) => (
            <tr key={scholarship._id} className="table-row">
              <td><a href={scholarship.applicationLink} target="_blank" rel="noopener noreferrer" className="link">{scholarship.title}</a></td>
              <td>{scholarship.organization}</td>
              <td>
                <ul>
                  {scholarship.majors.map((major) => (
                    <li key={major}>{major}</li>
                  ))}
                </ul>
              </td>
              <td>{new Date(scholarship.deadline).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>
              {currentUser && currentUser.role === 'admin' && (
                <React.Fragment>
                  <td>{scholarship.uploader}</td>
                  <td>
                    <button onClick={() => handleUpdate(scholarship._id)} className="button-update">Update</button>
                    <button onClick={() => handleDelete(scholarship._id)} className="button-delete">Delete</button>
                  </td>
                </React.Fragment>
              )}
              <td>
                <Link to={`/scholarships/${scholarship._id}`} state={{ currentUser }} className='more-link'>
                  See more
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {[...Array(Math.ceil(scholarships.length / scholarshipsPerPage)).keys()].map(number => (
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

export default ScholarshipList;
