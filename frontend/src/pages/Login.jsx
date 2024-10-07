import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    // Simulated login logic (replace with real authentication logic)
    if (email === 'test@example.com' && password === 'password123') {
      // On successful login, navigate to the dashboard (for example)
      navigate('/user/dashboard');
    } else {
      setError('Invalid email or password.');
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
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <div className="password-input">
          <input
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            id="userPassword"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
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
        New user? Start <Link to="/create-user">here</Link>
      </p>
    </main>
  );
}

export default Login;
