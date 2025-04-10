import React from 'react';
const PageTitle = ({ title }) => {
    return (
      <div className="w-full bg-blue-900 text-white py-6 px-6">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
    );
  };
export default PageTitle;