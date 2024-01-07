import React, { useState } from 'react';
import { auth } from '../firebase'; // Importing the named export 'auth'
import { createUserWithEmailAndPassword, setPersistence, browserLocalPersistence, onAuthStateChanged, signOut } from 'firebase/auth';import './Register.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'password' || name === 'confirmPassword') {
        setPasswordError(false);
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        setPasswordError(true); // Set error if passwords do not match
        return; // Prevent form submission
      }

    try {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        console.log('User registered successfully');
    } catch (error) {
        console.log("Error registering user: ", error.message);
    }

  };

  return (
    <div className="register-container"> {/* Wrapper div added */}
      <div className="RegisterPage">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={passwordError ? 'confirmPasswordError' : ''}
          />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={passwordError ? 'confirmPasswordError' : ''}
          />

        {passwordError && <div className="error-message">Passwords do not match</div>}


          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
