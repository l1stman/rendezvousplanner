import React, { useState } from "react";
import { FaEnvelope, FaKey } from "react-icons/fa6";
import { HiBadgeCheck, HiInformationCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { Alert } from "flowbite-react";
import axios from "axios";

const AccountTab = ({ profile }) => {

    const [profileData, setProfile] = useState({
        owner: {
            email: profile?.owner?.email,
            password: "",
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setProfile({
            ...profileData,
           owner: {
                ...profileData.owner,
                [e.target.name]: e.target.value,
              }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true)
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.put(import.meta.env.VITE_BASE_URL + `/account`, profileData.owner, {	headers: {
              "Content-Type": "application/json",
            },
            });
            const data = response.data;
            if (data.success === false) {
              setLoading(false);
              setError(data.message);
            } else {
              setLoading(false);
            //   dispatch(updateProfile(data.profile));
              setSuccess(true);
              setTimeout(() => {
                setSuccess(false);
              }, 2500);
            }
        } catch (error) {
            console.error("Failed to update account:", error);
        }
    }

    return (
      <>
        <div className="animate-in">
          {error && (
            <Alert color="failure" icon={HiInformationCircle} className="w-2/4">
              <span className="font-medium">Info alert!</span> {error}
            </Alert>
          )}
          {success && (
            <Alert
              color="success"
              className="w-2/4"
              icon={HiBadgeCheck}
              onDismiss={() => onCloseAlert()}
            >
              <span className="font-medium">Info alert!</span> Account updated
              successfully!
            </Alert>
          )}
          <form className="p-4 w-2/4 max-lg:w-auto" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-white flex items-center"
              >
                <FaEnvelope />
                <span className="ml-2">Email</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your email"
                value={profileData?.owner?.email}
                onChange={handleChange}
                className="p-1 border border-gray-700 bg-transparent text-white rounded-md focus:outline-none focus:ring focus:ring-secondary"
              />
            </div>
            <div className="flex flex-col space-y-2 mt-6">
              <label
                htmlFor="password"
                className="text-sm font-medium text-white flex items-center"
              >
                <FaKey />
                <span className="ml-2">Password</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Your New password"
                value={profileData?.owner?.password}
                onChange={handleChange}
                className="p-1 border border-gray-700 bg-transparent text-white rounded-md focus:outline-none focus:ring focus:ring-secondary"
              />
            </div>
            <div>
              <button
                type="submit"
                className="mt-4 p-2 w-auto bg-secondary text-white font-medium rounded-md hover:bg-green-700"
              >
               {loading ? "Loading..." : "Update Account"}
              </button>
            </div>
          </form>
        </div>
      </>
    );

}

export default AccountTab;