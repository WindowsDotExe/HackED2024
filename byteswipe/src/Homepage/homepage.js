import React from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';

function Homepage() {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login'); // The path you set for your login route
    };
    return (
        <div className='logo-container'>
            <link href='https://fonts.googleapis.com/css?family=Lexend Deca' rel='stylesheet'></link>

            <svg height="130" stroke="#2E475D" stroke-width="2" class="text-line" width="130%"><text x="50%" dominant-baseline="middle" text-anchor="middle" y="50%"> ByteSwipe! </text></svg>
          
         <h2> This is dummy text. This is more dummy text. This is more dummy text. </h2>
        
        <div className='button-container'>
         <button > Register </button>
         <button > Login </button></div>
        
        </div>
    );
    }

export default Homepage;
