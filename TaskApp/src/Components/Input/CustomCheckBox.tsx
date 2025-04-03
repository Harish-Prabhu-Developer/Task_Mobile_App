import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface CustomCheckBoxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: number;
  borderColor?: string;
  checkColor?: string;
  labelColor?: string;
  backgroundColor?: string;
  rounded?: boolean;
  shadow?: boolean;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
  label = "",
  checked = false,
  onChange,
  size = 24,
  borderColor = "#FFB000",
  checkColor = "#fff",
  labelColor = "#333",
  backgroundColor = "#FFB000",
  rounded = false,
  shadow = false,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handlePress = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className="flex-row items-center"
    >
      {/* Checkbox Container */}
      <View
        style={{
          width: size,
          height: size,
          borderRadius: rounded ? size / 2 : 5,
          borderWidth: 2,
          borderColor: borderColor,
          backgroundColor: isChecked ? backgroundColor : "transparent",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: shadow ? "#000" : "transparent",
          shadowOpacity: shadow ? 0.2 : 0,
          shadowRadius: shadow ? 3 : 0,
          elevation: shadow ? 4 : 0,
        }}
      >
        {isChecked && (
          <View
            style={{
              width: size * 0.6,
              height: size * 0.6,
              backgroundColor: checkColor,
              borderRadius: rounded ? size / 2 : 3,
            }}
          />
        )}
      </View>

      {/* Label */}
      {label ? (
        <Text
          style={{
            marginLeft: 8,
            fontSize: 16,
            color: labelColor,
            fontWeight: "500",
          }}
        >
          {label}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default CustomCheckBox;
