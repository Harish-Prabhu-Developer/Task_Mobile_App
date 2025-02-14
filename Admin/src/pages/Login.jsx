import React, { useEffect, useState } from "react";
import ForgetpassForm from "../components/auth/ForgetpassForm";
import OTPContainer from "../components/auth/OTPContainer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slice/auth/authSlice";
import CryptoJS from 'crypto-js';
import { CONFIG, IMAGES } from "../Config";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const OnLoginStatus = useSelector((state) => state.auth.OnStatus);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgetPass, setShowForgetPass] = useState(false);
  const [showOTPContainer,SetShowOTPContainer]=useState(false);



  useEffect(() => {
    const encryptedEmail = localStorage.getItem('rememberedEmail');
    const encryptedPassword = localStorage.getItem('rememberedPassword');

    if (encryptedEmail && encryptedPassword) {
      setEmail(CryptoJS.AES.decrypt(encryptedEmail, CONFIG.SECRET_KEY).toString(CryptoJS.enc.Utf8));
      setPassword(CryptoJS.AES.decrypt(encryptedPassword, CONFIG.SECRET_KEY).toString(CryptoJS.enc.Utf8));
      setRememberMe(true);
    }
  }, []);

    //Listen for changes in OnLoginStatus
    useEffect(() => {
      console.log("OnLoginStatus:", OnLoginStatus); // Debugging line
      if (OnLoginStatus === "OTP sent to the email") {
        console.log("OTP sent to the email, showing OTP form...");
        SetShowOTPContainer(true);
      } else if (OnLoginStatus === "Login success") {
        console.log("Login success, navigating to dashboard...");
        navigate("/dashboard");

      }
    }, [OnLoginStatus, navigate]);
  
 
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', CryptoJS.AES.encrypt(email, CONFIG.SECRET_KEY).toString());
      localStorage.setItem('rememberedPassword', CryptoJS.AES.encrypt(password, CONFIG.SECRET_KEY).toString());
    } else {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
    }

    const credentials = { email, password };
    try {
      const response = await dispatch(loginUser(credentials)).unwrap();

    } catch (error) {
      console.error("Login failed:", error.message);
    }
    
  };

  return (
    <>
       {!showOTPContainer ? (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-yellow-100 via-yellow-200 to-yellow-300 px-4">
        <div className="bg-white rounded-3xl flex flex-col md:flex-row shadow-xl items-center justify-center md:w-[80%] overflow-hidden">
              <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-bl from-yellow-500 to-yellow-400 p-10 md:p-12 rounded-3xl w-full md:w-1/2 text-white">
                <div className="flex flex-row items-center gap-4 mb-6">
                  <img src={IMAGES.companyLogo} alt="Company Logo" className="rounded-lg w-12 h-12 shadow-md" />
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-wide">SWOMB Technologies</h3>
                </div>
                <img src={IMAGES.artLogin} alt="Login Illustration" className="w-48 md:w-72 rounded-3xl shadow-lg mt-4" />
                <h2 className="text-lg md:text-xl font-bold text-center mt-6">Explore, Learn, and Enhance your skills</h2>
                <p className="text-sm md:text-md font-medium text-center mt-4 leading-relaxed">
                  Where artificial intelligence enables data-driven decision-making.
                </p>
              </div>

          {showForgetPass ? (
            <ForgetpassForm onBack={() => setShowForgetPass(false)} />
          ) : (
            <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 text-center">
                Welcome Back!
              </h2>
              <p className="text-sm md:text-md text-gray-600 mb-6 text-center leading-relaxed">
                Login to your account and take the next step in your journey
              </p>
              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm md:text-md font-semibold text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-4 focus:ring-yellow-500 focus:outline-none text-gray-800 placeholder-gray-400"
                    placeholder="you@swomb.app"
                  />
                  {emailError && (
                    <p className="text-red-600 p-2 font-medium text-xs sm:text-sm">
                      {emailError}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm md:text-md font-semibold text-gray-700 mb-2"
                  >
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
                  {passwordError && (
                    <p className="text-red-600 p-2 font-medium text-xs sm:text-sm">
                      {passwordError}
                    </p>
                  )}
                </div>
                {error && (
                    <p className="text-red-600 p-2 text-center font-medium text-sm sm:text-md">
                      {error}
                    </p>
                  )}
                <div className="flex justify-between items-center">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="mr-2"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgetPass(true)}
                    className="text-yellow-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-500 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105 duration-300"
                >
                  Login
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    ) : (
      <div>
        {/* OTP Container */}
        <OTPContainer email={email} onOTPVerified={() => navigate("/dashboard")} />
      </div>
    )}

    </>
  );
};

export default Login;
