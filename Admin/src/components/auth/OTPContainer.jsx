import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OTPInput from "./OTPInput";
import { useDispatch, useSelector } from "react-redux";
import { OTPVerify } from "../../redux/slice/auth/authSlice";
import ReactLoading from "react-loading";
const OTPContainer = ({ email, onOTPVerified}) => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState('');
  const [OTPError, setOTPError] = useState('');
  const dispatch =useDispatch();
  const { loading, error } = useSelector((state) => state.auth); // Get state from Redux

  const handleSubmit = (otp) => {
    if (otp.length !== 6) {
        setOTPError('Please enter a 6-digit OTP.'); // Fixed here
        return;
    }

    setOTPError(''); // Fixed here
    console.log(`OTP entered: ${otp}`);
    handleVerify(email, otp);
};


const handleVerify = async (email,otp) => {
  dispatch(OTPVerify({ email, otp }))
  .unwrap()
  .then((res) => {
    if (res.msg === "Login successfully") {
      onOTPVerified(); // Notify parent (Login.jsx)
      navigate("/dashboard");
    } else {
      setOTPError(res.msg || "Invalid OTP. Please try again.");
    }
  })
  .catch((err) => {
    setOTPError(err || "OTP Verification failed. Try again.");
  });
}
const handleOTPChange = (otp) => {
    setOTP(otp);
};

  return (
    <>
        {loading?(
          <div className="fixed inset-0 bg-black bg-opacity-50 h-screen flex justify-center items-center z-50">
            <ReactLoading
                type="spinningBubbles"
                color="#0000FF"
                height={100}
                width={50}
            />
          </div>
        ):(
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
        )}
        
    </>
  );
};

export default OTPContainer;
