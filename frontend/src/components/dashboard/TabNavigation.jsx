// components/dashboard/TabNavigation.jsx

import React from 'react';

const TabNavigation = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;