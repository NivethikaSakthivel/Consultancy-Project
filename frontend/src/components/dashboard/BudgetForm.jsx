//dashboard/BudgetForm.jsx
import React, { useState, useRef } from 'react';
import { useBudget } from '../../context/BudgetContext';

const BudgetForms = ({ mode = 'create', entryToEdit = null }) => {
  const { addBudgetEntry, updateBudgetEntry } = useBudget();
  const fileInputRef = useRef(null);
  
  const initialFormState = entryToEdit || {
    category: '',
    description: '',
    budgetAmount: '',
    actualAmount: '',
    proofFile: null,
    proofFileName: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [filePreview, setFilePreview] = useState(entryToEdit?.proofFileName || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Store the file object and filename
    setFormData({
      ...formData,
      proofFile: file,
      proofFileName: file.name
    });
    
    // Set preview filename
    setFilePreview(file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (mode === 'edit') {
      updateBudgetEntry(entryToEdit.id, formData);
    } else {
      addBudgetEntry(formData);
      
      // Reset form after submission
      setFormData(initialFormState);
      setFilePreview('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Project-style form layout
  return (
    <div className="bg-white rounded-lg p-8">
      <h2 className="text-xl font-semibold text-blue-800 mb-6">
        {mode === 'create' ? 'Add New Budget Entry' : 'Edit Budget Entry'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2" htmlFor="category">
            Category<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Projects">Projects</option>
            <option value="Events">Events</option>
            <option value="Administration">Administration</option>
            <option value="Charity">Charity</option>
            <option value="Operational">Operational</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2" htmlFor="description">
            Description<span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            id="description"
            name="description"
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium text-gray-700 mb-2" htmlFor="budgetAmount">
              Budget Amount<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              id="budgetAmount"
              name="budgetAmount"
              type="number"
              placeholder="Budget Amount"
              value={formData.budgetAmount}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block font-medium text-gray-700 mb-2" htmlFor="actualAmount">
              Actual Amount<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              id="actualAmount"
              name="actualAmount"
              type="number"
              placeholder="Actual Amount"
              value={formData.actualAmount}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="mb-8">
          <label className="block font-medium text-gray-700 mb-2" htmlFor="proofFile">
            Upload Proof (Receipt/Invoice)
          </label>
          <input
            ref={fileInputRef}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            id="proofFile"
            name="proofFile"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
          {filePreview && (
            <p className="mt-2 text-sm text-gray-500">
              Selected file: {filePreview}
            </p>
          )}
        </div>
        
        <div className="flex justify-center">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            type="submit"
          >
            {mode === 'edit' ? 'Update Budget Entry' : 'Add Budget Entry'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForms;