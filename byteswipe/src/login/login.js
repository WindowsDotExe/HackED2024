import React, { useState } from 'react';
import { auth } from '../firebase'; // Importing the named export 'auth'
import { signInWithEmailAndPassword } from 'firebase/auth';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Firebase authentication with email and password
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully!');
            // Redirect to your home page or dashboard here
        } catch (error) {
            console.error('Login failed: ', error.message);
            // Handle login errors here (e.g., user not found, wrong password)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Email address"
                value={email}
                onChange={handleEmailChange}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;