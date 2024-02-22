import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="p-3 bg-primary text-white border-b border-gray-700">
      <div className='flex items-center justify-between mx-4 sm:mx-32'>
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <img src="/logo.png" alt="Logo" className="w-28" />

          {/* Home Link */}
          <Link to="/" className="hover:text-gray-300 font-meduim">Home</Link>
          {/* Explore Link */}
          <Link to="/explore" className="hover:text-gray-300 font-meduim">Explore</Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          
          <button className="px-3 py-[2px] rounded-lg bg-secondary text-white text-sm font-meduim border-2 border-green-700 hover:ring-2 hover:ring-green-800">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
