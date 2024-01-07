import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Importing the named export 'auth'
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, onAuthStateChanged, signOut } from 'firebase/auth';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await setPersistence(auth, browserLocalPersistence);
            // Firebase authentication with email and password
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully!');
            // Redirect to your home page or dashboard here
        } catch (error) {
            console.error('Login failed: ', error.message);
            // Handle login errors here (e.g., user not found, wrong password)
        }

    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User is logged in:', user);
            } else {
                console.log('No user is logged in');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('User logged out successfully!');
            // Perform any additional actions after logout if necessary
        } catch (error) {
            console.error('Logout failed: ', error.message);
            // Handle logout errors here
        }
    };

    return (
        <div className='rounded-box'>
        <div className="header">
        <link href='https://fonts.googleapis.com/css?family=Lexend Deca' rel='stylesheet'></link>
        <h1>Login to ByteSwipe</h1>
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
            <div className='button-container'>
                <button > Submit </button>
            </div>
        </form>
    </div></div>
    );

    // return (
    //     <form onSubmit={handleSubmit}>
    //         <h2>Login</h2>
    //         <input
    //             type="text"
    //             placeholder="Email address"
    //             value={email}
    //             onChange={handleEmailChange}
    //         />
    //         <input
    //             type="password"
    //             placeholder="Password"
    //             value={password}
    //             onChange={handlePasswordChange}
    //         />
    //         <button type="submit">Login</button>
    //         <button type="button" onClick={handleLogout}>Logout</button> {/* Logout button FOR TESTING ONLY */}
    //     </form>
    // );
    

}

export default Login;
