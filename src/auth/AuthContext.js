// File: /client/auth/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const AuthContext = createContext(null);

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user token exists in localStorage
    const checkAuthStatus = () => {
      const token = localStorage.getItem('userToken');
      
      if (token) {
        // In a real app, we would validate the token with the backend
        // For this demo, we'll just set a mock user
        setCurrentUser({
          id: '123',
          name: 'John Doe',
          email: 'john.doe@example.com',
        });
      } else {
        setCurrentUser(null);
      }
      
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Mock login function - in a real app, this would make an API call
  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, accept any email/password combination
        const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
        localStorage.setItem('userToken', mockToken);
        
        setCurrentUser({
          id: '123',
          name: 'John Doe',
          email: email,
        });
        
        resolve({ success: true });
      }, 800);
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('userToken');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;