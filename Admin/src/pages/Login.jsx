import React, { useState } from "react";
import companyLogo from "../assets/images/companylogo.png"; // Replace with actual path
import artLogin from "../assets/images/Loginart.png"; // Replace with actual path

import LoginForm from "../components/auth/LoginForm";
import ForgetpassForm from "../components/auth/ForgetpassForm";
import CustomLoading from "../components/CustomLoading/CustomLoading";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showForgetPass, setShowForgetPass] = useState(false);

  return (
    <>
      {loading ? (
        <CustomLoading/>
      ) : (
        <div className="flex items-center justify-center bg-gradient-to-tr from-yellow-100 via-yellow-200 to-yellow-300 w-full h-screen">
          <div className="flex flex-col md:flex-row justify-between w-11/12 sm:w-9/12 bg-white rounded-3xl shadow-xl overflow-hidden md:overflow-visible">
            <div className="w-full hidden md:w-1/2 bg-gradient-to-bl from-yellow-500 to-yellow-400 md:flex flex-col items-center rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none justify-center p-8">
              <div className="flex flex-row justify-center gap-4 w-full mb-6 items-center">
                <img
                  src={companyLogo}
                  alt="Company Logo"
                  className="rounded-lg w-12 h-12 shadow-md"
                />
                <h3 className="text-3xl font-extrabold text-white tracking-wide">
                  SWOMB Technologies
                </h3>
              </div>
              <img
                src={artLogin}
                alt="Login Illustration"
                className="w-48 md:w-72 rounded-3xl shadow-lg mt-4 h-auto"
              />
              <h2 className="text-lg md:text-xl font-bold text-white text-center mt-8">
                Explore, Learn, and Enhance your skills
              </h2>
              <p className="text-sm md:text-md text-white font-medium text-center mt-4 leading-relaxed">
                Where artificial intelligence enables data-driven
                decision-making.
              </p>
            </div>
            {showForgetPass ? (
              <ForgetpassForm onBack={() => setShowForgetPass(false)} />
            ) : (
              <LoginForm
                setLoading={setLoading}
                onForgetPassword={() => setShowForgetPass(true)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
