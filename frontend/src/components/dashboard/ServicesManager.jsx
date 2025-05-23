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
    address: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      setSelectedFileName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        setFormData(prev => ({ ...prev, image: base64String }));
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation - all fields are now required
    if (!formData.title || !formData.description || !formData.contact || !formData.phone || !formData.email || !formData.address) {
      setError('All fields are required');
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
    setImagePreview(service.image || '');
    setSelectedFileName('');
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
      address: '',
      image: ''
    });
    setIsEditing(false);
    setEditingId(null);
    setError('');
    setImagePreview('');
    setSelectedFileName('');
    // Reset file input
    const fileInput = document.getElementById('image');
    if (fileInput) fileInput.value = '';
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
                Contact Person*
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.contact}
                onChange={handleInputChange}
                required
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

          {/* Image Upload Section */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
              Service Image
            </label>
            <div className="flex items-center gap-4">
              <label htmlFor="image" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer text-sm font-medium transition-colors">
                Choose File
              </label>
              <span className="text-gray-600 text-sm">
                {selectedFileName || 'No file chosen'}
              </span>
            </div>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <p className="text-sm text-gray-500 mt-1">
              Supported formats: JPG, PNG, GIF. Max size: 5MB
            </p>
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={imagePreview}
                  alt="Service preview"
                  className="w-32 h-32 object-cover rounded-md border border-gray-300"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                Phone*
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                Address*
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.address}
                onChange={handleInputChange}
                required
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <div key={service.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {/* Service Image */}
                <div className="h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-2 bg-blue-200 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                          </svg>
                        </div>
                        <p className="text-sm text-blue-600 font-medium">Service</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Service Content */}
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {service.description.length > 120 
                      ? `${service.description.substring(0, 120)}...` 
                      : service.description}
                  </p>
                  
                  {/* Contact Info */}
                  <div className="space-y-1 mb-4">
                    {service.contact && (
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Contact:</span> {service.contact}
                      </p>
                    )}
                    {service.phone && (
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Phone:</span> {service.phone}
                      </p>
                    )}
                    {service.email && (
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Email:</span> {service.email}
                      </p>
                    )}
                    {service.address && (
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Address:</span> {service.address}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
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