import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SubTask} from '../../Utils/OurInterFace';
import { SUBTASKSTATUSICONS } from '../../Utils/ProjectStyles';


interface SubTaskCardProps {
  subTask: SubTask;
}

const SubTaskCard: React.FC<SubTaskCardProps> = ({ subTask }) => {
  return (
    <View className="flex flex-1 mb-3 justify-between border border-gray-200 rounded-lg p-3 bg-white">
      <View className="flex-row items-center justify-between gap-4 space-x-3">
        {/* SubTasks Status Icon */}
       <View>{SUBTASKSTATUSICONS[subTask?.status as keyof typeof SUBTASKSTATUSICONS]?.()}</View>
        {/* Subtask Content */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-500">{new Date(subTask?.date).toDateString()}</Text>
            <Text className="px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold">
              {subTask?.tag}
            </Text>
          </View>

          <Text className="text-md font-bold mt-2">{subTask?.title}</Text>
        </View>
      </View>
    </View>
  );
};

export default SubTaskCard;
const styles = StyleSheet.create({});
