import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation for password match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      // Prepare data to send to the backend
      const userData = {
        name: `${formData.firstname} ${formData.lastname}`, // Concatenating first and last names
        email: formData.email,
        password: formData.password
      };

      // Make the POST request to register the user
      const response = await axios.post('http://localhost:5000/api/users/register', userData);

      // Handle successful registration (you get a token in the response)
      setSuccessMessage('User registered successfully!');
      setErrorMessage('');
      console.log('Token:', response.data.token);

      // Clear form or redirect to login page, etc.
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error registering user:', error.response?.data?.message || error.message);
      setErrorMessage(error.response?.data?.message || 'Error registering user');
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

        {/* First Name */}
        <label htmlFor="userFirstName">First Name</label>
        <br />
        <input
          type="text"
          name="firstname"
          id="userFirstName"
          placeholder="John"
          value={formData.firstname}
          onChange={handleInputChange}
          required
        />
        <br />

        {/* Last Name */}
        <label htmlFor="userLastName">Last Name</label>
        <br />
        <input
          type="text"
          name="lastname"
          id="userLastName"
          placeholder="Doe"
          value={formData.lastname}
          onChange={handleInputChange}
          required
        />
        <br />

        {/* Email */}
        <label htmlFor="userEmail">Email</label>
        <br />
        <input
          type="email"
          name="email"
          id="userEmail"
          placeholder="johndoe@example.com"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <br />

        {/* Password */}
        <label htmlFor="userPassword">Password</label>
        <br />
        <div className="password-input">
          <input
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            id="userPassword"
            placeholder="example123!"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            <span className="material-symbols-outlined">
              {passwordVisible ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>
        <br />

        {/* Confirm Password */}
        <label htmlFor="userPasswordConfirm">Confirm Password</label>
        <br />
        <div className="password-input">
          <input
            type={confirmPasswordVisible ? 'text' : 'password'}
            name="confirmPassword"
            id="userPasswordConfirm"
            placeholder="example123!"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <span className="material-symbols-outlined">
              {confirmPasswordVisible ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>
        <br />

        {/* Submit Button */}
        <button type="submit" id="submitButton">
          Submit
        </button>
      </form>

      <p>
        Have an account? <Link to="/login">Log in</Link>
      </p>
    </main>
  );
};

export default Register;
