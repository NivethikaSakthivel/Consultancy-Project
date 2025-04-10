// components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const links = [
    { name: 'Rotary.org', url: 'https://www.rotary.org' },
    { name: 'Rotary India', url: 'https://rotaryindia.org' },
    { name: 'Rotary Fellowship', url: '#' },
    { name: 'Global Rewards', url: '#' },
    { name: 'Rotary Blog', url: '#' }
  ];
  
  return (
    <footer className="bg-black text-white p-6">
      <div className="container mx-auto">
        <h2 className="text-xl font-bold mb-4">Quick Links</h2>
        <ul>
          {links.map((link) => (
            <li key={link.name} className="mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 pt-4 border-t border-gray-700 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Rotary Club of Tirupur. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;