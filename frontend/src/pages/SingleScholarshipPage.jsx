import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const SingleScholarshipPage = () => {
    const { id } = useParams();
    const [scholarship, setScholarship] = useState(null);
    const location = useLocation();
    const { currentUser } = location.state || {};
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/scholarships/${id}`) 
          .then(response => {
              setScholarship(response.data); 
              setLoading(false); 
          })
          .catch(error => {
              setError('Error fetching scholarship');
              setLoading(false);
          });
    }, [id]);

    const handleUpdate = (scholarshipId) => {
        console.log(`Updating scholarship with ID: ${scholarshipId}`);
        // Add your update logic here (e.g., open an update form or modal)
    };

    const handleDelete = (scholarshipId) => {
        if (window.confirm('Are you sure you want to delete this scholarship?')) {
            axios.delete(`http://localhost:5000/api/scholarships/${scholarshipId}`)
                .then(response => {
                    console.log('Scholarship deleted:', response.data);
                    // Handle post-delete logic (e.g., redirect to scholarship list)
                })
                .catch(error => console.error('Error deleting scholarship:', error));
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!scholarship) return <div>Scholarship not found</div>;

    return (
        <div className='single-scholarship-page'>
            <h1>{scholarship.title}</h1>
            <h2>{scholarship.organization}</h2>
            <br />
            <a href={scholarship.applicationLink}>Apply Here</a>
            <p>{new Date(scholarship.datePosted).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}</p>
            <p>{new Date(scholarship.deadline).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}</p>
            <br />
            <p>{scholarship.description}</p>

            <br />
            <hr />
            <br />
            
            <h3>Locations</h3>
            <ul>
                {scholarship.locations.map((location, index) => (
                    <li key={index}>{location}</li>
                ))}
            </ul>

            <br />
            <hr />
            <br />

            <h3>Majors</h3>
            <ul>
                {scholarship.majors.map((major, index) => (
                    <li key={index}>{major}</li>
                ))}
            </ul>

            <br />
            <hr />
            <br />

            <h3>Requirements</h3>
            <ul>
                {scholarship.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                ))}
            </ul>
            <br />
            
            {/* Render the admin controls only for admin users */}
            {currentUser && currentUser.role === 'admin' && (
                <>
                    <p>Uploaded by: {scholarship.uploader}</p>
                    <div>
                        <button onClick={() => handleUpdate(scholarship._id)}>Update</button>
                        <button onClick={() => handleDelete(scholarship._id)}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default SingleScholarshipPage;
