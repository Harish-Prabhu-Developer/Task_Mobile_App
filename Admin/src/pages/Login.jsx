import React from 'react';
import companyLogo from '../assets/images/companylogo.png'; // Replace with actual path
import artLogin from '../assets/images/Loginart.png'; // Replace with actual path
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    navigate('/dashboard');
  };
  return (
    <div className="flex items-center justify-center bg-gradient-to-tr from-yellow-100 via-yellow-200 to-yellow-300 w-full h-screen">
      <div className="flex flex-col md:flex-row justify-between w-11/12 sm:w-9/12 bg-white rounded-3xl shadow-xl overflow-hidden md:overflow-visible">
        {/* Left section with illustration and description */}
        <div className="w-full hidden md:w-1/2 bg-gradient-to-bl from-yellow-500 to-yellow-400 md:flex flex-col items-center rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none justify-center p-8">
          <div className='flex flex-row justify-center gap-4 w-full mb-6 items-center'>
            <img src={companyLogo} alt="Company Logo" className="rounded-lg w-12 h-12 shadow-md" />
            <h3 className="text-3xl font-extrabold text-white tracking-wide">SWOMB Technologies</h3>
          </div>
          <img src={artLogin} alt="Login Illustration" className="w-48 md:w-72 rounded-3xl shadow-lg mt-4 h-auto" />
          <h2 className="text-lg md:text-xl font-bold text-white text-center mt-8">
            Explore, Learn, and Enhance your skills
          </h2>
          <p className="text-sm md:text-md text-white font-medium text-center mt-4 leading-relaxed">
            Where artificial intelligence enables data-driven decision-making.
          </p>
        </div>

        {/* Right section with login form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-10 py-14 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-yellow-200">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-8 text-center">Welcome Back!</h2>
          <p className="text-sm md:text-md text-gray-600 mb-6 text-center leading-relaxed">
            Login to your account and take the next step in your journey
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
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm md:text-md font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-4 focus:ring-yellow-500 focus:outline-none text-gray-800 placeholder-gray-400"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center justify-between text-sm md:text-md">
              <div>
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="/forgot-password" className="text-yellow-600 hover:underline font-semibold">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              onClick={handleLogin}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105 duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
