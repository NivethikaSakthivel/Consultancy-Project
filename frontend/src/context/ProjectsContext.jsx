// src/components/context/ProjectsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectsContext = createContext(null);

export const ProjectsProvider = ({ children }) => {
  // Initial dummy projects data
  const initialProjects = [
    { 
      id: '1', 
      title: 'Community Health Camp', 
      description: 'Free health checkups and medicine distribution for underprivileged communities',
      date: '2025-05-15',
      location: 'Tirupur Government Hospital',
      coordinator: 'Dr. Krishnan B',
      status: 'Upcoming',
      budget: 25000
    },
    { 
      id: '2', 
      title: 'Clean Water Initiative', 
      description: 'Installation of water purifiers in rural schools',
      date: '2025-06-20',
      location: 'Various Schools in Tirupur District',
      coordinator: 'Gopalsamy R',
      status: 'Planning',
      budget: 50000
    },
    { 
      id: '3', 
      title: 'Tree Plantation Drive', 
      description: 'Planting 500 saplings across the city',
      date: '2025-07-05',
      location: 'Tirupur City Parks',
      coordinator: 'Maheshwaran T',
      status: 'Upcoming',
      budget: 15000
    },
    { 
      id: '4', 
      title: 'Education Sponsorship', 
      description: 'Providing educational materials and scholarships to deserving students',
      date: 'Ongoing',
      location: 'Rotary Matriculation School',
      coordinator: 'Rajesh Kumar P',
      status: 'Active',
      budget: 100000
    }
  ];

  // Projects state
  const [projects, setProjects] = useState([]);

  // Load projects from localStorage on initial render
  useEffect(() => {
    const savedProjects = localStorage.getItem('rotaryProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(initialProjects);
      localStorage.setItem('rotaryProjects', JSON.stringify(initialProjects));
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('rotaryProjects', JSON.stringify(projects));
  }, [projects]);

  // Add a new project
  const addProject = (project) => {
    const newProject = {
      id: Date.now().toString(),
      ...project
    };
    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  // Delete a project
  const deleteProject = (id) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  // Update a project
  const updateProject = (id, updatedProject) => {
    setProjects(prev => 
      prev.map(project => project.id === id ? { ...project, ...updatedProject } : project)
    );
  };

  return (
    <ProjectsContext.Provider 
      value={{ 
        projects, 
        addProject, 
        deleteProject, 
        updateProject 
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);

export default ProjectsContext;