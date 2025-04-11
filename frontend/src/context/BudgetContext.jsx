import React, { createContext, useContext, useState, useEffect } from 'react';

const BudgetContext = createContext(null);

export const BudgetProvider = ({ children }) => {
  // Budget entries state
  const [budgetEntries, setBudgetEntries] = useState([]);
  // Monthly budget (hardcoded for now)
  const [monthlyBudget, setMonthlyBudget] = useState({
    January: 25000,
    February: 25000,
    March: 28000,
    April: 30000,
    May: 32000,
    June: 35000,
    July: 30000,
    August: 28000,
    September: 26000,
    October: 25000,
    November: 30000,
    December: 35000
  });

  // Load budget entries from localStorage on initial render
  useEffect(() => {
    const savedEntries = localStorage.getItem('budgetEntries');
    if (savedEntries) {
      setBudgetEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save budget entries to localStorage whenever they change
  useEffect(() => {
    // We can't store File objects in localStorage, so we need to save just the file info
    const entriesToSave = budgetEntries.map(entry => {
      const { proofFile, ...entryWithoutFile } = entry;
      return entryWithoutFile;
    });
    
    localStorage.setItem('budgetEntries', JSON.stringify(entriesToSave));
  }, [budgetEntries]);

  // Add a new budget entry
  const addBudgetEntry = (entry) => {
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...entry
    };
    
    // If we have a real backend, we would upload the file here
    // For now, we'll just store the filename
    
    setBudgetEntries(prev => [...prev, newEntry]);
  };

  // Delete a budget entry
  const deleteBudgetEntry = (id) => {
    setBudgetEntries(prev => prev.filter(entry => entry.id !== id));
  };

  // Update a budget entry
  const updateBudgetEntry = (id, updatedEntry) => {
    setBudgetEntries(prev => 
      prev.map(entry => entry.id === id ? { ...entry, ...updatedEntry } : entry)
    );
  };

  // Get current month's budget
  const getCurrentMonthBudget = () => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    return monthlyBudget[currentMonth] || 0;
  };

  // Calculate total expenses for current month
  const getCurrentMonthExpenses = () => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const thisYear = new Date().getFullYear();
    
    return budgetEntries.reduce((total, entry) => {
      const entryDate = new Date(entry.date);
      const entryMonth = entryDate.toLocaleString('default', { month: 'long' });
      const entryYear = entryDate.getFullYear();
      
      if (entryMonth === currentMonth && entryYear === thisYear) {
        return total + Number(entry.actualAmount || 0);
      }
      return total;
    }, 0);
  };

  // Simulate file download (in a real app, this would download from the server)
  const downloadProofFile = (fileId) => {
    alert(`In a production environment, this would download file: ${fileId}`);
    // This is where you would actually download the file from your server
  };

  return (
    <BudgetContext.Provider 
      value={{ 
        budgetEntries, 
        addBudgetEntry, 
        deleteBudgetEntry, 
        updateBudgetEntry,
        monthlyBudget,
        getCurrentMonthBudget,
        getCurrentMonthExpenses,
        downloadProofFile
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);

export default BudgetContext;