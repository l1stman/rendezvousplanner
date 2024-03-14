import React from "react";

const Loading = () => {
    return (
        <div className="flex items-center justify-center mt-8 sm:mt-16 lg:mt-32 animate-in">
          <div className="text-center">
            <div className="flex justify-center items-center p-4">
            <div className="dots"></div>
            </div>
            <h1 className="text-3xl font-mybold text-white">
              Loading...
            </h1>
            <p className="text-white text-sm font-medium">
                Please wait.
            </p>
          </div>
        </div>
      )};

export default Loading;