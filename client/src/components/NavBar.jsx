import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogout } from '../hooks/logout';
import { FaList, FaX } from 'react-icons/fa6';
import { Dropdown } from 'flowbite-react';

const NavBar = () => {
  const profile = useSelector(state => state.profile);
  const [isOpen, setIsOpen] = useState(false);
  const logout = useLogout(); // Call the hook at the top level
  
  const Logout = async () => {
    await logout();
    window.location.href = '/';
  }

  return (
    <nav className="p-3 bg-primary text-white border-b border-gray-700">
      <div className='flex items-center justify-between mx-4 sm:mx-32'>
        {/* Left Section */}
        <div className={`flex items-center space-x-6`}>
          {/* Logo */}
          <img src="/rendezvousplanner/logo.png" alt="Logo" className="w-28" />

          {!isOpen && (
                <>
                  <Link to="/" className="hover:text-gray-300 font-meduim">Home</Link>
                <Link to="/explore" className="hover:text-gray-300 font-meduim">Explore</Link>
                </>

            )}
         
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden text-secondary">
          {isOpen ? <FaX size={20}/> : <FaList size={20} />}
        </button>

        {/* Right Section */}
        <div className={`flex flex-col sm:flex-row items-center space-x-4 sm:space-x-0 sm:space-y-0 space-y-4 ${isOpen ? 'block' : 'hidden'} sm:block`}>
          {isOpen && (
            <div className="flex flex-row space-x-4">
              {/* Home Link */}
              <Link to="/" className="hover:text-gray-300 font-meduim">Home</Link>
              {/* Explore Link */}
              <Link to="/explore" className="hover:text-gray-300 font-meduim">Explore</Link>
            </div>
          )}
          {Object.keys(profile).length > 0 ? (
            <div className="flex items-center">
              <Dropdown inline label={<>
                <img src={profile.avatar_url} alt={profile.name} className='rounded-full w-6 h-6'/> <p>{profile?.name}</p> 
                </>}>
                <Link to="/profile">
                <Dropdown.Item>
                Profile
                </Dropdown.Item>
              </Link> 
                <Link to="/dashboard">
                <Dropdown.Item>
                Dashboard
                </Dropdown.Item>
              </Link> 
                </Dropdown>
              <button onClick={Logout} className="px-3 py-[2px] rounded-lg bg-secondary text-white text-sm font-meduim border-2 border-green-700 hover:ring-2 hover:ring-green-800">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth" className="px-3 py-[2px] rounded-lg bg-secondary text-white text-sm font-meduim border-2 border-green-700 hover:ring-2 hover:ring-green-800">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;