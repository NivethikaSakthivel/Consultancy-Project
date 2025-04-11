// pages/Directory.jsx
import React, { useState } from 'react';

const Directory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample directory data - in a real app, this might come from an API
  const members = [
    { id: 1, name: 'Annamalai P', role: 'Rotarian', image: null },
    { id: 2, name: 'Babu S', role: 'Rotarian', image: null },
    { id: 3, name: 'Babu Shankar M', role: 'Rotarian', image: null },
    { id: 4, name: 'Chandrasekar Ramkumar', role: 'Rotarian', image: null }, // Removed the image
    { id: 5, name: 'Gandeepan A L', role: 'Rotarian', image: null },
    { id: 6, name: 'Gopalsamy R', role: 'Rotarian', image: null },
    { id: 7, name: 'John Milton', role: 'Rotarian', image: null },
    { id: 8, name: 'Kannan G', role: 'Rotarian', image: null },
    { id: 9, name: 'Krishnan B', role: 'Rotarian', image: null },
    { id: 10, name: 'Maheshwaran T', role: 'Rotarian', image: null },
    { id: 11, name: 'Muthukumar S', role: 'Rotarian', image: null },
    { id: 12, name: 'Rajesh Kumar P', role: 'Rotarian', image: null }
  ];
  
  // Filter members based on search query
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearch = (e) => {
    e.preventDefault();
    // The filtering happens automatically due to the state change
    // This is just to handle the form submission
  };

  // Component for no image placeholder
  const NoImagePlaceholder = () => (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      <span className="text-gray-500 text-sm">No Image</span>
    </div>
  );
  
  return (
    <>
      {/* Page title banner */}
      <div className="w-full bg-blue-900 text-white py-6 px-6">
        <h1 className="text-2xl font-bold">DIRECTORY</h1>
      </div>
      
      {/* Search section */}
      <div className="bg-gray-50 p-6">
        <div className="container mx-auto">
          <form onSubmit={handleSearch} className="flex justify-center mb-8">
            <input 
              type="text" 
              placeholder="Enter Keywords..." 
              className="rounded-md border border-gray-300 px-4 py-2 w-full max-w-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="ml-2 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-md"
            >
              Search
            </button>
          </form>
          
          {/* Members grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMembers.map(member => (
              <div key={member.id} className="bg-white rounded-md shadow-md overflow-hidden">
                <div className="flex justify-center p-4">
                  <div className="relative rounded-full overflow-hidden w-32 h-32 border-2 border-yellow-400">
                    <NoImagePlaceholder />
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-yellow-400 rounded-t-full"></div>
                  </div>
                </div>
                <div className="text-center pb-4">
                  <h3 className="font-medium text-gray-800">{member.name}</h3>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* No results message */}
          {filteredMembers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No members found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Directory;