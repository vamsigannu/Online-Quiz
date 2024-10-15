import React, { useState } from 'react';
import './Login.css'; 

function Signup({ onSignupSuccess, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    alert('Signup successful! Please login.');
    onSignupSuccess(); 
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
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
      <button onClick={handleSignup}>Signup</button>
      <p className="go-to-login">
        Already have an account?{' '}
        <button className="link-button" onClick={onLogin}>
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;
