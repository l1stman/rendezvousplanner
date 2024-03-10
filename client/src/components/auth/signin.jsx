import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Toast } from 'flowbite-react';
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';
import axios from "axios";
import Cookies from 'js-cookie';

const Signin = () => {
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({
      status: false,
      message: "",
  });
  async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setToast({
          status: false,
          message: "",
        });

        const { email, password } = e.target;
        const profileData = {
          email: email.value,
          password: password.value,
        };
        try {
          const response = await axios.post(
            "http://localhost:4000/auth/signin",
            profileData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = response.data;
          if (!data.success) {
            setLoading(false);
            return setToast({
              status: true,
              message: data.message,
            });
          } else {
            setLoading(false);
            Cookies.set('token', data.token, { expires: 30, secure: true });
            navigate('/dashboard');
          }

        } catch (error) {
          setLoading(false);
          console.error("Failed to sign up:", error);
        }

        
    }

    return (
      <form className="mt-8 space-y-6 animate-in" onSubmit={handleSubmit}>
        {toast.status && (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{toast.message}</div>
            <Toast.Toggle />
          </Toast>
        )}
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm text-center"
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-white mt-8">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm text-center"
              placeholder="Password"
            />
          </div>
        </div>
        <div>
          <p className="text-white">
            {" "}
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-secondary border rounded-md outline-none"
            />{" "}
            I agree to the terms and conditions
          </p>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 mt-1 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:ring-secondary outline-none hover:ring-2"
          >
            {loading ? "loading..." : "Sign-In"}
          </button>
        </div>
      </form>
    );

}
export default Signin;