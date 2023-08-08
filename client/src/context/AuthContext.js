import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
      fetchUserDetails(accessToken);
    }
    // eslint-disable-next-line
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const userData = {
        email,
        password,
      };
      const response = await axios.post('https://blog-mern-app-c78l.onrender.com/api/users/login', userData);
      const { accessToken } = response.data;
      // console.log(accessToken);

      localStorage.setItem('accessToken', accessToken);
      setIsLoggedIn(true);

      await fetchUserDetails(accessToken);

      console.log('User logged in successfully!');
    } catch (error) {
      console.error('Error logging in user:', error);
      console.log('Failed to login user. Please try again.');
    }
  };

  const fetchUserDetails = async (accessToken) => {
    try {
      const response = await fetch('https://blog-mern-app-c78l.onrender.com/api/users/current', {
        headers: {
          Authorization: accessToken,
        },
      });

      if (response.status === 403) {
        // Access token is expired or invalid, navigate the user to the login page
        setUser(null);
        handleLogout()// Optionally, clear the expired token from localStorage
        // window.location.href = '/login'; // Replace '/login' with your actual login page URL
        return;
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setUser(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    console.log('User logged out successfully!');
  };

  const handleRegister = async (fullName, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    try {
      const userData = {
        fullName,
        email,
        password,
      };
      await axios.post('https://blog-mern-app-c78l.onrender.com/api/users/register', userData);

      console.log('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error);
      console.log('Failed to register user. Please try again.');
    }
  };

  const contextValue = {
    user,
    isLoggedIn,
    handleLogin,
    handleLogout,
    handleRegister,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
