import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="w-full bg-blue-900 text-white py-6 px-6">
        <h1 className="text-2xl font-bold">WELCOME TO ROTARY CLUB OF TIRUPUR</h1>
      </div>
      
      <div className="bg-gray-50 p-6">
        <div className="container mx-auto">
          {/* Hero section */}
          <div className="mb-8">
            <img src="/api/placeholder/1200/400" alt="Rotary Club Banner" className="w-full rounded-lg" />
          </div>
          
          {/* Introduction */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Service Above Self</h2>
            <p className="mb-4">
              Welcome to the Rotary Club of Tirupur! Founded in 1955, we are proudly the first Rotary Club in Tirupur and the fifth in Tamil Nadu. Our club has grown from strength to strength over the decades, becoming a cornerstone of community service in the region.
            </p>
            <Link to="/about" className="text-blue-700 font-bold hover:underline">
              Learn more about our history →
            </Link>
          </div>
          
          {/* Featured projects */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <img src="/api/placeholder/400/200" alt="Education Project" className="w-full rounded-lg mb-4" />
                <h3 className="font-bold mb-2">Education Initiatives</h3>
                <p className="text-sm">Our flagship Rotary Matriculation School has been providing quality education since 1963.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <img src="/api/placeholder/400/200" alt="Health Project" className="w-full rounded-lg mb-4" />
                <h3 className="font-bold mb-2">Health & Wellness</h3>
                <p className="text-sm">Regular health camps and initiatives to improve community wellbeing.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <img src="/api/placeholder/400/200" alt="Community Project" className="w-full rounded-lg mb-4" />
                <h3 className="font-bold mb-2">Community Development</h3>
                <p className="text-sm">Supporting local industries and economic growth in the Tirupur region.</p>
              </div>
            </div>
          </div>
          
          {/* Upcoming events */}
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-4">Upcoming Events</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <ul className="divide-y">
                <li className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold">Monthly Meeting</h3>
                      <p className="text-sm">Regular club meeting with guest speaker</p>
                    </div>
                    <div className="text-sm text-gray-500">April 15, 2025</div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold">Community Service Day</h3>
                      <p className="text-sm">Tree planting initiative at local park</p>
                    </div>
                    <div className="text-sm text-gray-500">April 22, 2025</div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold">Fundraising Gala</h3>
                      <p className="text-sm">Annual dinner to support education projects</p>
                    </div>
                    <div className="text-sm text-gray-500">May 10, 2025</div>
                  </div>
                </li>
              </ul>
              <div className="mt-4 text-center">
                <Link to="/calendar" className="text-blue-700 font-bold hover:underline">
                  View all events →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;