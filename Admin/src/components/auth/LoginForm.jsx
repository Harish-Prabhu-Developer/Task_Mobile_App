import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js'; // Import CryptoJS
const LoginForm = ({  onForgetPassword,onLoginSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const SECRET_KEY = import.meta.env.VITE_REACT_APP_REMEMBER_SECRET;
  // Replace with a strong secret key

  // Load saved credentials on component mount
  useEffect(() => {
    const encryptedEmail = localStorage.getItem('rememberedEmail');
    const encryptedPassword = localStorage.getItem('rememberedPassword');

    if (encryptedEmail && encryptedPassword) {
      // Decrypt and set the values
      const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY).toString(CryptoJS.enc.Utf8);

      setEmail(decryptedEmail);
      setPassword(decryptedPassword);
      setRememberMe(true);
    }
  }, []);

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    
    if (validateForm()) {

      // Encrypt and save credentials in localStorage based on "Remember me"
      if (rememberMe) {
        const encryptedEmail = CryptoJS.AES.encrypt(email, SECRET_KEY).toString();
        const encryptedPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();

        localStorage.setItem('rememberedEmail', encryptedEmail);
        localStorage.setItem('rememberedPassword', encryptedPassword);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }

    // Call function to show OTP form
        onLoginSuccess();
    }
  };

  const validateEmail = (email) => {
    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return EMAIL_PATTERN.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-10 py-14 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-yellow-200">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-3 text-center">Welcome Back!</h2>
      <p className="text-sm md:text-md text-gray-600 mb-6 text-center leading-relaxed">
        Login to your account and take the next step in your journey
      </p>
      <form className="space-y-6" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="block text-sm md:text-md font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-4 focus:ring-yellow-500 focus:outline-none text-gray-800 placeholder-gray-400"
            placeholder="you@swomb.app"
          />
          {emailError && <p className="text-red-600 p-2 font-medium text-xs sm:text-sm">{emailError}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm md:text-md font-semibold text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-4 focus:ring-yellow-500 focus:outline-none text-gray-800 placeholder-gray-400"
            placeholder="Enter your password"
          />
          {passwordError && <p className="text-red-600 p-2 font-medium text-xs sm:text-sm">{passwordError}</p>}
        </div>
        <div className="flex items-center justify-between text-sm md:text-md">
          <div className="flex flex-row items-center justify-center">
            <input
              type="checkbox"
              id="remember"
              className="mr-2"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember" className="text-gray-600 mb-1">
              Remember me
            </label>
          </div>
          <div
            className="text-yellow-600 hover:underline hover:cursor-pointer font-semibold"
            onClick={onForgetPassword} >
            Forgot Password?
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105 duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;