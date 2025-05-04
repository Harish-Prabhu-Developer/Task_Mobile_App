import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import TopHeader from '../Components/Header/TopHeader';
import { getInitials } from '../Utils/FormatFunctions';
import { getUniqueColor } from '../Utils/ProjectStyles';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const ProfileScreen: React.FC = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const[ShowProfileForm,SetShowProfileForm]=useState({name:"",email:"",picture:""});
  useEffect(() => {
    const handleProfileData=async()=>{
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const Data = jwtDecode<any>(token);
          SetShowProfileForm({
            name: Data.name,
            email: Data.email,
            picture: "",
          }); 
        }
      } catch (error) {
        
      }
    };
    handleProfileData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("isLoggedIn");
      navigation.navigate("LoginScreen");
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };  



  return (
    <View className="flex flex-1 bg-white">
      <TopHeader />
      <View className="p-6 items-center mt-10">
        {/* Profile Picture */}
        <View className="w-36 h-36 rounded-full bg-gray-300 shadow-lg items-center justify-center">
          <View className={`w-28 h-28 rounded-full ${getUniqueColor(ShowProfileForm.name)} items-center justify-center`}>
            <Text className="text-white text-3xl font-bold">{getInitials(ShowProfileForm.name|| "User")}</Text>
          </View>
        </View>


        {/* Name and Email */}
        <View className='my-2  items-center'>
        <Text className="mt-4 my-2 text-2xl font-semibold text-gray-800 uppercase ">{ShowProfileForm.name}</Text>
        <Text className="text-lg my-2 text-gray-600">{ShowProfileForm.email}</Text>
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
        <TouchableOpacity className="mt-8 p-4 w-full bg-red-500 rounded-lg items-center" onPress={handleLogout}>
          <Text className="text-lg font-bold text-white">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
