//ForgetpassForm.jsx
import React, { useEffect, useState } from 'react';
import { IoArrowBackOutline } from "react-icons/io5";
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { CONFIG } from '../../Config';

const ForgetpassForm = ({ onBack }) => {


   
   const [email, setEmail] = useState('');
   const [emailError, setEmailError] = useState('');
   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
     

   useEffect(() => {
       const encryptedEmail = localStorage.getItem('rememberedEmail');
       const encryptedPassword = localStorage.getItem('rememberedPassword');
   
       if (encryptedEmail && encryptedPassword) {
         setEmail(CryptoJS.AES.decrypt(encryptedEmail, CONFIG.SECRET_KEY).toString(CryptoJS.enc.Utf8));
       }
     }, []);
   
  const handleSubmit= async(e)=>{
    e.preventDefault();
    try {
      if (!validateEmail(email)) {
        setEmailError('Invalid email format');
        return;
      }
    
      const URL =`${CONFIG.BASE_URL}/taskapp/auth/resetpassword/${email}`
      const res =await axios.get(URL);
      console.log("Forget Response:",res.data);
      if (res.data.status==="success" && res.data.msg=== "Password reset successfully") {
        console.log("Password reset successFully");
        onBack();
        localStorage.removeItem('rememberedPassword');
      }else if (res.data.status==="fail" && res.data.msg=== "User does not exist") {
        console.log("Invalided User, Please Contact to the Admin");
        alert("User not found","Please contact to the Admin");
        onBack();
      } else if (res.data.status==="fail" && res.data.msg=== "Internal server error") {
          console.log("Forget Api:","Server Down");
      } else {
        console.warn("Forgot Api","Failed");
      }
    } catch (error) {
      if (error.message==="Network Error") {
        alert("Server Down ,Please Verify your Network");
        console.warn("Server Down");
        
      }
      console.error("Forget Api Error", error.message);
    }
    console.log("ForgetpassForm:","Success");
    console.log("Email:",email);
  };


  
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
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm md:text-md font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-4 focus:ring-yellow-500 focus:outline-none text-gray-800 placeholder-gray-400"
            placeholder="you@swomb.app"
          />
          {emailError && <p className="text-red-500 m-2 text-sm">{emailError}</p>}
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
