import {Text, View} from 'react-native';
import React from 'react';
import TopHeader from '../Components/Header/TopHeader';

const ProfileScreen = () => {
  return (
    <View className="flex flex-1">
      <TopHeader />
      <Text className="text-2xl text-red-600 font-bold">ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
