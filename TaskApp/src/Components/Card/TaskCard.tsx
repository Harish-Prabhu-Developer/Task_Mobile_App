import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import {getUniqueColor, ICONS, PRIOTITYSTYELS, TASK_TYPE} from '../../Utils/ProjectStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // CalendarToday
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Event
import  FontAwesome5  from 'react-native-vector-icons/FontAwesome5'; // Calendar Icon
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import {formatDate} from '../../Utils/FormatFunctions';
import { SubTask, Task } from '../../Utils/OurInterFace';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const latestSubTask: SubTask | null = task?.subTasks?.length ? task.subTasks[0] : null;
    const navigation = useNavigation<StackNavigationProp<any>>();
    const handleTaskDetailsNavigation = () => {
        navigation.navigate('TaskDetails', { task });
    };
  return (
    <TouchableOpacity className="bg-white shadow-lg m-3 rounded-lg border-gray-400 border-spacing-48" onPress={handleTaskDetailsNavigation} >
      <View className="flex flex-row items-center justify-between">
        {/**Top Section */}

        {/**Left Section */}
        <View className={`flex flex-row  gap-1 m-2 items-center text-sm font-medium`}>
          <Text className={`text-lg ${PRIOTITYSTYELS[task?.priority as keyof typeof PRIOTITYSTYELS] || "text-gray-500"}`}>
            {ICONS[task?.priority as keyof typeof ICONS] 
              ? ICONS[task?.priority as keyof typeof ICONS]() 
              : null}
          </Text>
          <Text className={`uppercase font-medium ${PRIOTITYSTYELS[task?.priority as keyof typeof PRIOTITYSTYELS] || "text-gray-500"}`}>
            {task?.priority} Priority
          </Text>
        </View>

        {/**Right Section */}
        <View className="m-6">
          <Text>...</Text>
        </View>
      </View>
      
      {/* Project Info */}
      {task?.project &&(<View className="flex  p-2 bg-gray-100 m-4 border border-gray-200 rounded-lg shadow-lg">
        <Text className="text-lg font-bold text-blue-800">
          {task.project.name}
        </Text>
        <Text className="text-sm font-medium text-gray-600 mt-1 ">
          {task.project.description}
        </Text>
        {/*Start and End Date section */}
        <View className="mt-2 flex flex-wrap gap-3 text-sm text-gray-700">
          <View className="flex flex-row items-center gap-1 bg-blue-100 px-3 py-1 rounded-full">
            <MaterialIcons name="calendar-today" size={16} color={'blue'} />
            <Text className="font-medium">Start:</Text>
            <Text className="font-normal">{formatDate(task?.project.startDate)}</Text>
          </View>

          <View className="flex flex-row items-center gap-1 bg-red-100 px-3 py-1 rounded-full">
            <MaterialCommunityIcons
              name="calendar-end"
              size={18}
              color={'red'}
            />
            <Text className="font-medium">End:</Text>
            <Text className="font-normal">{formatDate(task?.project.endDate)}</Text>
          </View>
        </View>
      </View>)}

      {/* Task Title */}
      <View className="flex flex-col gap-1 ms-4 mt-2">
      {/* Task Stage & Title */}
      <View className="flex flex-row items-center gap-2">
        <Text className={`w-4 h-4 ${TASK_TYPE[task?.stage as keyof typeof TASK_TYPE]} rounded-full `} />
        <Text className="line-clamp-1 text-black">{task?.title}</Text>
      </View>

      {/* Due Date */}
      <View className="flex flex-row items-center justify-center p-1.5 w-[54%] mb-1  gap-2 bg-lime-200 rounded-full">
        <FontAwesome5 name="calendar-alt" size={14} color={'green'} />
        <Text className="font-bold">Due Date:</Text>
        <Text className='font-normal'>{formatDate(task?.dueDate)}</Text>
      </View>
    </View>
    
        {/* Divider */}
        <View className="w-full my-2 border-t border-gray-200" />
        <View className='flex flex-row items-center justify-between m-6 '>
                
                        {/*Team and assets length*/}
              <View className="flex flex-row items-center justify-between ">
            <View className="flex flex-row items-center gap-3">
              {/* Comments/Activities */}
              <View className="flex flex-row gap-1 items-center text-gray-600">
                <Ionicons name="chatbubble-outline" size={16} />
                <Text className="text-sm">{task?.activities?.length}</Text>
              </View>

              {/* Attachments */}
              <View className="flex flex-row gap-1 items-center text-gray-600">
                <MaterialIcons name="attach-file" size={16} />
                <Text className="text-sm">{task?.assets?.length}</Text>
              </View>

              {/* Subtasks */}
              <View className="flex flex-row gap-1 items-center text-gray-600">
                <FontAwesome5 name="list" size={14} />
                <Text className="text-sm">{task?.subTasks?.length}</Text>
              </View>
            </View>
          </View>

          {/* Assigned Users */}
          <View className='flex flex-row-reverse gap-2'>
              {task?.assignedTo?.map((user,index)=>(
                <Text className={`w-8 h-8 rounded-full flex text-center p-2 items-center  justify-center -mr-4  ${getUniqueColor(user.name)}`}
                      key={index}> <Text className='text-white text-center m-2 font-bold text-sm'>{user.name.charAt(0).toUpperCase()}</Text> </Text>
              ))}
          </View>
          
          </View>        

        {/* Divider */}

             <View className="m-2 py-4 border-t border-gray-200">
               {(task?.subTasks ?? []).length > 0 ? (
                 <>
                   {/* Header with Expand/Collapse Button */}
                   <View className="flex-row items-center justify-between">
                     <Text className="text-base font-semibold text-black">Sub-Task</Text>
                     <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                       <MaterialIcons
                         name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                         size={24}
                         color="gray"
                       />
                     </TouchableOpacity>
                   </View>
         
                   {/* Show Latest Sub-Task when collapsed */}
                   {!isExpanded && latestSubTask && (
                     <View className="p-2 border border-gray-200 rounded-lg bg-gray-50 mt-2">
                       <Text className="text-sm font-medium text-black">{latestSubTask.title}</Text>
                       <View className="flex-row justify-between text-sm text-gray-600 mt-1">
                         <Text>{formatDate(latestSubTask.date)}</Text>
                         <Text className="bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium">
                           {latestSubTask.tag}
                         </Text>
                       </View>
                     </View>
                   )}
         
                   {/* Show All Sub-Tasks when expanded */}
                   {isExpanded && (
                     <FlatList
                       data={task.subTasks}
                       keyExtractor={(_, index) => index.toString()}
                       renderItem={({ item }) => (
                         <View className="p-2 border border-gray-200 rounded-lg bg-gray-50 mt-2">
                           <Text className="text-sm font-medium text-black">{item.title}</Text>
                           <View className="flex-row justify-between text-sm text-gray-600 mt-1">
                             <Text>{formatDate(item.date)}</Text>
                             <Text className="bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium">
                               {item.tag}
                             </Text>
                           </View>
                         </View>
                       )}
                     />
                   )}
                 </>
               ) : (
                 <Text className="text-gray-500">No Sub Tasks</Text>
               )}
             </View>
    </TouchableOpacity>
  );
};

export default TaskCard;

const styles = StyleSheet.create({});
