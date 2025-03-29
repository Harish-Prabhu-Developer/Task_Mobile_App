import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Theme';
import { Image } from 'react-native';
import NotificationPanel from '../Alert/NotificationPanel';

const TopHeader = () => {
  return (
    <LinearGradient
                colors={COLORS.ourBlue}
                style={{
                  height: 80,
                  width: '100%',
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                  flexDirection: 'row',
                }}>
                  <View className='flex flex-row items-center justify-between w-full '>
                      <View className='items-start m-4 gap-2 '>
                          <View className='flex flex-row items-center gap-2'>
                            <Image source={require('../../assets/images/companylogo.png')} className='w-10 h-10 rounded-xl bg-cover'  />
                            <Text className='text-white font-bold text-2xl'>SWOMB</Text>
                          </View>
                      </View>
                      <View className='items-end m-8 gap-2'>
                          <NotificationPanel/>
                      </View>
                  </View>
              </LinearGradient>
  );
};

export default TopHeader;

const styles = StyleSheet.create({});
