// components/dashboard/ProjectsManager.jsx

import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectsContext';

const ProjectsManager = () => {
  const { projects, addProject, deleteProject, updateProject } = useProjects();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    coordinator: '',
    status: 'Planning',
    budget: ''
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
        // Update existing project
        updateProject(editingId, formData);
        setSuccess('Project updated successfully!');
      } else {
        // Add new project
        addProject(formData);
        setSuccess('Project added successfully!');
      }

      // Reset form
      resetForm();

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError('Failed to save project. Please try again.');
    }
  };

  const handleEdit = (project) => {
    setIsEditing(true);
    setEditingId(project.id);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      date: project.date || '',
      location: project.location || '',
      coordinator: project.coordinator || '',
      status: project.status || 'Planning',
      budget: project.budget || ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      setSuccess('Project deleted successfully!');
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
      date: '',
      location: '',
      coordinator: '',
      status: 'Planning',
      budget: ''
    });
    setIsEditing(false);
    setEditingId(null);
    setError('');
  };

  const statusOptions = ['Planning', 'Upcoming', 'Active', 'Completed', 'On Hold'];

  return (
    <div>
      <div className="mb-6 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          {isEditing ? 'Edit Project' : 'Add New Project'}
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
                Project Title*
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
              <label htmlFor="coordinator" className="block text-gray-700 font-medium mb-2">
                Coordinator
              </label>
              <input
                type="text"
                id="coordinator"
                name="coordinator"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.coordinator}
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
              <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.status}
                onChange={handleInputChange}
              >
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="budget" className="block text-gray-700 font-medium mb-2">
              Budget (₹)
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.budget}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-6 rounded-md"
            >
              {isEditing ? 'Update Project' : 'Add Project'}
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

      {/* Project List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Projects</h3>
        
        {projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-4 bg-gray-100 text-left text-sm font-medium text-gray-600 uppercase">Title</th>
                  <th className="py-3 px-4 bg-gray-100 text-left text-sm font-medium text-gray-600 uppercase">Status</th>
                  <th className="py-3 px-4 bg-gray-100 text-left text-sm font-medium text-gray-600 uppercase">Date</th>
                  <th className="py-3 px-4 bg-gray-100 text-right text-sm font-medium text-gray-600 uppercase">Budget</th>
                  <th className="py-3 px-4 bg-gray-100 text-center text-sm font-medium text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.map(project => (
                  <tr key={project.id}>
                    <td className="py-3 px-4 text-sm">{project.title}</td>
                    <td className="py-3 px-4 text-sm">
                      <span 
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          project.status === 'Active' ? 'bg-green-100 text-green-800' :
                          project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                          project.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                          project.status === 'Upcoming' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{project.date}</td>
                    <td className="py-3 px-4 text-sm text-right">
                      {project.budget ? `₹${Number(project.budget).toLocaleString()}` : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleEdit(project)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
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
            <p className="text-gray-500">No projects found. Add your first project above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsManager;