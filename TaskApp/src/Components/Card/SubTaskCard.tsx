import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SubTask} from '../../Utils/OurInterFace';

interface SubTaskCardProps {
  subTask: SubTask;
}

const SubTaskCard: React.FC<SubTaskCardProps> = ({subTask}) => {
  return (
    <View className="flex flex-1 mb-3 justify-between border border-gray-200 rounded-lg p-2 bg-white">
      <View className="flex flex-row items-center justify-between">
        <Text>{new Date(subTask?.date).toDateString()}</Text>
        <Text className="px-2 py-0.5 text-center text-md rounded-full bg-violet-100 text-violet-700 font-semibold">
          {subTask?.tag}
        </Text>
      </View>
      <Text className="text-md font-bold my-2">{subTask?.title}</Text>
    </View>
  );
};

export default SubTaskCard;

const styles = StyleSheet.create({});
