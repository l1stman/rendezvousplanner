import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions";
import Loading from "../components/loading";
import axios from "axios";

const Layout = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const token = Cookies.get('token');
  const fetchProfile = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL +"/auth/protected",
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
      if(token) {
        setLoading(true);
        fetchProfile();
      }
    }, []);

    if(loading) return <Loading/>

  return (
    <>
        <NavBar/>
        <Outlet />
    </>
  )
};

const PublicLayout = () => {  // layout without navbar
  return (
    <>
        <Outlet />
    </>
  )
};
export {Layout, PublicLayout};
