// pages/BudgetLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BudgetLogin = () => {
  const [rotaryId, setRotaryId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Hardcoded credentials for demo purposes
  // In a real application, this would be handled securely on the server
  const validCredentials = [
    { id: 'RID001', password: 'president2025' },
    { id: 'RID002', password: 'treasurer2025' },
    { id: 'RID003', password: 'secretary2025' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset any previous errors
    setError('');

    // Check if credentials are valid
    const isValid = validCredentials.some(
      cred => cred.id === rotaryId && cred.password === password
    );

    if (isValid) {
      // Store authentication status in localStorage
      localStorage.setItem('budgetAuth', JSON.stringify({
        isAuthenticated: true,
        rotaryId: rotaryId,
        timestamp: new Date().getTime()
      }));
      console.log('Login successful!');
      // Redirect to budget dashboard
      navigate('/budget-dashboard');
    } else {
      setError('Invalid Rotary ID or password. Please contact the club president.');
    }
  };

  return (
    <>
      {/* Page title banner */}
      <div className="w-full bg-blue-900 text-white py-6 px-6">
        <h1 className="text-2xl font-bold">BUDGET MANAGEMENT LOGIN</h1>
      </div>
      
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-800 text-white py-4 px-6">
              <h2 className="text-xl font-semibold">Restricted Access</h2>
              <p className="text-sm mt-1 text-blue-100">Please login with your credentials</p>
            </div>
            
            <form onSubmit={(e)=>{
                e.preventDefault()
                handleSubmit(e)}} className="p-6">
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="rotaryId" className="block text-gray-700 font-medium mb-2">
                  Rotary ID
                </label>
                <input
                  type="text"
                  id="rotaryId"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your Rotary ID"
                  value={rotaryId}
                  onChange={(e) => setRotaryId(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-6 rounded-md"
                >
                  Login
                </button>
              </div>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>For access credentials, please contact the club president</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetLogin;