import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., form validation, API calls)
    console.log(formData);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
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
