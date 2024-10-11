import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const SingleInternshipPage = () => {
    const { id } = useParams(); 
    const [internship, setInternship] = useState(null);
    const location = useLocation();
    const { currentUser } = location.state || {};
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/internships/${id}`) 
          .then(response => {
              setInternship(response.data);
              setLoading(false);
          })
          .catch(error => {
              console.error('Error fetching internship:', error);
              setError('Error fetching internship');
              setLoading(false);
          });
    }, [id]);

    const handleUpdate = (internshipId) => {
        console.log(`Updating internship with ID: ${internshipId}`);
        // Add your update logic here (e.g., open an update form or modal)
    };

    const handleDelete = (internshipId) => {
        if (window.confirm('Are you sure you want to delete this internship?')) {
            axios.delete(`http://localhost:5000/api/internships/${internshipId}`)
                .then(response => {
                    console.log('Internship deleted:', response.data);
                    // Handle post-delete logic (e.g., redirect to internship list)
                })
                .catch(error => console.error('Error deleting internship:', error));
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!internship) return <div>Internship not found</div>;

    return (
        <div className='single-page'>
            <h1>{internship.title}</h1>
            <h2>{internship.organization}</h2>
            <br />
            <a href={internship.applicationLink} target="_blank" rel="noopener noreferrer" className='application-link'>Apply Here</a>
            <p>Date posted: {new Date(internship.datePosted).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}</p>
            <p>Deadline: {new Date(internship.deadline).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}</p>
            <p>Period: {new Date(internship.startDate).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })} to {new Date(internship.endDate).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}</p>
            <br />
            <p>{internship.description}</p>
            <hr />
            <h3>Locations</h3>
            <ul>
                {internship.locations?.map((location, index) => (
                    <li key={index}>{location}</li>
                )) || <li>No locations provided</li>}
            </ul>
            <hr />
            <h3>Requirements</h3>
            <ul>
                {internship.requirements?.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                )) || <li>No requirements provided</li>}
            </ul>
            <hr />
            <h3>Majors</h3>
            <ul>
                {internship.majors?.map((major, index) => (
                    <li key={index}>{major}</li>
                )) || <li>No majors provided</li>}
            </ul>
            
            {/* Render the admin controls only for admin users */}
            {currentUser && currentUser.role === 'admin' && (
                <>
                    <p>Uploaded by: {internship.uploader}</p>
                    <div>
                        <button onClick={() => handleUpdate(internship._id)}>Update</button>
                        <button onClick={() => handleDelete(internship._id)}>Delete</button>
                    </div>
                </>
            )}
            <div className='bottom'></div>
        </div>
    );
}

export default SingleInternshipPage;