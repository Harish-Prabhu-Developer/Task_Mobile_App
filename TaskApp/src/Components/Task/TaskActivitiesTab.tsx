import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TASKTYPEICON, } from '../../Utils/ProjectStyles';
import { Activity, Task } from '../../Utils/OurInterFace';
import { GETTIMEAGO } from '../../Utils/FormatFunctions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
interface ActivityCardProps { 
  Activity:Activity;
  isConnected:boolean;
}
interface TaskActivitiesTabProps {
  task:Task;
}
const TaskActivitiesTab: React.FC<TaskActivitiesTabProps> = ({task}) => {
  const ActivityCard: React.FC<ActivityCardProps> = ({ Activity, isConnected }) => {
    return (
      <View className="flex-row space-x-4">
        {/* Icon & Vertical Line */}
        <View className="flex flex-col items-center">
          {/* Task Type Icon */}
          <View className="w-10 h-10 items-center justify-center">
            {TASKTYPEICON[Activity?.type as keyof typeof TASKTYPEICON]?.()}
          </View>

          {/* Vertical Line (only if connected) */}
          {isConnected && <View className="w-0.5 bg-gray-300 flex-1" />}
        </View>
  
        {/* Task Info */}
        <View className="flex-1 mb-4 ml-3">
          <Text className="font-bold mt-2 text-xl text-black">
            {Activity?.by?.name || 'Unknown User'}
          </Text>
  
          <View className="flex-row text-md gap-2 mt-1">
            <Text className="capitalize text-gray-500 font-medium">{Activity?.type}</Text>
            <Text className=" text-gray-500">
              {Activity?.date ? ` ${GETTIMEAGO(Activity.date)}` : 'Just now'}
            </Text>
          </View>
  
          <Text className="text-gray-700 mt-1 font-semibold">{Activity?.activity}</Text>
        </View>
      </View>
    );
  };  
  
  //Handle Add New Activity Button Press
  const handleAddNewActivity = async() => {
    //open modal to add new activity
    console.log("Add New Activity Pressed");
  };
  
  
  return (
    <View className='flex'>
        <View>
            <FlatList
                data={task.activities}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => <ActivityCard Activity={item} isConnected={index<task?.activities?.length-1} />}
                contentContainerStyle={{ paddingBottom: 20 }}
                />  
        </View>
        <TouchableOpacity className="absolute bottom-24 right-3 bg-blue-600 rounded-full w-16 h-16 items-center justify-center shadow-lg"
                          onPress={() => console.log("Add New Activity")}>
            {/* Add New Activity Icon */}
            <Text className="text-white text-xl font-bold">
              <MaterialCommunityIcons name="plus" size={26} color="white" />
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default TaskActivitiesTab

const styles = StyleSheet.create({})