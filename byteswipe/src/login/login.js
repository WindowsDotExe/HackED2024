import React, { useState } from 'react';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('username: ', username);
        console.log('password: ', password);
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
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