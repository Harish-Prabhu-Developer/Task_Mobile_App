import { useState, useRef } from "react";

const OTPInput = ({ length, onOTPChange, onSubmit }) => {
  const [otp, setOTP] = useState(Array(length).fill(""));
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOTP = [...otp];
    newOTP[index] = text;
    setOTP(newOTP);
    onOTPChange(newOTP.join(""));

    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    if (newOTP.join("").length === length) {
      onSubmit(newOTP.join(""));
    }
  };

  const handleKeyPress = ({ key }, index) => {
    if (key === "Backspace") {
      const newOTP = [...otp];
      if (!newOTP[index] && index > 0) {
        inputs.current[index - 1].focus();
      } else {
        newOTP[index] = "";
        setOTP(newOTP);
        onOTPChange(newOTP.join(""));
      }
    }
  };

  return (
    <div className="flex justify-center">
      {Array(length)
        .fill(0)
        .map((_, i) => (
          <input
            key={i}
            ref={(ref) => (inputs.current[i] = ref)}
            className=" w-10 h-10 m-2 md:w-12 md:h-12 text-2xl text-center text-yellow-600 border hover:border-red-500 border-yellow-600 rounded"
            type="text"
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyPress(e, i)}
            value={otp[i]}
          />
        ))}
    </div>
  );
};

export default OTPInput;
