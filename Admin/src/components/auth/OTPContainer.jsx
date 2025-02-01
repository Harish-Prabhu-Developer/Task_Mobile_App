import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OTPInput from "./OTPInput";
import { useDispatch } from "react-redux";
import { OTPVerify } from "../../redux/slice/auth/authSlice";
const OTPContainer = ({ email, onOTPVerified}) => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState('');
  const [OTPError, setOTPError] = useState('');
  const dispatch =useDispatch();


  const handleSubmit = (otp) => {
    if (otp.length !== 6) {
        setOTPError('Please enter a 6-digit OTP.'); // Fixed here
        return;
    }
    setOTPError(''); // Fixed here
    console.log(`OTP entered: ${otp}`);
    handleVerifyApi(email, otp);
};


const handleVerifyApi = async (email,otp) => {
    try {
        const URL=`http://localhost:3000/taskapp/auth/checksecret/${email}/${otp}`;
        console.log("URL",URL);
        const res =await axios.get(URL);
        console.log("OTP response",res.data);
        if(res.data.status === "success"){
            try {
                const token=res.data.token;
                console.log("Api token",token);
                await dispatch(OTPVerify({ token }));
                onOTPVerified(); // Notify parent (Login.jsx) that OTP verification is successful
                navigate("/dashboard");
            } catch (error) {
              console.error("HandleVerifyApi : ", error.message);
            } 
        }else if (res.data.status ==="fail" && res.data.msg==="Invalid OTP") {
          setOTPError("Invalid OTP. Please try again.");
        } else if (res.data.status ==="fail" && res.data.msg==="Internal server error") {
          setOTPError("Server Down");
        } else {
          setOTPError("Invalid OTP. Please try again.");           
        }
    } catch (error) {
      if (error.message==="Network Error") {
        alert("Server Down ,Please Verify your Network");
        console.warn("Server Down");
        
      }
        console.error(error.message);
        
    }
}
const handleOTPChange = (otp) => {
    setOTP(otp);
};

  return (
    <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-yellow-100 via-yellow-200 to-yellow-300 px-4">

                <div className="flex flex-col justify-center items-center p-3 bg-white rounded-3xl shadow-xl">
                <div className="w-full">
                  <h1 className="text-2xl md:text-3xl text-center font-extrabold text-gray-800">
                    Hi there!👋
                  </h1>
                  <div className="text-center">
                    <p className="text-sm md:text-md text-gray-600 inline-block">
                      Your code was sent to <strong className="font-medium text-gray-800">{email}</strong>
                    </p>
                  </div>
                  <div className="flex-row justify-center items-center mb-6">
                    <OTPInput length={6} onOTPChange={handleOTPChange} onSubmit={handleSubmit} />
                    {OTPError && <span className="text-red-600 text-center mt-2">{OTPError}</span>}
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={otp.length !== 6}
                    className="bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-yellow-600 text-white font-bold py-2 px-4 w-full rounded-xl shadow-md transition duration-200">
                    Verify
                  </button>
                </div>
              </div>
            </div>
        
    </>
  );
};

export default OTPContainer;
