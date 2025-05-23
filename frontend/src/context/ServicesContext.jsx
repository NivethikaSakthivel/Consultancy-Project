// src/context/ServicesContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

const ServicesContext = createContext(null);

export const ServicesProvider = ({ children }) => {
  // Initial dummy services data with placeholder images
  const initialServices = [
    { 
      id: '1', 
      title: 'Rotary Matriculation School', 
      description: 'A high-quality educational institution serving the community since 1963. Providing excellent education with modern facilities and experienced faculty.',
      contact: 'John Milton',
      phone: '91234 56789',
      email: 'rotaryschool@example.com',
      address: '123 Education Avenue, Tirupur',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzAyNWZmIi8+CjxwYXRoIGQ9Ik0yMDAgNTBMMjUwIDEwMEgxNTBMMjAwIDUwWiIgZmlsbD0iI2ZmZmZmZiIvPgo8cmVjdCB4PSIxNzAiIHk9IjEwMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZmZmZiIvPgo8cmVjdCB4PSIxMDAiIHk9IjEyMCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZmZmZmZmIi8+CjxyZWN0IHg9IjI1MCIgeT0iMTIwIiB3aWR0aD0iNTAiIGhlaWdodD0iODAiIGZpbGw9IiNmZmZmZmYiLz4KPHN2ZyB4PSIxNzAiIHk9IjIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjIwIj4KICA8dGV4dCB4PSIzMCIgeT0iMTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzMwMjVmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RURVU0FUSU9OPC90ZXh0Pgo8L3N2Zz4KPC9zdmc+'
    },
    { 
      id: '2', 
      title: 'Medical Equipment Library', 
      description: 'Free lending of medical equipment like wheelchairs, walkers, hospital beds, and other assistive devices to those in need within our community.',
      contact: 'Dr. Chandrasekar Ramkumar',
      phone: '91234 56780',
      email: 'medicallibrary@example.com',
      address: '456 Health Road, Tirupur',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZGMzNTQ1Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNjAiIGZpbGw9IiNmZmZmZmYiLz4KPHN2ZyB4PSIxNzAiIHk9IjEyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIj4KICA8cGF0aCBkPSJNMzAgMTVIMTVWMzBIMTVWMTVIMzBWMTVaIiBmaWxsPSIjZGMzNTQ1Ii8+CiAgPHBhdGggZD0iTTE1IDIwSDMwVjI1SDE1VjIwWiIgZmlsbD0iI2RjMzU0NSIvPgogIDxwYXRoIGQ9Ik0yMCAxMFYzNUgyNVYxMEgyMFoiIGZpbGw9IiNkYzM1NDUiLz4KPC9zdmc+Cjx0ZXh0IHg9IjIwMCIgeT0iMjMwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk1FRElDQUwgU0VSVklDRTwvdGV4dD4KPC9zdmc+'
    },
    { 
      id: '3', 
      title: 'Vocational Training Center', 
      description: 'Comprehensive skills development programs for youth to enhance employment opportunities in various trades including computer skills, tailoring, and technical training.',
      contact: 'Gandeepan A L',
      phone: '91234 56781',
      email: 'vocational@example.com',
      address: '789 Skills Street, Tirupur',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMDU5NjY5Ii8+CjxyZWN0IHg9IjE1MCIgeT0iMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZmZmZmZmIi8+CjxyZWN0IHg9IjE2MCIgeT0iMTEwIiB3aWR0aD0iODAiIGhlaWdodD0iNjAiIGZpbGw9IiMwNTk2NjkiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iMjEwIiByPSIzMCIgZmlsbD0iI2ZmZmZmZiIvPgo8Y2lyY2xlIGN4PSIxNDAiIGN5PSIyMTAiIHI9IjE1IiBmaWxsPSIjZmZmZmZmIi8+CjxjaXJjbGUgY3g9IjI2MCIgY3k9IjIxMCIgcj0iMTUiIGZpbGw9IiNmZmZmZmYiLz4KPHN2ZyB4PSIxNzAiIHk9IjI0NSIgd2lkdGg9IjYwIiBoZWlnaHQ9IjIwIj4KICA8dGV4dCB4PSIzMCIgeT0iMTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzA1OTY2OSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U0tJTExTPC90ZXh0Pgo8L3N2Zz4KPC9zdmc+'
    },
    { 
      id: '4', 
      title: 'Community Hall', 
      description: 'Spacious venue for community events, weddings, cultural programs, and business meetings at affordable rates. Modern facilities with air conditioning and catering support.',
      contact: 'Annamalai P',
      phone: '91234 56782',
      email: 'communityhall@example.com',
      address: '101 Community Circle, Tirupur',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNzc0OEJDIi8+CjxyZWN0IHg9IjUwIiB5PSIxMDAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMTIwIiBmaWxsPSIjZmZmZmZmIi8+CjxyZWN0IHg9IjYwIiB5PSIxMTAiIHdpZHRoPSIyODAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNzc0OEJDIi8+CjxyZWN0IHg9IjE5MCIgeT0iNzAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNmZmZmZmYiLz4KPHJlY3QgeD0iMTcwIiB5PSI3MCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjE4MCIgZmlsbD0iI2ZmZmZmZiIvPgo8cmVjdCB4PSIyMjAiIHk9IjcwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTgwIiBmaWxsPSIjZmZmZmZmIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjcwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNPTU1VTklUWSBIQUxMPC90ZXh0Pgo8L3N2Zz4='
    },
    { 
      id: '5', 
      title: 'Blood Donation Drives', 
      description: 'Regular blood donation camps organized monthly to support local hospitals and emergency medical needs. All blood types welcome.',
      contact: 'Dr. Sarah Wilson',
      phone: '91234 56783',
      email: 'blooddrive@example.com',
      address: 'Various Locations, Tirupur',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRTUzRTNFIi8+CjxwYXRoIGQ9Ik0yMDAgNzBDMTgwIDcwIDE2MCA4MCAxNjAgMTEwQzE2MCA0MCAxODAgMTUwIDIwMCAyMDBDMjIwIDE1MCAyNDAgMTQwIDI0MCAxMTBDMjQwIDgwIDIyMCA3MCAyMDAgNzBaIiBmaWxsPSIjZmZmZmZmIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJMT09EIERPTkFUSU9OPC90ZXh0Pgo8L3N2Zz4='
    },
    { 
      id: '6', 
      title: 'Senior Citizen Support', 
      description: 'Dedicated support services for elderly community members including health checkups, social activities, and assistance with daily needs.',
      contact: 'Mrs. Priya Nair',
      phone: '91234 56784',
      email: 'seniors@example.com',
      address: '202 Care Center, Tirupur',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkY5NTAwIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEyMCIgcj0iNDAiIGZpbGw9IiNmZmZmZmYiLz4KPGVsbGlwc2UgY3g9IjIwMCIgY3k9IjIwMCIgcng9IjYwIiByeT0iNDAiIGZpbGw9IiNmZmZmZmYiLz4KPHN2ZyB4PSIxNDAiIHk9IjE3MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTQwIDEwQzMwIDEwIDIwIDIwIDIwIDMwQzIwIDQwIDMwIDUwIDQwIDUwSDgwQzkwIDUwIDEwMCA0MCAEwMCA0MFA2IDMwQzEwMCAyMCA5MCAMTAgODAgMTBINDBaIiBmaWxsPSIjRkY5NTAwIi8+Cjwvc3ZnPgo8dGV4dCB4PSIyMDAiIHk9IjI3MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TRU5JT1IgQ0FSRTY8L3RleHQ+Cjwvc3ZnPgo8L3N2Zz4='
    }
  ];

  const [services, setServices] = useState(initialServices);

  // Generate unique ID for new services
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Add new service
  const addService = (serviceData) => {
    const newService = {
      id: generateId(),
      ...serviceData,
      createdAt: new Date().toISOString()
    };
    setServices(prev => [...prev, newService]);
    return newService;
  };

  // Update existing service
  const updateService = (id, updatedData) => {
    setServices(prev => 
      prev.map(service => 
        service.id === id 
          ? { ...service, ...updatedData, updatedAt: new Date().toISOString() }
          : service
      )
    );
  };

  // Delete service
  const deleteService = (id) => {
    // Prevent deletion of initial dummy services (optional protection)
    const initialIds = ['1', '2', '3', '4', '5', '6'];
    if (initialIds.includes(id)) {
      if (!window.confirm('This is a default club service. Are you sure you want to delete it?')) {
        return false;
      }
    }
    
    setServices(prev => prev.filter(service => service.id !== id));
    return true;
  };

  // Get service by ID
  const getServiceById = (id) => {
    return services.find(service => service.id === id);
  };

  // Search services
  const searchServices = (query) => {
    if (!query) return services;
    
    const lowercaseQuery = query.toLowerCase();
    return services.filter(service =>
      service.title.toLowerCase().includes(lowercaseQuery) ||
      service.description.toLowerCase().includes(lowercaseQuery) ||
      service.contact?.toLowerCase().includes(lowercaseQuery) ||
      service.address?.toLowerCase().includes(lowercaseQuery)
    );
  };

  // Get services by category (if you want to add categories later)
  const getServicesByCategory = (category) => {
    return services.filter(service => service.category === category);
  };

  // Clear all services (for testing purposes)
  const clearAllServices = () => {
    if (window.confirm('Are you sure you want to delete all services? This cannot be undone.')) {
      setServices([]);
    }
  };

  // Reset to initial services
  const resetToDefaultServices = () => {
    if (window.confirm('This will restore the default club services and remove any custom services. Continue?')) {
      setServices(initialServices);
    }
  };

  // Context value
  const contextValue = {
    services,
    addService,
    updateService,
    deleteService,
    getServiceById,
    searchServices,
    getServicesByCategory,
    clearAllServices,
    resetToDefaultServices,
    serviceCount: services.length
  };

  return (
    <ServicesContext.Provider value={contextValue}>
      {children}
    </ServicesContext.Provider>
  );
};

// Custom hook to use the Services context
export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};

// Export the context for advanced usage
export default ServicesContext;