import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';

const TaskDetails = () => {
  const route = useRoute<RouteProp<any>>();
  const task = route.params?.task ?? null;
  
  return (
    <View className=' flex flex-1 p-4 bg-white'>
      <Text className='text-2xl font-bold mb-4'>{task?.title}</Text>
      
    </View>
  )
}

export default TaskDetails

const styles = StyleSheet.create({})