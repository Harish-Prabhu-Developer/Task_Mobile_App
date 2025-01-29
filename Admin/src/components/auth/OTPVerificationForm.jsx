import React, { useState } from "react";
import OTPInput from "./OTPInput";
import { useNavigate } from "react-router-dom";

const OTPVerificationForm = ({ email}) => {
    const navigate = useNavigate();
    const [otp, setOTP] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (otp) => {
        if (otp.length !== 6) {
            setError('Please enter a 6-digit OTP.');
            return;
        }
        setError('');
        console.log(`OTP entered: ${otp}`);
        navigate('/dashboard');
        

    };

    const handleOTPChange = (otp) => {
        setOTP(otp);
    };
    return (
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
                    <div className="w-full text-center">
                        {error && <span className="text-red-600 text-center mt-2">{error}</span>}
                    </div>
                </div>           
                <button
                    onClick={() => handleSubmit(otp)}
                    disabled={otp.length !== 6}
                    className="bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-yellow-600 text-white font-bold py-2 px-4 w-full rounded-xl shadow-md transition duration-200">
                    Verify
                </button>
            </div>
        </div>
    );
};

export default OTPVerificationForm;
