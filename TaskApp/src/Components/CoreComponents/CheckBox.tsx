import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface CheckBoxProps {
  isChecked: boolean;
  onPress: () => void;
  title: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ isChecked, onPress, title }) => {
  return (
    <View className="flex-row items-center space-x-3 mt-2">
      <TouchableOpacity
        onPress={onPress}
        className={`w-6 h-6 rounded-md border-2 items-center justify-center ${
          isChecked ? "bg-blue-600 border-blue-600" : "border-gray-400"
        }`}
      >
        {isChecked && <Ionicons name="checkmark" size={16} color="white"/>}
      </TouchableOpacity>

      <Text className="text-md ms-2 text-black font-medium">{title}</Text>
    </View>
  );
};

export default CheckBox;
