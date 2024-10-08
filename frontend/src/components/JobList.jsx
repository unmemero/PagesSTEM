import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobList = ({ currentUser }) => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(10);

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  console.log(jobs);
  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    // Logic to delete the job
    axios.delete(`http://localhost:5000/api/jobs/${id}`)
      .then(() => {
        setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
      })
      .catch(error => console.error('Error deleting job:', error));
  };

  const handleUpdate = (id) => {
    // Will connect to the update form
  };
  
  const handleJobsPerPageChange = (e) => {
    setJobsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing the number of items per page
  };

  return (
    <div className="job-list">
      <div className="pagination-control">
        <label htmlFor="jobsPerPage">Jobs per page:</label>
        <select
          id="jobsPerPage"
          value={jobsPerPage}
          onChange={handleJobsPerPageChange}
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
            <th>Company</th>
            <th>Locations</th>
            <th>Description</th>
            <th>Requirements</th>
            <th>Preferred Majors</th>
            <th>Pay</th>
            <th>Date Posted</th>
            <th>Deadline</th>
            {currentUser && currentUser.role === 'admin' && (
              <th>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentJobs.map(job => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>
                <ul>
                  {job.locations.map((location, index) => (
                    <li key={index}>{location}</li>
                  ))}
                </ul>
              </td>
              <td>{job.description}</td>
              <td>
                <ul>
                  {job.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {job.preferredMajors.map((major, index) => (
                    <li key={index}>{major}</li>
                  ))}
                </ul>
              </td>
              <td>{job.payType}: {job.payAmount}/{job.payPeriod}</td>
              <td>{job.datePosted}</td>
              <td>{job.deadline}</td>
              {currentUser && currentUser.role === 'admin' && (
                <td>
                  <button onClick={() => handleUpdate(job.id)}>Update</button>
                  <button onClick={() => handleDelete(job.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/*
      <div className="pagination">
        {[...Array(Math.ceil(jobs.length / jobsPerPage)).keys()].map(number => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={currentPage === number + 1 ? 'active' : ''}
          >
            {number + 1}
          </button>
        ))}
      </div>*/}
    </div>
  );
};

export default JobList;
