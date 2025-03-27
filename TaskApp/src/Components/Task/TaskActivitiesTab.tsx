import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Task } from '../../Utils/OurInterFace';
import { ScrollView } from 'react-native';
interface TaskProps {
  task: Task;
}
const TaskActivitiesTab: React.FC<TaskProps> = ({task}) => {
  return (
    <ScrollView>
      <Text>TaskActivitiesTab</Text>
    </ScrollView>
  )
}

export default TaskActivitiesTab

const styles = StyleSheet.create({})