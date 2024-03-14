import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from "../components/loading";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from '../redux/actions';
import { Link } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const token = Cookies.get('token');
    if(!token) {
      window.location.href = '/auth';
    }  
    const [loading, setLoading] = useState(true);
    const [plans, setPlans] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const profile = useSelector(state => state.profile);

    const CheckProfile = async () => {
      if(Object.keys(profile).length === 0) {
        fetchProfile();
      } else {
        setLoading(false);
      }
    }

    const fetchProfile = async () => {
      try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          axios.defaults.withCredentials = true;
          const response = await axios.post(
              "http://localhost:4000/auth/protected",
              {
                  headers: {
                      "Content-Type": "application/json",
                  },
              }
          );
          const data = response.data;
          if (!data.success) {
              setLoading(false);
          } else {
              dispatch(updateProfile(data.profile));
              setLoading(false)
          }
      } catch (error) {
          console.error("Failed to sign in:", error);
      }
  }
      
      const fetchPlans = async (PROFILE) => {
        const response = await axios.get('http://localhost:4000/plan/list/owner/' + PROFILE?.owner._id)
        const data = response.data;
        if(data.success === false) {
          setLoading(false)
        } else {
          setPlans(data.plans);
          setLoading(false)
        }

      }
      useEffect(() => {
        CheckProfile();
    }, []);
      



      if(loading) return <Loading/>

      return (
        <>
          <h2 className="text-white font-mybold text-3xl m-8">
            <span className="text-secondary font-mybold ">{profile.name}</span>
            's Profile
          </h2>

          <div className="flex md:flex-row flex-col animate-in">
            <div className="w-full flex flox-col justify-center items-center">
              <div className="bg-white row-span-3 shadow-lg rounded-lg px-8 py-6 w-[90%] mb-4">
                <div className="flex items-center mb-6">
                  <img
                    src={profile.avatar_url}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full mr-4 border-2 border-gray-200"
                  />
                  <div>
                    <h3 className="text-2xl font-bold">{profile.name}</h3>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <p id="email" className="text-gray-700">
                    {profile.owner.email}
                  </p>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="mobile"
                  >
                    Mobile
                  </label>
                  <p id="mobile" className="text-gray-700">
                    {profile.mobile}
                  </p>
                </div>
              </div>
            </div>
            <div className="basis-3/5 flex flex-col items-center">
              <div className="bg-white col-span-2 shadow-lg rounded-lg px-8 py-6 w-96 mb-4">
                <h3 className="text-2xl font-bold mb-4">Bio</h3>
                <p className="text-gray-700">{profile.bio}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
          <div className="bg-white row-span-2 shadow-lg rounded-lg px-8 py-6 mb-4 w-[75%] animate-in">
                    <h3 className="text-2xl font-bold mb-4">Plans</h3>
                   
                    {loading ? (
                    <p>Loading...</p>
                ) : (
                  <Plans profile={profile}/>
                )}
                </div>
          </div>
        </>
      );
};

const Plans = ({ profile }) => {

const [plansArray, setPlans] = useState([]);

  const fetchPlans = async () => {
    const response = await axios.get('http://localhost:4000/plan/list/owner/' + profile?.owner._id)
    const data = response.data;
    if(data.success === true) 
      setPlans(data.plans);
    }
  useEffect(() => { 
    fetchPlans();
  }, []);

    return (
    <>
                {plansArray.length === 0 ? (
                    <p>No Plans found</p>
                ) : (
                  plansArray.map((plan, index) => {
                    return (
                      <div key={index} className="flex flex-col mb-4 p-6 bg-white shadow-lg rounded-lg animate-in">
                          <h3 className="text-2xl font-bold mb-2 text-gray-800">{plan.title}</h3>
                          <p className="text-gray-600">{plan.description.length > 100 ? plan.description.substring(0, 100) + "..." : plan.description}</p>
                          <Link to={`/plans/${plan._id}`} className="mt-4 text-secondary inline-flex items-center">View Plan
                              <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                          </Link>
                      </div>
                    );
                    })
                )}
            </>
    );
}

export default Profile;