import React, { useState } from 'react';

const Directors = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // Mock data for directors
  const directorsData = [
    {
      id: 1,
      name: 'Ravindran Kamatchi',
      position: 'Club President',
      email: 'ckravindran72@gmail.com',
      image: null,
    },
    {
      id: 2,
      name: 'Parasuraman P',
      position: 'Club Secretary',
      email: 'cibidiamonds@yahoo.com',
      image: null,
    },
    {
      id: 3,
      name: 'Sivasamy K Dr.',
      position: 'Club Vice President',
      email: 'frontlinesiva@gmail.com',
      image: null,
    },
    {
      id: 4,
      name: 'ViswnathanBalasubramaniam',
      position: 'Club Treasurer',
      email: 'balus3sol@gmail.com',
      image: null,
    },
    {
      id: 5,
      name: 'Subhieramaneam D',
      position: 'Club Executive Secretary/Director',
      email: 'srehare@gmail.com',
      image: null,
    },
    {
      id: 6,
      name: 'Vivekkananda K',
      position: 'Club Foundation Chair',
      email: 'vivekkananda63@gmail.com',
      image: null,
    },
    {
      id: 7,
      name: 'Vaidyanathan K',
      position: 'Club Membership Chair',
      email: 'venusnathan@yahoo.com',
      image: null,
    },
    {
      id: 8,
      name: 'Shanmuga Sundar P N',
      position: 'Club Public Image Chair',
      email: 'mastrocolour@gmail.com',
      image: null,
    },
    {
      id: 9,
      name: 'Viswanathan S',
      position: 'Club Service Projects Chair',
      email: 'md@subasritextile.com',
      image: null,
    },
    {
      id: 10,
      name: 'Nagesh K',
      position: 'Club Learning Facilitator',
      email: 'knagesh150@gmail.com',
      image: null,
    },
    {
      id: 11,
      name: 'Sivagami S Dr.',
      position: 'Club Young Leaders Contact',
      email: 'sivagams@gmail.com',
      image: null,
    },
  ];

  // Filter directors based on search keyword
  const filteredDirectors = directorsData.filter(director => 
    director.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    director.position.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <>
      <div className="w-full bg-blue-900 text-white py-6 px-6">
        <h1 className="text-2xl font-bold">DIRECTORS</h1>
      </div>
      
      <div className="bg-gray-50 p-6">
        <div className="container mx-auto">
          <div className="flex justify-center my-4">
            <div className="flex w-full max-w-md">
              <input 
                type="text" 
                placeholder="Enter Keywords..." 
                className="px-4 py-2 w-full border border-gray-300 rounded-l focus:outline-none"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button 
                className="bg-yellow-500 text-black px-6 py-2 rounded-r font-medium hover:bg-yellow-600 transition duration-300"
              >
                Search
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {filteredDirectors.map(director => (
              <div key={director.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 flex flex-col items-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-500">
                    {director.image ? (
                      <img 
                        src={director.image} 
                        alt={director.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="mt-4 text-lg font-semibold text-center">{director.name}</h3>
                  <p className="text-gray-600 text-sm text-center">{director.position}</p>
                  
                  <a 
                    href={`mailto:${director.email}`} 
                    className="mt-2 text-blue-600 hover:underline text-sm flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {director.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {filteredDirectors.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No directors found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Directors;