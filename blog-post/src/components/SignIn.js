import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './SignIn.css'; // Import the provided CSS file
import axios from 'axios';

function SignIn() {
  const navigate = useNavigate();
  const { user, login } = useOutletContext(); // Access the user state from the context

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a GET request to fetch the existing users from the server
      const response = await axios.get('http://localhost:8002/users');
      const users = response.data;
      const foundUser = users.find(
        (user) =>
          user.username === formData.username &&
          user.password === formData.password
      );
      if (foundUser) {
        // If the user is found, set isAuthenticated to true
        navigate('/');
        login(foundUser);
      } else {
        // If the user is not found, display an alert
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in. Please try again later.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="header-container"> {/* Div for header */}
        <h1 className="header">EXPLORE CAPTIVATING BLOG POSTS!</h1> {/* Apply header with specified text */}
      </div>
      <div className="background-container"> {/* Apply background-container class */}
        <div className="login"> {/* Apply login class for the styling */}
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>{' '}
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>{' '}
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit" className="button">Login</button>{' '} {/* Apply button class */}
            <div className="register-user">
              <span>Not a registered user? </span>{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="btn btn-link">
                Create an account{' '}
              </button>{' '}
            </div>{' '}
          </form>{' '}
        </div>
      </div>
    </div>
  );
}


export default SignIn;
