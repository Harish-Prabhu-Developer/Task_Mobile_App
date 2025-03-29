import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopHeader from '../Components/Header/TopHeader'

const DashboardScreen = () => {
  return (
    <View className='flex flex-1'>
      <TopHeader/>
      <Text className='text-2xl text-red-600 font-bold'>DashboardScreen</Text>
    </View>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({})