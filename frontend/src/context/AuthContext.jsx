import React, { createContext, useState, useContext, useEffect } from 'react';

// Create auth context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const authData = JSON.parse(localStorage.getItem('budgetAuth') || '{}');
        
        if (authData.isAuthenticated) {
          // Optional: Check if the session has expired (e.g., after 30 minutes)
          const currentTime = new Date().getTime();
          const thirtyMinutes = 30 * 60 * 1000;
          
          if (authData.timestamp && currentTime - authData.timestamp > thirtyMinutes) {
            // Session expired
            localStorage.removeItem('budgetAuth');
            setIsAuthenticated(false);
            setUserData(null);
          } else {
            // Valid session
            setIsAuthenticated(true);
            setUserData(authData);
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        localStorage.removeItem('budgetAuth');
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = (rotaryId, password) => {
    // In a real app, you would validate credentials against a backend
    // For this example, we'll simulate a successful login with any input
    
    // Create auth data with timestamp for session management
    const authData = {
      isAuthenticated: true,
      rotaryId,
      timestamp: new Date().getTime()
    };
    
    // Save to localStorage
    localStorage.setItem('budgetAuth', JSON.stringify(authData));
    
    // Update state
    setIsAuthenticated(true);
    setUserData(authData);
    
    return true;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('budgetAuth');
    setIsAuthenticated(false);
    setUserData(null);
  };

  // Context value
  const value = {
    isAuthenticated,
    userData,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};