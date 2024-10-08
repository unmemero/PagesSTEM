import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import JobsPage from './pages/JobsPage';
//import UserDashboard from './pages/UserDashboard';
//import AdminDashboard from './pages/AdminDashboard';
//import OrganizationsPage from './pages/OrganizationsPage';
//import InternshipsPage from './pages/InternshipsPage';
//import ScholarshipsPage from './pages/ScholarshipsPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    
    <Router>
      <div className="content">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<JobsPage />} />
          {/*
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/organizations" element={<OrganizationsPage />} />
          <Route path="/internships" element={<InternshipsPage />} />
          <Route path="/scholarships" element={<ScholarshipsPage />} />*/
          }
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
