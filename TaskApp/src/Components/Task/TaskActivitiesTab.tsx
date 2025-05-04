import {ActivityIndicator, FlatList, Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {TASKTYPEICON} from '../../Utils/ProjectStyles';
import {Activity, Task} from '../../Utils/OurInterFace';
import {GETTIMEAGO} from '../../Utils/FormatFunctions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import AddActivity from '../Alert/AddActivity';
import { AppDispatch } from '../../Redux/Store';
import { useDispatch } from 'react-redux';
import { fetchtasks, updateTask } from '../../Redux/Slice/AssignTask/AssignTaskSlice';
interface ActivityCardProps {
  Activity: Activity;
  isConnected: boolean;
}
interface TaskActivitiesTabProps {
  task: Task;
  taskActivity: Activity[];

}
const TaskActivitiesTab: React.FC<TaskActivitiesTabProps> = ({task,taskActivity}) => {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const ActivityCard: React.FC<ActivityCardProps> = ({
    Activity,
    isConnected,
  }) => {
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
            <Text className="capitalize text-gray-500 font-medium">
              {Activity?.type}
            </Text>
            <Text className=" text-gray-500">
              {Activity?.date ? ` ${GETTIMEAGO(Activity.date)}` : 'Just now'}
            </Text>
          </View>

          <Text className="text-gray-700 mt-1 font-semibold">
            {Activity?.activity}
          </Text>
        </View>
      </View>
    );
  };

  const handleAddNewActivity = () => {
    setShowAddActivity(true);
  };
  const handleActivitySubmit = async (selected: string, text: string) => {
    setShowAddActivity(false);
    if (!text.trim()) {
      console.error("Activity cannot be empty");
      return;
    }
    setLoading(true);
    const newActivity =  await {
      activities: {
        type: selected,
        activity: text,
      },
    };
  
    console.log("Task Data push :", newActivity);
    try {
      const res = await dispatch(updateTask({ taskId: task._id, taskData: newActivity })).unwrap();
      console.log("Task Update Response:", res);
      await dispatch(fetchtasks());
    } catch (error) {
      console.error("Error updating task:", error);
    console.log('Selected:', selected);
    console.log('Text:', text);
  }finally{
    setLoading(false);
    setShowAddActivity(false);
  }
  };
  return (
  <>
    {loading && (
            <View className="fixed inset-0 bg-black bg-opacity-50 h-screen flex justify-center items-center z-50">
              <Text className="text-white text-lg font-semibold"><ActivityIndicator size="large" color="#fff" />
              Updating...</Text>
            </View>
          )}
      <View className="flex">
      <View>
        <FlatList
          data={task.activities}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <ActivityCard
              Activity={item}
              isConnected={index < task?.activities?.length - 1}
            />
          )}
          contentContainerStyle={{paddingBottom: 20}}
        />
      </View>

      {/* Add New Activity Dialog */}
      <AddActivity
        visible={showAddActivity}
        onclose={() => setShowAddActivity(false)}
        handleActivitySubmit={handleActivitySubmit}
        tasks={task}
      />
    </View>
      {/*Floating button*/}
      <TouchableOpacity
        className="absolute bottom-12 right-5 bg-blue-600 rounded-full w-16 h-16 items-center justify-center shadow-lg"
        onPress={handleAddNewActivity}>
        {/* Add New Activity Icon */}
        <Text className="text-white text-xl font-bold">
          <MaterialCommunityIcons name="plus" size={26} color="white" />
        </Text>
      </TouchableOpacity>
  </>
  );
};

export default TaskActivitiesTab;

