// context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on initial load
    const checkAuth = () => {
      const authData = JSON.parse(localStorage.getItem('budgetAuth') || '{}');
      
      if (authData.isAuthenticated) {
        setIsAuthenticated(true);
        setUser({ id: authData.rotaryId });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = (userData) => {
    localStorage.setItem('budgetAuth', JSON.stringify({
      isAuthenticated: true,
      rotaryId: userData.rotaryId,
      timestamp: new Date().getTime()
    }));
    
    setIsAuthenticated(true);
    setUser({ id: userData.rotaryId });
  };

  const logout = () => {
    localStorage.removeItem('budgetAuth');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;