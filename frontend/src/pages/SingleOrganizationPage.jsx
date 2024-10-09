import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleOrganizationPage = () => {
    const { id } = useParams(); // Get organization ID from the URL
    const [organization, setOrganization] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentUser = { role: 'admin' }; // Mocked current user for testing

    useEffect(() => {
        axios.get(`http://localhost:5000/api/organizations/${id}`) // Fetch the organization by ID
          .then(response => {
              setOrganization(response.data); // Set the organization state
              setLoading(false); // Stop loading
          })
          .catch(error => {
              console.error('Error fetching organization:', error);
              setError('Error fetching organization');
              setLoading(false); // Stop loading
          });
    }, [id]);

    const handleUpdate = (organizationId) => {
        console.log(`Updating organization with ID: ${organizationId}`);
        // Add your update logic here (e.g., open an update form or modal)
    };

    const handleDelete = (organizationId) => {
        if (window.confirm('Are you sure you want to delete this organization?')) {
            axios.delete(`http://localhost:5000/api/organizations/${organizationId}`)
                .then(response => {
                    console.log('Organization deleted:', response.data);
                    // Handle post-delete logic (e.g., redirect to organization list)
                })
                .catch(error => console.error('Error deleting organization:', error));
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!organization) return <div>Organization not found</div>;

    return (
        <div className='single-organization-page'>
            <h1>{organization.title}</h1>
            <h2>Location: {organization.location}</h2>
            <br />
            {organization.logo && <img src={organization.logo} alt={`${organization.title} logo`} style={{ maxWidth: '200px' }} />}
            <br />
            <a href={organization.website} target="_blank" rel="noopener noreferrer">Visit Website</a>
            <p>Date Added: {new Date(organization.dateAdded).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}</p>
            <br />
            <p>{organization.description}</p>
            <hr />
            <h3>Meetings</h3>
            <ul>
                {organization.meetings?.map((meeting, index) => (
                    <li key={index}>{meeting}</li>
                )) || <li>No meetings provided</li>}
            </ul>
            <hr />
            <h3>Majors</h3>
            <ul>
                {organization.majors?.map((major, index) => (
                    <li key={index}>{major}</li>
                )) || <li>No majors provided</li>}
            </ul>
            <hr />
            <h3>Contact Email</h3>
            <a href={`mailto:${organization.contactEmail}`}>{organization.contactEmail}</a>
            <hr />
            <h3>Social Links</h3>
            <ul>
                {organization.socialLinks?.map((link, index) => (
                    <li key={index}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
                )) || <li>No social links provided</li>}
            </ul>
            <hr />
            <h3>Events</h3>
            <ul>
                {organization.events?.map((event, index) => (
                    <li key={index}>
                        <h4>{event.title}</h4>
                        <p>{event.description}</p>
                        <p>{new Date(event.date).toLocaleDateString('en-US')} at {event.time}</p>
                        <p>Location: {event.location}</p>
                        {event.link && <a href={event.link} target="_blank" rel="noopener noreferrer">Event Link</a>}
                    </li>
                )) || <li>No events provided</li>}
            </ul>
            
            {/* Render the admin controls only for admin users */}
            {currentUser && currentUser.role === 'admin' && (
                <>
                    <p>Uploaded by: {organization.uploader}</p>
                    <div>
                        <button onClick={() => handleUpdate(organization._id)}>Update</button>
                        <button onClick={() => handleDelete(organization._id)}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default SingleOrganizationPage;