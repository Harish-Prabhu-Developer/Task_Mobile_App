//LoginCompanyFrame.jsx
import React from "react";
import companyLogo from "../../assets/images/companylogo.png";
import artLogin from "../../assets/images/Loginart.png";

const LoginCompanyFrame = () => {
  return (
    <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-bl from-yellow-500 to-yellow-400 p-10 md:p-12 rounded-3xl w-full md:w-1/2 text-white">
      <div className="flex flex-row items-center gap-4 mb-6">
        <img src={companyLogo} alt="Company Logo" className="rounded-lg w-12 h-12 shadow-md" />
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-wide">SWOMB Technologies</h3>
      </div>
      <img src={artLogin} alt="Login Illustration" className="w-48 md:w-72 rounded-3xl shadow-lg mt-4" />
      <h2 className="text-lg md:text-xl font-bold text-center mt-6">Explore, Learn, and Enhance your skills</h2>
      <p className="text-sm md:text-md font-medium text-center mt-4 leading-relaxed">
        Where artificial intelligence enables data-driven decision-making.
      </p>
    </div>
  );
};

export default LoginCompanyFrame;