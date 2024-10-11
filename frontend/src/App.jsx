import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import JobsPage from './pages/JobsPage';
import SingleJobPage from './pages/SingleJobPage';
import OrganizationsPage from './pages/OrganizationsPage';
import SingleOrganizationPage from './pages/SingleOrganizationPage';
import InternshipsPage from './pages/InternshipsPage';
import SingleInternshipPage from './pages/SingleInternshipPage';
import ScholarshipsPage from './pages/ScholarshipsPage';
import SingleScholarshipPage from './pages/SingleScholarshipPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import axios from 'axios';

// Check if the user is authenticated by checking localStorage for a token
const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null;
};

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch the current user data when the app is mounted
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/users/me', {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the request header
            },
          });
          setCurrentUser(response.data); // Assuming the backend returns the user details
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <div className="content">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} /> {/* Pass setCurrentUser */}
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<SingleJobPage currentUser={currentUser}/>} />
          <Route path="/internships" element={<InternshipsPage />} />
          <Route path="/internships/:id" element={<SingleInternshipPage currentUser={currentUser}/>} />
          <Route path="/organizations" element={<OrganizationsPage />} />
          <Route path="/organizations/:id" element={<SingleOrganizationPage currentUser={currentUser} />} />
          <Route path="/scholarships" element={<ScholarshipsPage />} />
          <Route path="/scholarships/:id" element={<SingleScholarshipPage currentUser={currentUser} />} />
          <Route path="/user/dashboard" element={<UserDashboard currentUser={currentUser} />} />
          <Route path="/admin/dashboard" element={<AdminDashboard currentUser={currentUser} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
