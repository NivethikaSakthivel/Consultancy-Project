// src/pages/Projects.jsx

import React from 'react';
import { useProjects } from '../context/ProjectsContext';
import ImageCarousel from './ImageCarousal';

// Import service images
import service1 from '../assets/service1.jpg';
import service2 from '../assets/service2.jpg';
import service3 from '../assets/service3.jpg';

const Projects = () => {
  const { projects } = useProjects();

  // Carousel images with optional captions and descriptions
  const carouselImages = [
    {
      src: service1,
      alt: "Service Project 1",
      caption: "Community Service Initiative",
      description: "Providing essential services to underserved communities"
    },
    {
      src: service2,
      alt: "Service Project 2",
      caption: "Educational Outreach Program",
      description: "Supporting youth education and development"
    },
    {
      src: service3,
      alt: "Service Project 3",
      caption: "Healthcare Awareness Campaign",
      description: "Promoting health awareness and preventive care"
    }
  ];

  // Function to get status badge styling
  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'Active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Completed':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Planning':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Upcoming':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'On Hold':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString || dateString === 'Ongoing') return dateString;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page title banner */}
      <div className="w-full bg-blue-900 text-white py-6 px-6">
        <h1 className="text-2xl font-bold">PROJECTS</h1>
      </div>

      <div className="container mx-auto py-8 px-4">
        {/* Featured Projects Carousel */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Featured Service Projects</h2>
          <ImageCarousel images={carouselImages} />
        </div>

        {/* Dynamic Projects Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-900">Our Projects</h2>
            <span className="text-sm text-gray-600">
              {projects.length} Active Project{projects.length !== 1 ? 's' : ''}
            </span>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Project Image - Show uploaded image or placeholder */}
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <p className="text-blue-700 font-medium text-sm">Project Image</p>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-blue-900 line-clamp-2">{project.title}</h3>
                      <span className={getStatusBadge(project.status)}>
                        {project.status}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Project Details */}
                    <div className="space-y-2 mb-4">
                      {project.date && (
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(project.date)}
                        </div>
                      )}

                      {project.location && (
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {project.location}
                        </div>
                      )}

                      {project.coordinator && (
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {project.coordinator}
                        </div>
                      )}

                      {project.budget && (
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          ₹{Number(project.budget).toLocaleString()}
                        </div>
                      )}
                    </div>

                    <button className="w-full bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-200">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Projects Available</h3>
              <p className="text-gray-500">Projects will appear here once they are added through the management dashboard.</p>
            </div>
          )}
        </div>

        {/* Static Project Cards (keeping original ones as examples) */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Featured Service Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={service1} 
                  alt="Community Service" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-blue-900">Community Service</h3>
                <p className="text-gray-600 mt-2">
                  Supporting local community with essential services and resources.
                </p>
                <button className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-200">
                  Learn More
                </button>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={service2} 
                  alt="Educational Initiative" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-blue-900">Educational Initiative</h3>
                <p className="text-gray-600 mt-2">
                  Providing educational support and resources to underprivileged children.
                </p>
                <button className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-200">
                  Learn More
                </button>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={service3} 
                  alt="Healthcare Awareness" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-blue-900">Healthcare Awareness</h3>
                <p className="text-gray-600 mt-2">
                  Promoting health awareness and preventive care in the community through workshops and campaigns.
                </p>
                <button className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-200">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-blue-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
          <p className="text-lg mb-6">
            Join us in making a difference in our community. Every contribution matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 px-6 rounded-md transition-colors duration-200">
              Volunteer Now
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-medium py-3 px-6 rounded-md transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;