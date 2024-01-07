import React from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';

function Homepage() {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login'); // The path you set for your login route
    };
    return (
        <div className="homepage-container">
            <link href='https://fonts.googleapis.com/css?family=Lexend Deca' rel='stylesheet'></link>

            <h1> ByteSwipe! </h1> 
            
            <h2> This is dummy text. This is more dummy text. This is more dummy text. </h2>
            
            <div className='button-container'>
                <button > Register </button>
                <button onClick={navigateToLogin}> Login </button>
            </div>
        
        </div>
    );
    }

export default Homepage;
