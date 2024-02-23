import { useState } from "react";

const Signin = () => {

    const [loading, setLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        // Add your signup logic here
    }

    return (
        <form className="mt-8 space-y-6 animate-in" onSubmit={handleSubmit}>
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
              placeholder="Email"
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
    )

}
export default Signin;