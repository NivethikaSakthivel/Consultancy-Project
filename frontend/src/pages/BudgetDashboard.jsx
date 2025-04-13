import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BudgetForm from '../components/dashboard/BudgetForm';
import BudgetTable from '../components/dashboard/BudgetTable';
import ProjectsManager from '../components/dashboard/ProjectsManager';
import ServicesManager from '../components/dashboard/ServicesManager';
import TabNavigation from '../components/dashboard/TabNavigation';
import { useAuth } from '../context/AuthContext';

const BudgetDashboard = () => {
  const navigate = useNavigate();
  const { userData, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('budget'); // 'budget', 'projects', 'services'

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Determine what content to show based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'budget':
        return (
          <>
            <BudgetForm />
            <div className="mt-6">
              <BudgetTable />
            </div>
          </>
        );
      case 'projects':
        return <ProjectsManager />;
      case 'services':
        return <ServicesManager />;
      default:
        return <BudgetForm />;
    }
  };

  const tabs = [
    { id: 'budget', label: 'Budget Management' },
    { id: 'projects', label: 'Projects Management' },
    { id: 'services', label: 'Club Services Management' }
  ];

  return (
    <>
      {/* Page title banner */}
      <div className="w-full bg-blue-900 text-white py-6 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">BUDGET & MANAGEMENT DASHBOARD</h1>
        {/* <button
          onClick={handleLogout}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm"
        >
          Logout
        </button> */}
      </div>

      <div className="bg-gray-50 min-h-screen p-6">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-xl font-semibold text-blue-900">Welcome, {userData?.rotaryId}</h2>
              <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                Authorized User
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              This is the management dashboard for the Rotary Club of Avinashi. 
              Here you can manage the club's budget, projects, and services.
            </p>
          </div>

          {/* Tab Navigation */}
          <TabNavigation 
            tabs={tabs} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />

          {/* Tab Content */}
          <div className="mt-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetDashboard;