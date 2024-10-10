import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/style.css';
import '../assets/styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handlePasswordToggle = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
  
    // Basic validation
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
  
    try {
      // Send the login request to the backend
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
  
      // Get token and user role from the response
      const { token, user } = response.data;
  
      // Store the token in localStorage
      localStorage.setItem('authToken', token);
  
      // Check the user role and redirect accordingly
      if (user.role === 'admin') {
        navigate('/admin/dashboard'); // Admin dashboard route
      } else {
        navigate('/user/dashboard'); // User dashboard route
      }
  
    } catch (err) {
      // Handle login errors
      if (err.response && err.response.status === 400) {
        setError('Invalid email or password.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          placeholder="email@example.com"
          name="email"
          id="userEmail"
          autoComplete="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <br />
        <label htmlFor="userPassword">Password</label>
        <br />
        <div className="password-input">
          <input
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            id="userPassword"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button id="password-toggle" onClick={handlePasswordToggle}>
            <span className="material-symbols-outlined">
              {passwordVisible ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>
        <br />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" id="submitButton">Submit</button>
      </form>
      <p>
        New user? Start <Link to="/register">here</Link>
      </p>
    </main>
  );
}

export default Login;