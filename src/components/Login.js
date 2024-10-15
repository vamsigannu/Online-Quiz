import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin, onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const storedUser = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUser && password === storedPassword) {
      onLogin(true);
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleLogin}>Login</button>
      <button onClick={onSignup}>Signup</button>
    </div>
  );
};

export default Login;
