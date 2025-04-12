import React, { useState } from 'react';

const PastPresidents = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  // Dummy data for past presidents
  const presidentsData = [
    {
      id: 1,
      name: 'Ravi Kumar S',
      year: '2022 - 2023',
      email: 'ravikumar@example.com',
      image: null,
    },
    {
      id: 2,
      name: 'Karthikeyan V',
      year: '2021 - 2022',
      email: 'karthi@example.com',
      image: null,
    },
    {
      id: 3,
      name: 'Meenakshi R',
      year: '2020 - 2021',
      email: 'meenakshi@example.com',
      image: null,
    },
    {
      id: 4,
      name: 'Suresh P',
      year: '2019 - 2020',
      email: 'suresh@example.com',
      image: null,
    },
    {
      id: 5,
      name: 'Vijay Kumar T',
      year: '2018 - 2019',
      email: 'vijay@example.com',
      image: null,
    },
    {
      id: 6,
      name: 'Chandrakala R',
      year: '2017 - 2018',
      email: 'chandrakala@example.com',
      image: null,
    },
  ];

  const filteredPresidents = presidentsData.filter(president =>
    president.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    president.year.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <>
      <div className="w-full bg-blue-900 text-white py-6 px-6">
        <h1 className="text-2xl font-bold">PAST PRESIDENTS</h1>
      </div>

      <div className="bg-gray-50 p-6">
        <div className="container mx-auto">
          <div className="flex justify-center my-4">
            <div className="flex w-full max-w-md">
              <input
                type="text"
                placeholder="Enter Name or Year..."
                className="px-4 py-2 w-full border border-gray-300 rounded-l focus:outline-none"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button className="bg-yellow-500 text-black px-6 py-2 rounded-r font-medium hover:bg-yellow-600 transition duration-300">
                Search
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {filteredPresidents.map((president) => (
              <div key={president.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 flex flex-col items-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-500">
                    {president.image ? (
                      <img
                        src={president.image}
                        alt={president.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                    )}
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-center">{president.name}</h3>
                  <p className="text-gray-600 text-sm text-center">{president.year}</p>

                  <a
                    href={`mailto:${president.email}`}
                    className="mt-2 text-blue-600 hover:underline text-sm flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {president.email}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredPresidents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No past presidents found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PastPresidents;
