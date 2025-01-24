import React from 'react';
import { IoArrowBackOutline } from "react-icons/io5";
const ForgetpassForm = ({ onBack }) => {
  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-10 py-14 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-yellow-200">
      <div className="flex items-center mb-6">
        <button
          className="text-yellow-600 w-10 hover:underline hover:cursor-pointer font-semibold"
          onClick={onBack}
        >
          <IoArrowBackOutline size={24} />
        </button>
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2 text-center">Reset Password</h2>
      <p className="text-sm md:text-md text-gray-600 mb-6 text-center leading-relaxed">
        Enter your email address to reset your password
      </p>
      <form className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm md:text-md font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-4 focus:ring-yellow-500 focus:outline-none text-gray-800 placeholder-gray-400"
            placeholder="you@swomb.app"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105 duration-300"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgetpassForm;
