import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/actions";
import axios from "axios";
import ProfileTab from "../components/settings/profileTab";
import AccountTab from "../components/settings/accountTab";
import PlansTab from "../components/settings/plansTab";
import JoinersTab from "../components/settings/joinersTab";
import Loading from "../components/loading";
const Dashboard = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const token = Cookies.get('token');
    if(!token) {
      window.location.href = '/auth';
    }  
    const profile = useSelector(state => state.profile);
    const CheckProfile = () => {
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
          import.meta.env.VITE_BASE_URL + "/auth/protected",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
          );
          const data = response.data;
          if (!data.success) {
            return setLoading(false);
          } else {
            setLoading(false);
            dispatch(updateProfile(data.profile));
          }
          
        } catch (error) {
          setLoading(false);
          console.error("Failed to sign in:", error);
        }
      }
      
      useEffect(() => {
          CheckProfile();
      }, []);

      if(loading) return <Loading/>
    return (
       <>
        <h2 className="text-white font-mybold text-3xl m-8">
        <span className="text-secondary font-mybold ">{profile.name}</span>'s Dashboard
        </h2>
        <SidebarTabs profile={profile} token={token} />
        
       </>
    );
    };

    
    const SidebarTabs = ({ profile, token }) => {
  const tabs = [
    { name: 'Profile', content: <ProfileTab profile={profile} token={token} />, description: 'Your profile information'},
    { name: 'Account', content: <AccountTab profile={profile} token={token} />, description: "Update your account settings. " },
    { name: 'Plans', content: <PlansTab profile={profile} token={token} />, description: "Your owned plans" },
    { name: 'Joiners', content: <JoinersTab profile={profile} token={token} />, description: "Your plans joiners"},
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex h-screen divide-x divide-gray-700">
      <div className="w-auto sm:w-64 shadow-lg p-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`w-full py-2 px-4 block text-left text-white hover:bg-black rounded-md focus:outline-none ${activeTab.name === tab.name ? 'bg-gray-700' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="flex-1 p-8">
        <h2 className="text-3xl text-white">{activeTab.name}</h2>
        <p className="text-xs mb-4 text-white">{activeTab.description}</p>
        {activeTab.content}
      </div>
    </div>
  );
};

export default Dashboard;