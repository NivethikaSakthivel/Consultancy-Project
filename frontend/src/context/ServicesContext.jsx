// context/ServicesContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

const ServicesContext = createContext(null);

export const ServicesProvider = ({ children }) => {
  // Initial dummy services data
  const initialServices = [
    { 
      id: '1', 
      title: 'Rotary Matriculation School', 
      description: 'A high-quality educational institution serving the community since 1963',
      contact: 'John Milton',
      phone: '91234 56789',
      email: 'rotaryschool@example.com',
      address: '123 Education Avenue, Tirupur'
    },
    { 
      id: '2', 
      title: 'Medical Equipment Library', 
      description: 'Free lending of medical equipment like wheelchairs, walkers, etc. to those in need',
      contact: 'Dr. Chandrasekar Ramkumar',
      phone: '91234 56780',
      email: 'medicallibrary@example.com',
      address: '456 Health Road, Tirupur'
    },
    { 
      id: '3', 
      title: 'Vocational Training Center', 
      description: 'Skills development for youth to enhance employment opportunities',
      contact: 'Gandeepan A L',
      phone: '91234 56781',
      email: 'vocational@example.com',
      address: '789 Skills Street, Tirupur'
    },
    { 
      id: '4', 
      title: 'Community Hall', 
      description: 'Venue for community events and functions at affordable rates',
      contact: 'Annamalai P',
      phone: '91234 56782',
      email: 'communityhall@example.com',
      address: '101 Community Circle, Tirupur'
    }
  ];

  // Services state
  const [services, setServices] = useState([]);

  // Load services from localStorage on initial render
  useEffect(() => {
    const savedServices = localStorage.getItem('rotaryServices');
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    } else {
      setServices(initialServices);
      localStorage.setItem('rotaryServices', JSON.stringify(initialServices));
    }
  }, []);

  // Save services to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('rotaryServices', JSON.stringify(services));
  }, [services]);

  // Add a new service
  const addService = (service) => {
    const newService = {
      id: Date.now().toString(),
      ...service
    };
    setServices(prev => [...prev, newService]);
    return newService;
  };

  // Delete a service
  const deleteService = (id) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  // Update a service
  const updateService = (id, updatedService) => {
    setServices(prev => 
      prev.map(service => service.id === id ? { ...service, ...updatedService } : service)
    );
  };

  return (
    <ServicesContext.Provider 
      value={{ 
        services, 
        addService, 
        deleteService, 
        updateService 
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => useContext(ServicesContext);

export default ServicesContext;