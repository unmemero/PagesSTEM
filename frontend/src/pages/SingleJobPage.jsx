import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'; 
import axios from 'axios';

const SingleJobPage = () => {
    const { id } = useParams(); 
    const location = useLocation();
    const { currentUser } = location.state || {};
    const [job, setJob] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        axios.get(`http://localhost:5000/api/jobs/${id}`)
          .then(response => {
              setJob(response.data);
              setLoading(false);
          })
          .catch(error => {
              setError('Error fetching job');
              setLoading(false); 
          });
    }, [id]);

    const handleUpdate = (jobId) => {
        console.log(`Updating job with ID: ${jobId}`);
        // Add your update logic here
    };

    const handleDelete = (jobId) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            axios.delete(`http://localhost:5000/api/jobs/${jobId}`)
                .then(response => {
                    console.log('Job deleted:', response.data);
                    // Handle post-delete logic
                })
                .catch(error => console.error('Error deleting job:', error));
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!job) return <div>Job not found</div>;

    return (
        <div className='single-page'>
            <h1>{job.title}</h1>
            <h2>{job.company}</h2>
            <br />
            <a href={job.applicapplicationationLink} className='application-link'>Apply Here</a>
            <p>
                {job.payType}: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(job.payAmount)}/{job.payPeriod}
            </p>
            <p>Date posted: {new Date(job.datePosted).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}</p>
            <p>Deadline: {new Date(job.deadline).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}</p>
            <br />
            <h3>Description</h3>
            <p className='description-text'>{job.description}</p>
            <hr />
            <h3>Locations</h3>
            <ul>
                {job.locations.map((location, index) => (
                    <li key={index}>{location}</li>
                ))}
            </ul>
            <hr />
            <h3>Requirements</h3>
            <ul>
                {job.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                ))}
            </ul>
            <hr />
            <h3>Preferred Majors</h3>
            <ul>
                {job.preferredMajors.map((major, index) => (
                    <li key={index}>{major}</li>
                ))}
            </ul>
            {/* Render the admin controls only for admin users */}
            {currentUser && currentUser.role === 'admin' && (
                <>
                    <p>Uploaded by: {job.uploader}</p>
                    <div>
                        <button onClick={() => handleUpdate(job._id)}>Update</button>
                        <button onClick={() => handleDelete(job._id)}>Delete</button>
                    </div>
                </>
            )}
            <div className='bottom'></div>
        </div>
    );
}

export default SingleJobPage;
