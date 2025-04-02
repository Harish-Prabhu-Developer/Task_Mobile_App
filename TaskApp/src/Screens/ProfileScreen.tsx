import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import TopHeader from '../Components/Header/TopHeader';
import { getInitials } from '../Utils/FormatFunctions';
import { getUniqueColor } from '../Utils/ProjectStyles';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ProfileScreen: React.FC = () => {
  const userName = "Harish Prabhu";
  const userEmail = "23pca121@anjaconline.org";

  return (
    <View className="flex flex-1 bg-white">
      <TopHeader />
      <View className="p-6 items-center mt-10">
        {/* Profile Picture */}
        <View className="w-36 h-36 rounded-full bg-gray-300 shadow-lg items-center justify-center">
          <View className={`w-28 h-28 rounded-full ${getUniqueColor(userName)} items-center justify-center`}>
            <Text className="text-white text-3xl font-bold">{getInitials(userName)}</Text>
          </View>
        </View>


        {/* Name and Email */}
        <View className='my-2  items-center'>
        <Text className="mt-4 my-2 text-2xl font-semibold text-gray-800 uppercase ">{userName}</Text>
        <Text className="text-lg my-2 text-gray-600">{userEmail}</Text>
        </View>

        

        {/* Action Buttons */}
        <View className="mt-6 w-full gap-6 px-4 space-y-4">
          <TouchableOpacity className="flex flex-row items-center p-4 bg-white rounded-lg shadow-md" onPress={() => {}}>
            <Feather name="edit" size={24} color="black" />
            <Text className="ml-4 text-lg font-medium text-gray-700">Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row items-center p-4 bg-white rounded-lg shadow-md" onPress={() => {}}>
            <MaterialIcons name="lock-outline" size={24} color="black" />
            <Text className="ml-4 text-lg font-medium text-gray-700">Change Password</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity className="mt-8 p-4 w-full bg-red-500 rounded-lg items-center" onPress={() => {}}>
          <Text className="text-lg font-bold text-white">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
