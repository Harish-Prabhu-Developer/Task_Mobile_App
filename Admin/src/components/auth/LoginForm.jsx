import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js'; // Import CryptoJS
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setProfile } from '../../redux/slice/auth/authSlice';
import { setemail } from '../../redux/slice/auth/emailSlice';

const LoginForm = ({ onForgetPassword, onLoginSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const OnLoginStatus = useSelector((state) => state.auth.OnStatus);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  // Local state for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const SECRET_KEY = import.meta.env.VITE_REACT_APP_REMEMBER_SECRET;

  // Load saved credentials on component mount
  useEffect(() => {
    const encryptedEmail = localStorage.getItem('rememberedEmail');
    const encryptedPassword = localStorage.getItem('rememberedPassword');

    if (encryptedEmail && encryptedPassword) {
      const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY).toString(CryptoJS.enc.Utf8);

      setEmail(decryptedEmail);
      setPassword(decryptedPassword);
      setRememberMe(true);
    }
  }, []);

  //Listen for changes in OnLoginStatus
  useEffect(() => {
    if (OnLoginStatus === "OTP sent to the email") {
      console.log("OTP sent to the email, showing OTP form...");
      dispatch(setemail(email))
      onLoginSuccess();  // Call function to show OTP form
    } else if (OnLoginStatus === "Login success") {
      console.log("Login success, navigating to dashboard...");
      navigate('/dashboard'); // Redirect to dashboard
    }
  }, [OnLoginStatus, navigate, onLoginSuccess]);

  // Validation functions
  const validateEmail = (email) => {
    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return EMAIL_PATTERN.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();

    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long');
      isValid = false;
    }

    if (!isValid) return;

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

    const credentials = { email, password };
    dispatch(loginUser(credentials));  // Dispatch action 🚀
    if (OnLoginStatus === "Login success") {
      console.log("Login success, navigating to dashboard...");
      navigate('/dashboard');
      dispatch(setProfile());
    }
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-10 py-14 overflow-y-auto">
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
            onClick={onForgetPassword}
          >
            Forgot Password?
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105 duration-300"
          
        >
          Login
        </button>
        {error && <p className="text-red-600 text-center font-medium mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
