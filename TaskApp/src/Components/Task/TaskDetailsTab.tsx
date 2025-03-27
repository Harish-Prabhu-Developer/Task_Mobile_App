import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Task } from '../../Utils/OurInterFace';
import { getUniqueColor, ICONS, PRIOTITYSTYELS, TASK_TYPE } from '../../Utils/ProjectStyles';
import { formatDate, getInitials, GETROLE } from '../../Utils/FormatFunctions';
import SubTaskCard from '../Card/SubTaskCard';

interface TaskProps {
  task: Task;
}

const TaskDetailsTab: React.FC<TaskProps> = ({ task }) => {
  const bgColor = {
    high: 'bg-red-100',
    medium: 'bg-yellow-100',
    low: 'bg-blue-100',
  };

  if (!task) {
    return <Text className="text-center text-gray-500">Task not found!</Text>;
  }

  return (
    <ScrollView className=" bg-white">
      <View className="flex flex-1 space-y-4">
        {/* Priority and Status Section */}
        <View className="flex flex-row items-center justify-between">
          <View className={`flex flex-row  gap-1 p-1 bg-red-200 rounded-xl items-center text-sm font-medium`}>
                    <Text className={`text-lg ${PRIOTITYSTYELS[task?.priority as keyof typeof PRIOTITYSTYELS] || "text-gray-500"}`}>
                      {ICONS[task?.priority as keyof typeof ICONS] 
                        ? ICONS[task?.priority as keyof typeof ICONS]() 
                        : null}
                    </Text>
                    <Text className={`uppercase font-medium ${PRIOTITYSTYELS[task?.priority as keyof typeof PRIOTITYSTYELS] || "text-gray-500"}`}>
                      {task?.priority} Priority
                    </Text>
                  </View>


                  <View className="flex flex-row items-center gap-2">
                    <Text className={`w-4 h-4 ${TASK_TYPE[task?.stage as keyof typeof TASK_TYPE]} rounded-full `} />
                    <Text className="line-clamp-1 text-black">{task?.stage}</Text>
                  </View>
        </View>

        {/* Created & Updated Dates */}
        <View className="border-t border-gray-300 my-4 gap-2 pt-3">
          <Text className="text-gray-600 text-sm font-extrabold">Created At: <Text className='font-normal'>{formatDate(task?.createdAt)}</Text></Text>
          <Text className="text-gray-600 text-sm font-extrabold">Updated At: <Text className='font-normal'>{formatDate(task?.updatedAt)}</Text></Text>
        </View>

        {/* Project Details Section */}
        <View className="border-t border-gray-300 pt-3">
          <Text className="text-lg font-bold flex flex-row items-center gap-2">
            📌 Project Details
          </Text>
          <View className="mt-2 p-3 bg-blue-100 rounded-lg">
            <Text className="text-lg font-semibold">📋 {task?.project?.name}</Text>
            <Text className="text-gray-600">{task?.project?.description}</Text>
            <View className="flex flex-row items-center gap-4 mt-2">
              <Text className="text-gray-500 text-sm">👤 Created By: {task?.project?.createdBy?.name}</Text>
              <Text className="text-gray-500 text-sm">👥 Team Size: {task?.project?.teamMembers.length}</Text>
            </View>
          </View>
        </View>

        {/* Assets and Subtasks length */}
        <View className="border-t border-gray-300 my-4 gap-2 pt-3">
          <View className='flex flex-row items-center justify-center gap-28'>
            <Text className="text-gray-600 text-md font-extrabold">Assets: <Text className='font-normal'>{task?.assets?.length}</Text></Text>
            <Text className="text-gray-600 text-md font-extrabold">Sub-Tasks: <Text className='font-normal'>{task?.subTasks?.length}</Text></Text>
          </View>
 
        </View>
        
        {/*Task Team */}
        <View className="border-t border-gray-300 pt-3">
          <Text className="text-lg mt-6 mb-4 font-bold flex text-gray-600 uppercase flex-row items-center gap-2">
           Task Team
          </Text>
                  <View className='flex flex-1 justify-items-start space-y-3'>
                    {task?.assignedTo?.map((user, index) => (
                      <View
                        key={index}
                        className='flex gap-4 py-2 items-center justify-start border-t border-b border-gray-200'
                      >
                        <View className='flex flex-row  items-center justify-center gap-2'>
                        <View
                          className={`w-14 h-14 rounded-full text-white flex items-center font-bold justify-center text-md -mr-1 ${getUniqueColor(user?.name)}`}
                        >
                          <Text className='text-center text-white font-bold text-lg'> 
                            {getInitials(user?.name)}
                          </Text>
                        </View>

                        <View>
                          <Text className='text-lg font-semibold'>{user?.name}</Text>
                          <Text className='text-gray-500'>{GETROLE(user)}</Text>
                        </View>

                        </View>
                      </View>
                    ))}
                  </View>
        </View>

        {/* Sub Tasks */}
        <View>
        <Text className="text-lg mt-8 mb-4 font-bold flex text-gray-600 uppercase flex-row items-center gap-2">
           Sub-Tasks
          </Text>
        </View>
         <View className='mb-20'>
          <FlatList
            data={task?.subTasks}
            keyExtractor={(item,index) => index.toString()}
            renderItem={({ item }) => <SubTaskCard subTask={item} />}
            showsVerticalScrollIndicator={false}
          />

         </View>


      </View>
    </ScrollView>
  );
};

export default TaskDetailsTab;

const styles = StyleSheet.create({});
