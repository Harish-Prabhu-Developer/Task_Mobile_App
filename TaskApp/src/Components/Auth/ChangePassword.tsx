import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
interface ChangePasswordProps {
  visible: boolean;
  onclose: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({visible, onclose}) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View className="flex-1 bg-black/45 justify-center items-center px-4">
        <View className="bg-white w-full rounded-xl p-6 space-y-4">
          <Text className="text-xl font-semibold text-black">
            Change Password
          </Text>
                    {/* Action Buttons */}
                    <View className="flex-row justify-end gap-4">
                      <TouchableOpacity onPress={onclose} className="px-4 py-2 bg-gray-300 rounded-md">
                        <Text className="text-black font-medium">Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => console.log("Change Password")} className="px-4 py-2 bg-blue-600 rounded-md">
                        <Text className="text-white font-medium">Submit</Text>
                      </TouchableOpacity>
                    </View>
          
        </View>
      </View>
    </Modal>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
