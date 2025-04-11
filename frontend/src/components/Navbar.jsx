// components/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  
  // Navigation items with their paths
  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'DIRECTORY', path: '/directory' },
    { name: 'DIRECTORS', path: '/directors' },
    { name: 'CALENDAR', path: '/calendar' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'CLUB SERVICES', path: '/club-services' },
    { name: 'PAST PRESIDENTS', path: '/past-presidents' },
    // New navigation item for Budget/Management
    { name: 'BUDGET/MANAGEMENT', path: isAuthenticated ? '/budget-dashboard' : '/budget-login' },
  ];

  return (
    <header>
      {/* Top navy bar with login */}
      <div className="w-full bg-blue-900 text-white py-4 px-6 flex justify-between items-center">
        <div className="flex gap-4">
          <div className="border border-white rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </div>
          <div className="border border-white rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
        </div>
        <button className="bg-white text-blue-900 px-4 py-2 rounded-md flex items-center gap-2">
          Login
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* Logo and app download section */}
      <div className="w-full bg-white py-4 px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src="/api/placeholder/80/80" alt="Rotary Logo" className="h-16" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-blue-900">Rotary</span>
            <span className="text-sm text-blue-900">Club of Tirupur</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <span>Download the Rotary India Mobile App</span>
          <button className="bg-gray-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2H2v10h10V2z"/>
              <path d="M12 12H2v10h10V12z"/>
              <path d="M22 2h-10v10h10V2z"/>
              <path d="M22 12h-10v10h10V12z"/>
            </svg>
          </button>
          <button className="bg-gray-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Main navigation menu */}
      <nav className="w-full bg-gray-100 px-6">
        <ul className="flex justify-start gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  isActive 
                    ? "py-4 block text-blue-700 font-bold border-b-2 border-blue-700" 
                    : "py-4 block hover:text-blue-700 font-medium"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;