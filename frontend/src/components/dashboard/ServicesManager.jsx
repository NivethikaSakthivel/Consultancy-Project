// components/dashboard/ServicesManager.jsx

import React, { useState } from 'react';
import { useServices } from '../../context/ServicesContext';

const ServicesManager = () => {
  const { services, addService, deleteService, updateService } = useServices();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contact: '',
    phone: '',
    email: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.title || !formData.description) {
      setError('Title and description are required');
      return;
    }

    try {
      if (isEditing && editingId) {
        // Update existing service
        updateService(editingId, formData);
        setSuccess('Service updated successfully!');
      } else {
        // Add new service
        addService(formData);
        setSuccess('Service added successfully!');
      }

      // Reset form
      resetForm();

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError('Failed to save service. Please try again.');
    }
  };

  const handleEdit = (service) => {
    setIsEditing(true);
    setEditingId(service.id);
    setFormData({
      title: service.title || '',
      description: service.description || '',
      contact: service.contact || '',
      phone: service.phone || '',
      email: service.email || '',
      address: service.address || ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteService(id);
      setSuccess('Service deleted successfully!');
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      contact: '',
      phone: '',
      email: '',
      address: ''
    });
    setIsEditing(false);
    setEditingId(null);
    setError('');
  };

  return (
    <div>
      <div className="mb-6 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          {isEditing ? 'Edit Service' : 'Add New Club Service'}
        </h3>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                Service Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="contact" className="block text-gray-700 font-medium mb-2">
                Contact Person
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.contact}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-6 rounded-md"
            >
              {isEditing ? 'Update Service' : 'Add Service'}
            </button>
            
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded-md"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Service List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Club Services</h3>
        
        {services.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-4 bg-gray-100 text-left text-sm font-medium text-gray-600 uppercase">Title</th>
                  <th className="py-3 px-4 bg-gray-100 text-left text-sm font-medium text-gray-600 uppercase">Description</th>
                  <th className="py-3 px-4 bg-gray-100 text-left text-sm font-medium text-gray-600 uppercase">Contact</th>
                  <th className="py-3 px-4 bg-gray-100 text-center text-sm font-medium text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {services.map(service => (
                  <tr key={service.id}>
                    <td className="py-3 px-4 text-sm">{service.title}</td>
                    <td className="py-3 px-4 text-sm">
                      {service.description.length > 100 ? `${service.description.substring(0, 100)}...` : service.description}
                    </td>
                    <td className="py-3 px-4 text-sm">{service.contact}</td>
                    <td className="py-3 px-4 text-sm text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleEdit(service)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No club services found. Add your first service above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesManager;