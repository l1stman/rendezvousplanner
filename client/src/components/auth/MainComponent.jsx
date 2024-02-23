import React, { useState, useEffect } from 'react';
import BreadcrumbComponent from '../Breadcrumb';
import SignUp from './signup';
import Signin from './signin';
import Success from './success';

const AuthComponent = () => {
  
  var query = new URLSearchParams(document.location.search)


  let result = query.get('type');
  if(result === null) {
    result = "signup";
  } else if(result === "signin") {
    result = "signin";
  } else {
    result = "signup";
  }

  const [type, setType] = useState(result);
  const [signuppage, setsignupPage] = useState('account');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    status: false,
    type: "",
    message: "",
    p: ""
  });
  const SuccessStatus = (status) => {
    setSuccess(status)
  }

  const handleTypeChange = (data) => {
    setType(data);
    window.history.pushState({}, '', `?type=${data}`);
  };
  
  
    return (
      <>
        {success.status ? (
          <Success type={success.type} message={success.message} p={success.p} />
        ): (
          <div className="max-w-md w-full space-y-8">
        <BreadcrumbComponent type={type} page={signuppage} />
        {type === "signup" ? (
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Sign-Up
            </h2>
            <p className="text-center text-sm mt-1 text-white">
              Already have an account?{" "}
              <a
                onClick={() => handleTypeChange("signin")}
                className="text-secondary cursor-pointer"
              >
                Click here
              </a>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Sign-In
            </h2>
            <p className="text-center text-sm mt-1 text-white">
              Create new account?{" "}
              <a
                onClick={() => handleTypeChange("signup")}
                className="text-secondary cursor-pointer"
              >
                Click here
              </a>
            </p>
          </div>
        )}

        {type === "signup" && (
          <SignUp page={signuppage} sendStatus={SuccessStatus} />
        )}
        {type === "signin" && (
          <Signin sendStatus={SuccessStatus}/>
        )}
      </div>
        )}
      </>
    );
};

export default AuthComponent;
