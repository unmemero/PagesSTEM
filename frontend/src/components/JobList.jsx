import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const JobList = ({ currentUser }) => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then(response => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  }, []);

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      axios.delete(`http://localhost:5000/api/jobs/${id}`)
        .then(() => {
          setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
        })
        .catch(error => console.error('Error deleting job:', error));
    }
  };

  const handleJobsPerPageChange = (e) => {
    setJobsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing the number of items per page
  };

  if (loading) return <div>Loading jobs...</div>;
  if (jobs.length === 0) return <div>No jobs found.</div>;

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
            <th>Pay</th>
            <th>Date Posted</th>
            <th>Deadline</th>
            <th>More info</th>
            {currentUser && currentUser.role === 'admin' && (
              <>
                <th>Uploader</th>
                <th>Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {currentJobs.map(job => (
            <tr key={job._id}>
              <td>
                <a href={job.applicationLink} target="_blank" rel="noopener noreferrer">{job.title}</a>
                </td>
              <td>{job.company}</td>
              <td>
                {job.payType}: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(job.payAmount)}/{job.payPeriod}
              </td>
              <td>{new Date(job.datePosted).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>
              <td>{new Date(job.deadline).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>
              {currentUser && currentUser.role === 'admin' && (
                <>
                  <td>{job.uploader}</td>
                  <td>
                    <button onClick={() => console.log(`Updating job with ID: ${job._id}`)}>Update</button>
                    <button onClick={() => handleDelete(job._id)}>Delete</button>
                  </td>
                </>
              )}
              <td>
                <Link to={`/jobs/${job._id}`} state={{ currentUser }}>
                  See more
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
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
      </div>
    </div>
  );
};

export default JobList;
