import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
//import UserDashboard from './pages/UserDashboard';
//import AdminDashboard from './pages/AdminDashboard';
import JobsPage from './pages/JobsPage';
import SingleJobPage from './pages/SingleJobPage';
import OrganizationsPage from './pages/OrganizationsPage';
import InternshipsPage from './pages/InternshipsPage';
import SingleInternshipPage from './pages/SingleInternshipPage';
import ScholarshipsPage from './pages/ScholarshipsPage';
import SingleScholarshipPage from './pages/SingleScholarshipPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const currentUser = {role: 'user'};

function App() {
  return (
    <Router>
      <div className="content">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<SingleJobPage currentUser={currentUser}/>} />
          <Route path="/internships" element={<InternshipsPage />} />
          <Route path="/internships/:id" element={<SingleInternshipPage currentUser={currentUser}/>} />
          <Route path="/organizations" element={<OrganizationsPage />} />
          <Route path="/scholarships" element={<ScholarshipsPage />} />
          <Route path="/internships/:id" element={<SingleInternshipPage currentUser={currentUser} />} />
          {/* <Route path="/user/dashboard" element={<UserDashboard />} /> */}
          {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;