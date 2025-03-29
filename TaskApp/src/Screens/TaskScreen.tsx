import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TaskCard from '../Components/Card/TaskCard'
import { FlatList } from 'react-native'
import { Task_Data } from '../Utils/OurInterFace'
import TopHeader from '../Components/Header/TopHeader'

const TaskScreen = () => {
  return (
    <View className="flex flex-1 bg-white mb-20">
      <TopHeader/>
      <View className='mt-4'>
        
        <FlatList
          data={Task_Data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <TaskCard task={item}/>}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default TaskScreen

const styles = StyleSheet.create({})