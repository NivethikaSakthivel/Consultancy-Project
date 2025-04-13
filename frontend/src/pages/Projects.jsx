import React from 'react';
import ImageCarousel from './ImageCarousal';

// Import service images
import service1 from '../assets/service1.jpg';
import service2 from '../assets/service2.jpg';
import service3 from '../assets/service3.jpg';

const Projects = () => {
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

        {/* Projects List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project Card 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <img 
                src={service1} 
                alt="Community Service" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-blue-900">Community Service</h3>
              <p className="text-gray-600 mt-2">
                Supporting local community with essential services and resources.
              </p>
              <button className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800">
                Learn More
              </button>
            </div>
          </div>

          {/* Project Card 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <img 
                src={service2} 
                alt="Educational Initiative" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-blue-900">Educational Initiative</h3>
              <p className="text-gray-600 mt-2">
                Providing educational support and resources to underprivileged children.
              </p>
              <button className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800">
                Learn More
              </button>
            </div>
          </div>

          {/* Project Card 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <img 
                src={service3} 
                alt="Healthcare Awareness" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-blue-900">Healthcare Awareness</h3>
              <p className="text-gray-600 mt-2">
                Promoting health awareness and preventive care in rural communities.
              </p>
              <button className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;