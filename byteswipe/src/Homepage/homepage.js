import React from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';

function Homepage() {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    };

    const navigateToRegister = () => {
        navigate('/register');
    }

    return (
        <div className="homepage-container">
            <link href='https://fonts.googleapis.com/css?family=Lexend Deca' rel='stylesheet'></link>

            <div className="logo-container">
                <svg height="130" stroke="#2E475D" strokeWidth="2" className="text-line" width="130%">
                    <text x="50%" dominantBaseline="middle" textAnchor="middle" y="50%"> ByteSwipe! </text>
                </svg>
            </div>
            
            <h2> This is dummy text. This is more dummy text. This is more dummy text. </h2>
            
            <div className='button-container'>
                <button onClick={navigateToRegister}>Register</button>
                <button onClick={navigateToLogin}>Login</button>
            </div>

            <nav class="menu">

            </nav>
        </div>

        
    );
    }

export default Homepage;
