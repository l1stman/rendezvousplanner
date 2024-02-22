import React from 'react';
import { FaBookOpen } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
      <>
        <div className="flex items-center justify-center mt-8 sm:mt-16 lg:mt-32 animate-in">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-mybold">Book Smarter, Live Better</h1>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mybold text-secondary">RendezVous for effortless appointments</h1>
            <p className="text-white mt-2 sm:mt-6 lg:mt-8 mx-4 sm:mx-16 lg:mx-96 font-medium">
              Seamless scheduling for all! Discover a world where anyone can effortlessly book appointments with event creators. Simplify your life with RendezVous – Your Time, Your Way.
            </p>
            <div className='flex items-center justify-center space-x-4 mt-8'>
              <button className="p-1 rounded-lg w-48 h-10 bg-secondary text-white text-md font-semibold border-2 hover:ring-4 border-green-700 hover:ring-green-800">
                Start your appointment
              </button>
              <Link to='/explore'>
              <button className="p-1 rounded-lg w-48 h-10 text-white text-center text-md font-semibold border-2 border-gray-700 hover:border-gray-800 flex items-center justify-center">
                <FaBookOpen className="w-1/6" /> 
                <span className='w-1/2'>
                     Explore
                    </span>
              </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Home;