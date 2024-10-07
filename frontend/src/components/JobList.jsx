import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('/api/jobs')
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/jobs/${id}`)
      .then(() => {
        setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
      })
      .catch(error => console.error('Error deleting job:', error));
  };

  const handleUpdate = (id) => {
    ;
  }

  return (
    <div className="job-list">
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
            {/*STUB FOR ACTIONS HEADER */}
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
              <td>
                <ul>
                  {job.description.map((paragraph, index) => (
                    <li key={index}>{paragraph}</li>
                  ))}
                </ul>
              </td>
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
              {
                /*
                Add logic for update and delete button appearance
                <td>
                  <button onClick={()=>handleUpdate(job.id)}>Update</button>
                  <button onClick={() => handleDelete(job.id)}>Delete</button>
                </td>*/
              }
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {[...Array(Math.ceil(jobs.length / jobsPerPage)).keys()].map(number => (
          <button key={number + 1} onClick={() => paginate(number + 1)}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobList;