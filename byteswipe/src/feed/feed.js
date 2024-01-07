import React from 'react';
import { useNavigate } from 'react-router-dom';
import './feed.css';


function Feed() {

    var url = 'https://newsapi.org/v2/top-headlines?' +
    'category=business&' +
    'country=us&' +
    'pageSize=100&' + 
    'apiKey=c48fc0a0e3224736b0f40b0e917b3558';

    const reqOptions = {
        method: 'GET',
        mode: 'cors',
    };

    fetch(url, reqOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Handle the data here (e.g., set state, render in component)
        })
        .catch(error => {
            console.error('Fetch error:', error);
            // Handle the error here
        });
    
    console.log('on feed');
    return (
        <h2>feed here</h2>
    );
}

export default Feed;
