import React from 'react';
import { FaAngleLeft  } from "react-icons/fa6";
import AuthComponent from '../components/auth/MainComponent';

const AuthPage = () => {
  
    return (
        <div className="min-h-screen flex flex-col sm:flex-row">
          <div
            className="w-full sm:w-1/2 bg-cover flex flex-col items-start justify-start p-4"
            style={{
              backgroundImage: `url('${"https://source.unsplash.com/random"}')`,
            }}
          >
            <button
              onClick={() => window.history.back()}
              className="text-white p-2 rounded-md bg-primary text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl border border-white"
            >
              <FaAngleLeft />
            </button>
        </div>
          <div className="w-auto mx-4 sm:w-1/2 bg-primary flex items-center justify-center">
          <AuthComponent/>
          </div>
        </div>    
    );
}
export default AuthPage;