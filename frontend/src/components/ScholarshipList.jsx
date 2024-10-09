import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScholarshipList = ({ currentUser }) => {
  const [scholarships, setScholarships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [scholarshipsPerPage, setScholarshipsPerPage] = useState(10);

  useEffect(() => {
    axios.get('http://localhost:5000/api/scholarships')
      .then(response => setScholarships(response.data))
      .catch(error => console.error('Error fetching scholarships:', error));
  }, []);

  // Pagination logic
  const indexOfLastScholarship = currentPage * scholarshipsPerPage;
  const indexOfFirstScholarship = indexOfLastScholarship - scholarshipsPerPage;
  const currentScholarships = scholarships.slice(indexOfFirstScholarship, indexOfLastScholarship);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleDelete = (id) => {
    // Logic to delete the scholarship
    axios.delete(`http://localhost:5000/api/scholarships/${id}`)
      .then(() => {
        setScholarships(prevScholarships => prevScholarships.filter(scholarship => scholarship.id !== id));
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
        <label htmlFor="scholarshipsPerPage">Scholarships per page:</label>
        <select
          id="scholarshipsPerPage"
          value={scholarshipsPerPage}
          onChange={handleScholarshipsPerPageChange}
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
            <th>Organization</th>
            <th>Majors</th>
            <th>Locations</th>
            <th>Description</th>
            <th>Requirements</th>
            <th>Award</th>
            <th>Date Posted</th>
            <th>Deadline</th>
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
          {currentScholarships.map(scholarship => (
            console.log(scholarship),
            <tr key={scholarship.id}>
              <td><a href={scholarship.applicationLink} target="_blank" rel="noopener noreferrer">{scholarship.title}</a></td>
              <td>{scholarship.organization}</td>
              <td>
                <ul>
                  {scholarship.majors.map((major, index) => (
                    <li key={index}>{major}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {scholarship.locations.map((location, index) => (
                    <li key={index}>{location}</li>
                  ))}
                </ul>
              </td>
              <td>{scholarship.description}</td>
              <td>
                <ul>
                  {scholarship.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </td>
              <td>
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(scholarship.awardAmmount)}
              </td>
              <td>{new Date(scholarship.datePosted).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>
              <td>{new Date(scholarship.deadline).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>
              <td>
                <a href={`mailto:${scholarship.contactEmail}`}>
                  {scholarship.contactEmail}
                </a>
              </td>

              {currentUser && currentUser.role === 'admin' && (
                <>
                  <td>{scholarship.uploader}</td>
                  <td>
                    <button onClick={() => handleUpdate(scholarship.id)}>Update</button>
                    <button onClick={() => handleDelete(scholarship.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {[...Array(Math.ceil(scholarships.length / scholarshipsPerPage)).keys()].map(number => (
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

export default ScholarshipList;
