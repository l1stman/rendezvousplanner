import React from 'react';


const NotFound = () => {
  return (
    <>
      <div className="flex items-center justify-center mt-8 sm:mt-16 lg:mt-32 animate-in">
        <div className="text-center">
          <h1 className="text-7xl text-secondary font-mybold">
            404
          </h1>
          <h1 className="text-6xl font-mybold text-white">
            Not Found
          </h1>
          <p className="text-white mt-2 sm:mt-6 lg:mt-8 mx-4 sm:mx-16 lg:mx-96 font-medium">
              Please check the URL in the address bar and try again.
            </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
