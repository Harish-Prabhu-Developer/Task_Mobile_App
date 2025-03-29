import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Task} from '../../Utils/OurInterFace';
import {
  getUniqueColor,
  ICONS,
  PRIOTITYSTYELS,
  TASK_TYPE,
} from '../../Utils/ProjectStyles';
import {formatDate, getInitials, GETROLE} from '../../Utils/FormatFunctions';
import SubTaskCard from '../Card/SubTaskCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface TaskProps {
  task?: Task;
}

const TaskDetailsTab: React.FC<TaskProps> = ({task}) => {
  if (!task) {
    return <Text className="text-center text-gray-500">Task not found!</Text>;
  }

  const bgColor: Record<string, string> = {
    high: 'bg-red-100',
    medium: 'bg-yellow-100',
    low: 'bg-blue-100',
  };

  return (
    <FlatList
      data={task.subTasks} // SubTasks list for rendering
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={true}
      nestedScrollEnabled
      ListHeaderComponent={
        <View className="bg-white">
          {/* Priority and Status Section */}
          <View className="flex flex-row items-center justify-between">
            <View
              className={`flex flex-row gap-1 p-2 ${
                bgColor[task.priority] || 'bg-gray-100'
              } rounded-xl items-center`}>
              {ICONS[task.priority as keyof typeof ICONS] && (
                <Text
                  className={`text-lg ${
                    PRIOTITYSTYELS[
                      task.priority as keyof typeof PRIOTITYSTYELS
                    ] || 'text-gray-500'
                  }`}>
                  {ICONS[task.priority as keyof typeof ICONS]()}
                </Text>
              )}
              <Text
                className={`uppercase font-medium ${
                  PRIOTITYSTYELS[
                    task.priority as keyof typeof PRIOTITYSTYELS
                  ] || 'text-gray-500'
                }`}>
                {task.priority} Priority
              </Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <Text
                className={`w-4 h-4 ${
                  TASK_TYPE[task.stage as keyof typeof TASK_TYPE] ||
                  'bg-gray-300'
                } rounded-full`}
              />
              <Text className="line-clamp-1 text-black">{task.stage}</Text>
            </View>
          </View>

          {/* Created & Updated Dates */}
          <View className="border-t border-gray-300 my-4 gap-2 pt-3">
            <Text className="text-gray-600 text-sm font-extrabold">
              Created At:{' '}
              <Text className="font-normal">{formatDate(task.createdAt)}</Text>
            </Text>
            <Text className="text-gray-600 text-sm font-extrabold">
              Updated At:{' '}
              <Text className="font-normal">{formatDate(task.updatedAt)}</Text>
            </Text>
          </View>

          {/* Project Details Section */}
          <View className="border-t border-gray-300 pt-3">
            <Text className="text-lg font-bold">
              <MaterialCommunityIcons name="pin" size={20} color="#0221eb" />{' '}
              Project Details
            </Text>
            <View className="mt-2 p-3 bg-blue-100 rounded-lg">
              <Text className="text-lg font-semibold">
                <MaterialCommunityIcons name="clipboard-text" size={18} color="black" />{' '}
                {task.project?.name}
              </Text>
              <Text className="text-gray-600">{task.project?.description}</Text>
              <View className="flex flex-row items-center gap-4 mt-2">
                <Text className="text-gray-500 text-sm">
                  <FontAwesome5 name="user" size={14} color="gray" /> Created By: {task.project?.createdBy?.name}
                </Text>
                <Text className="text-gray-500 text-sm">
                  <FontAwesome5 name="users" size={14} color="gray" /> Team Size: {task.project?.teamMembers.length}
                </Text>
              </View>
            </View>
          </View>

          {/* Assets and Subtasks Count */}
          <View className="border-t border-gray-300 my-4 gap-2 pt-3">
            <View className="flex flex-row items-center justify-around">
              <Text className="text-gray-600 text-md font-extrabold">
                <MaterialCommunityIcons name="folder" size={16} color="gray" /> Assets:{' '}
                <Text className="font-normal">{task.assets?.length || 0}</Text>
              </Text>
              <Text className="text-gray-600 text-md font-extrabold">
              <MaterialCommunityIcons name="format-list-checks" size={20} color="gray" /> Sub-Tasks:{' '}
                <Text className="font-normal">{task.subTasks?.length || 0}</Text>
              </Text>
            </View>
          </View>

          {/* Task Team */}
          <View className="border-t border-gray-300 pt-3">
            <Text className="text-lg mt-6 mb-4 font-bold text-gray-600 uppercase">
              Task Team
            </Text>
            <FlatList
              data={task.assignedTo}
              keyExtractor={user => user?._id}
              nestedScrollEnabled
              renderItem={({item: user}) => (
                <View className="flex flex-row items-center gap-4 py-2 border-t border-gray-200">
                  <View
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-md ${getUniqueColor(
                      user.name,
                    )}`}>
                    <Text className="text-center text-white font-bold text-lg">
                      {getInitials(user.name)}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-lg font-semibold">{user.name}</Text>
                    <Text className="text-gray-500">{GETROLE(user)}</Text>
                  </View>
                </View>
              )}
            />
          </View>

          {/* Sub Tasks Header */}
          <View>
            <Text className="text-lg mt-8 mb-4 font-bold text-gray-600 uppercase">
              <MaterialCommunityIcons name="format-list-checks" size={20} color="black" />{' '}
              Sub-Tasks
            </Text>
          </View>
        </View>
      }
      renderItem={({item}) => <SubTaskCard subTask={item} />}
      contentContainerStyle={{paddingBottom: 20}} // Ensures space at bottom for smooth scrolling
    />
  );
};

export default TaskDetailsTab;

const styles = StyleSheet.create({});
