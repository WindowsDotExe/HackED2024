import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Importing the named export 'auth'
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import getDoc
import './login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null); // State variable for error messages

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await setPersistence(auth, browserLocalPersistence);
            // Firebase authentication with email and password
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully!');
            setError(null)
            // Redirect to feed
            navigate('/feed');
        } catch (error) {
            console.error('Login failed: ', error.message);
            setError('Login failed! Please check your email and password.');
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

    return (
        <div className='rounded-box'>
        <div className="header">
        <link href='https://fonts.googleapis.com/css?family=Lexend Deca' rel='stylesheet'></link>
        <h1>Login to ByteSwipe</h1>
        {error && <p className="error">{error}</p>}
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
