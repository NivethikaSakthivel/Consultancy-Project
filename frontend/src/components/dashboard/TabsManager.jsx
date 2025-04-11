import React, { useState } from 'react';
import TabNavigation from './TabNavigation';
import BudgetForms from './BudgetForms';
import BudgetTable from './BudgetTable';
import { useBudget } from '../../context/BudgetContext';

const TabsManager = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { getCurrentMonthBudget, getCurrentMonthExpenses } = useBudget();
  
  const tabs = [
    { id: 'overview', label: 'Budget Overview' },
    { id: 'create', label: 'Create Budget' },
    { id: 'reports', label: 'Budget Reports' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="tab-content p-4">
            <BudgetTable />
          </div>
        );
      case 'create':
        return (
          <div className="tab-content">
            <BudgetForms mode="create" />
          </div>
        );
      case 'reports':
        return (
          <div className="tab-content p-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-6">Budget Summary Report</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Total Budget</h3>
                <p className="text-3xl font-bold text-yellow-500">${getCurrentMonthBudget().toLocaleString()}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Total Expenses</h3>
                <p className="text-3xl font-bold text-blue-500">${getCurrentMonthExpenses().toLocaleString()}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Remaining Budget</h3>
                <p className="text-3xl font-bold text-green-500">${(getCurrentMonthBudget() - getCurrentMonthExpenses()).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Budget Allocation</h3>
              <div className="h-64 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50">
                <p className="text-gray-500">Budget allocation chart will appear here</p>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-6">
        <TabNavigation 
          tabs={tabs} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        <div className="mt-4">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default TabsManager;