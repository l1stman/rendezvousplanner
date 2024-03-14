import axios from "axios";
import React, { useState } from "react";
import {
  FaIdCard,
  FaImage,
  FaPhone,
  FaUser,
} from "react-icons/fa6";
import { HiBadgeCheck, HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/actions";
const ProfileTab = (props) => {
  const [profile, setProfile] = useState(props.profile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true)
    try {
      axios.defaults.withCredentials = true;

      const response = await axios.put(`http://localhost:4000/profile/${profile._id}`, profile, {	headers: {
        "Content-Type": "application/json",
        },
      });
      const data = response.data;
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
      } else {
        setLoading(false);
        dispatch(updateProfile(data.profile));
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2500);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }


  };

  return (
    <>
      <div className="animate-in">
      {error && (
          <Alert color="failure" icon={HiInformationCircle} className="w-2/4">
            <span className="font-medium">Info alert!</span> {error}
          </Alert>
        )}
        {success && (
          <Alert color="success" className="w-2/4" icon={HiBadgeCheck} onDismiss={() => onCloseAlert()}>
          <span className="font-medium">Info alert!</span> Profile updated successfully!
        </Alert>
        )}
        <form className="p-4 w-2/4 max-lg:w-auto">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-white flex items-center"
            >
              <FaUser />
              <span className="ml-2">Name</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              value={profile?.name}
              onChange={handleChange}
              className="p-1 border border-gray-700 bg-transparent text-white rounded-md focus:outline-none focus:ring focus:ring-secondary"
            />
            <p className="text-xs text-emerald-300">
              This is your public display name. It can be your real name or a
              pseudonym.
            </p>
          </div>
          <div className="flex flex-col space-y-2 mt-6">
            <label
              htmlFor="bio"
              className="text-sm font-medium text-white flex items-center"
            >
              <FaIdCard />
              <span className="ml-2">Bio</span>
            </label>
            <textarea
              name="bio"
              id="bio"
              placeholder="Write a few words about yourself."
              value={profile?.bio}
              onChange={handleChange}
              className="p-1 border border-gray-700 bg-transparent text-white  rounded-md focus:outline-none focus:ring focus:ring-secondary"
            ></textarea>
            <p className="text-xs text-emerald-300">
              This is your public bio. You can write a few words about yourself.
            </p>
          </div>
          <div className="flex flex-col space-y-2 mt-6">
            <label
              htmlFor="mobile"
              className="text-sm font-medium text-white flex items-center"
            >
              <FaPhone />
              <span className="ml-2">Mobile Number</span>
            </label>{" "}
            <input
              type="number"
              name="mobile"
              id="mobile"
              placeholder="Your mobile number"
              value={profile?.mobile}
              onChange={handleChange}
              className="p-1 border border-gray-700 bg-transparent text-white rounded-md focus:outline-none focus:ring focus:ring-secondary"
            />
            <p className="text-xs mb-4 text-emerald-300">
              This is your public mobile number. It can be your real number or a
              pseudonym.
            </p>
          </div>
          <div className="flex flex-col space-y-2 mt-6">
            <label
              htmlFor="avatar_url"
              className="text-sm font-medium text-white flex items-center"
            >
              <FaImage />
              <span className="ml-2">Avatar Image URL</span>
            </label>{" "}
            <input
              type="text"
              name="avatar_url"
              id="avatar_url"
              placeholder="Your avatar image URL"
              value={profile?.avatar_url}
              onChange={handleChange}
              className="p-1 border border-gray-700 bg-transparent text-white rounded-md focus:outline-none focus:ring focus:ring-secondary"
            />
            <p className="text-xs mb-4 text-emerald-300">
                This is your public avatar image URL. It can be your real image or
                a pseudonym.
            </p>
          </div>
          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-4 p-2 w-auto bg-secondary text-white font-medium rounded-md hover:bg-green-700"
            >
              {loading ? "loading..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileTab;
