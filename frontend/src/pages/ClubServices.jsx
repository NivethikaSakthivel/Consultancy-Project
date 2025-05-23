// src/components/pages/ClubServices.jsx
import React from 'react';
import { useServices } from '../context/ServicesContext';

const ClubServices = () => {
  const { services } = useServices();

  return (
    <>
      <div className="w-full bg-blue-900 text-white py-6 px-6">
        <h1 className="text-2xl font-bold">CLUB SERVICES</h1>
        <p className="mt-2 text-blue-100">Discover the various services offered by Rotary Club of Avinashi</p>
      </div>
      
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="container mx-auto">
          {/* Introduction Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Our Community Services</h2>
            <p className="text-gray-700 leading-relaxed">
              The Rotary Club of Avinashi is committed to serving our community through various initiatives 
              and services. We believe in making a positive impact in the lives of people around us. 
              Below are the services we offer to our community members.
            </p>
          </div>

          {/* Services Grid */}
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map(service => (
                <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Service Image */}
                  <div className="h-64 bg-gray-100 overflow-hidden">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-3 bg-blue-200 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                          </div>
                          <p className="text-blue-600 font-medium">Community Service</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Service Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Contact Information */}
                    <div className="border-t pt-4 space-y-2">
                      <h4 className="font-semibold text-gray-800 mb-2">Contact Information</h4>
                      
                      {service.contact && (
                        <div className="flex items-center text-sm text-gray-700">
                          <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          <strong>Contact Person:</strong> {service.contact}
                        </div>
                      )}
                      
                      {service.phone && (
                        <div className="flex items-center text-sm text-gray-700">
                          <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                          <strong>Phone:</strong> {service.phone}
                        </div>
                      )}
                      
                      {service.email && (
                        <div className="flex items-center text-sm text-gray-700">
                          <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.45a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                          <strong>Email:</strong> {service.email}
                        </div>
                      )}
                      
                      {service.address && (
                        <div className="flex items-start text-sm text-gray-700">
                          <svg className="w-4 h-4 mr-2 mt-0.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <div>
                            <strong>Address:</strong><br />
                            {service.address}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-3">
                      {service.phone && (
                        <button 
                          onClick={() => window.open(`tel:${service.phone}`, '_self')}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                          Call Now
                        </button>
                      )}
                      {service.email && (
                        <button 
                          onClick={() => window.open(`mailto:${service.email}`, '_self')}
                          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                          Email
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-500 mb-2">No Services Available</h3>
              <p className="text-gray-400">Services information will be displayed here when available.</p>
            </div>
          )}

          {/* Call to Action Section */}
          <div className="mt-12 bg-blue-900 rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Need Help or Have Questions?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Our Rotary Club is here to serve the community. If you need assistance with any of our services 
              or have questions about how we can help, please don't hesitate to reach out to us.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 px-6 rounded-md transition-colors duration-200">
                Contact Us
              </button>
              <button className="border-2 border-white hover:bg-white hover:text-blue-900 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200">
                Learn More About Rotary
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubServices;