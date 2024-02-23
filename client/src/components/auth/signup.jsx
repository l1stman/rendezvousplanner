import React, { useState } from "react";

const SignUp = ({ page, sendStatus }) => {

    const [loading, setLoading] = useState(false);
    const [signuppage, setsignupPage] = useState(page);

    function handleAccountSubmit(e) {
        e.preventDefault();
        // Add your signup logic here
    }
    function handleProfileSubmit(e) {
        e.preventDefault();
        
        sendStatus({
          status: true,
          type: "signup",
          message: "Account created successfully",
          p: "You can now sign-in here",
        });
    }

  return (
   <>
   {signuppage === "account" ? (
    <form className="mt-8 space-y-6 animate-in" onSubmit={handleAccountSubmit}>
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
          Password and Verification
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="appearance-none rounded-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none sm:text-sm text-center"
          placeholder="Password"
        />
        <input
          id="password_verification"
          name="password_verification"
          type="password"
          className="appearance-none rounded-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none sm:text-sm text-center"
          placeholder="Password Verification"
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
        onClick={() => setsignupPage("profile")}
        // type="submit"
        className="group relative w-full flex justify-center py-2 px-4 mt-1 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:ring-secondary outline-none hover:ring-2"
      >
        {loading ? "loading..." : "Next"}
      </button>
    </div>
  </form>
   ): (
    <form className="mt-8 space-y-6 animate-from-right" onSubmit={handleProfileSubmit}>
    <div className="rounded-md shadow-sm -space-y-px">
      <div>
        <label htmlFor="name" className="text-white">
          Profile Name
        </label>
        <input
          id="name"
          name="name"
          type="name"
          required
          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm text-center"
          placeholder="Name"
        />
      </div>
      <div>
        <label htmlFor="bio" className="text-white mt-8">
          Profile Bio
        </label>
        <textarea name="bio" id="bio" cols="30" rows="10" placeholder='Bio' className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"></textarea>
      </div>
    </div>
    <div>
      <button
        onClick={() => setsignupPage("profile")}
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 mt-1 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:ring-secondary outline-none hover:ring-2"
      >
        {loading ? "loading..." : "Submit"}
      </button>
    </div>
  </form>
   )}
   </>
  );
};

export default SignUp;