import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TaskCard from '../Components/Card/TaskCard'
import { FlatList } from 'react-native'
import { Task_Data } from '../Utils/OurInterFace'

const TaskScreen = () => {
  return (
    <View className="flex flex-1 bg-white p-4 mb-20">
      <Text className="text-2xl font-bold  mb-4">Tasks</Text>
      <FlatList
        data={Task_Data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TaskCard task={item}/>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default TaskScreen

const styles = StyleSheet.create({})