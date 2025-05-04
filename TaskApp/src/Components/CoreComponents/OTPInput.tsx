import React, { useState, useRef } from "react";
import { TextInput, View, NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";

type OTPInputProps = {
  length: number;
  onOTPChange: (otp: string) => void;
  onSubmit: (otp: string) => void;
};

const OTPInput: React.FC<OTPInputProps> = ({ length, onOTPChange, onSubmit }) => {
  const [otp, setOTP] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newOTP = [...otp];
    newOTP[index] = text;
    setOTP(newOTP);
    onOTPChange(newOTP.join(""));

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (newOTP.join("").length === length) {
      onSubmit(newOTP.join(""));
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    const { key } = e.nativeEvent;
    if (key === "Backspace") {
      const newOTP = [...otp];
      if (!newOTP[index] && index > 0) {
        inputs.current[index - 1]?.focus();
      } else {
        newOTP[index] = "";
        setOTP(newOTP);
        onOTPChange(newOTP.join(""));
      }
    }
  };

  return (
    <View className="items-center mb-4">
      <View className="flex-row justify-center">
        {Array.from({ length }).map((_, i) => (
          <TextInput
            key={i}
            ref={(ref) => (inputs.current[i] = ref)}
            className="w-14 h-14 mx-1 my-1 text-2xl text-center text-yellow-600 border border-yellow-600 rounded-md"
            maxLength={1}
            keyboardType="name-phone-pad"
            autoCapitalize="none"
            onChangeText={(text) => handleChange(text, i)}
            onKeyPress={(e) => handleKeyPress(e, i)}
            value={otp[i]}
          />
        ))}
      </View>
    </View>
  );
};

export default OTPInput;
