//pages/BudgetLogin.jsx:
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BudgetLogin = () => {
  const [rotaryId, setRotaryId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/budget-dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!rotaryId.trim() || !password.trim()) {
      setError('Please enter both Rotary ID and password');
      return;
    }

    // Attempt login
    try {
      const success = login(rotaryId, password);
      
      if (success) {
        navigate('/budget-dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page title banner
      <div className="w-full bg-blue-900 text-white py-6 px-6">
        <h1 className="text-2xl font-bold">BUDGET MANAGEMENT LOGIN</h1>
      </div> */}

      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-700 p-4">
            <h2 className="text-xl text-white font-bold text-center">Restricted Access</h2>
            <p className="text-white text-center text-sm mt-1">Please login with your credentials</p>
          </div>
          
          <div className="p-6">
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Rotary ID</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your Rotary ID"
                  value={rotaryId}
                  onChange={(e) => setRotaryId(e.target.value)}
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Login
              </button>
            </form>
            
            <p className="mt-6 text-center text-sm text-gray-600">
              For access credentials, please contact the club president
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetLogin;