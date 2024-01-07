import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Assuming auth is correctly initialized in your firebase config
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './Register.css';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Import doc and setDoc here
import { useNavigate } from 'react-router-dom';


function RegisterPage() {
  const db = getFirestore();
  const navigate = useNavigate()


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isNameValid = formData.name.length >= 2;
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(formData.password);

    setIsFormValid(isEmailValid && isNameValid && isPasswordValid && formData.password === formData.confirmPassword);
  }, [formData]);

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
        // await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // add user to users collection in firestore
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
            name: formData.name,
            email: formData.email,
            isSelectingPreferences: true,
            preferences: []
        });

        console.log('User registered successfully');
        
        navigate('/login'); // Replace with your preferences route
    } catch (error) {
        console.log("Error registering user: ", error.message);
        
    }

  };

  return (
    <div className="rounded-box"> {/* Wrapper div added */}
      <div className="header">
      <link href='https://fonts.googleapis.com/css?family=Lexend Deca' rel='stylesheet'></link>
        <h1>Register for ByteSwipe</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder='John Doe'
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder = 'johnDoe@byteswipe.org'
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder='Atleast 8 characters, 1 digit, 1 special, 1 uppercase '
            value={formData.password}
            onChange={handleChange}
            required
            className={passwordError ? 'confirmPasswordError' : ''}
          />

          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder='Confirm Password'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={passwordError ? 'confirmPasswordError' : ''}
          />

        {passwordError && <div className="error-message">Passwords do not match</div>}

        <div className='button-container'>
          <button type="submit" disabled={!isFormValid}>Register</button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
