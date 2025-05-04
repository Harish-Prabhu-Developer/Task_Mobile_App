import { Text, View, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import TaskCard from "../Components/Card/TaskCard";
import { Task, Task_Data } from "../Utils/OurInterFace";
import TopHeader from "../Components/Header/TopHeader";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { fetchtasks } from "../Redux/Slice/AssignTask/AssignTaskSlice";
import { AppDispatch } from "../Redux/Store";
const TaskScreen = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Tasks");
  const dispatch =useDispatch<AppDispatch>();
  const filters = ["All Tasks", "ToDo", "In Progress", "Completed"];

  useEffect(() => {
    dispatch(fetchtasks());
  }, [dispatch]);
  const tasks:Task[]=useSelector((state:any)=>state.assignTask.tasks);

  // Function to filter tasks based on selection
  const filteredTasks = tasks.filter((task) => {
    if (selectedFilter === "All Tasks") return true;
    return task.stage.toLowerCase() === selectedFilter.toLowerCase();
  });

   
  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setDropdownVisible(false);
  };

  return (
    <View className="flex flex-1 bg-white mb-20">
      {/* Header */}
      <TopHeader />

      {/* Custom Dropdown */}
      <View className="absolute top-6 left-52 right-24 h-10 bg-white shadow-md z-10 rounded-lg px-4">
        <TouchableOpacity
          className="flex-row items-center justify-between h-full"
          onPress={() => setDropdownVisible(!isDropdownVisible)}
        >
          <Text className="text-gray-700 font-semibold">{selectedFilter}</Text>
          <FontAwesome
            name={isDropdownVisible ? "chevron-up" : "chevron-down"}
            size={16}
            color="#333"
          />
        </TouchableOpacity>

        {/* Dropdown Options */}
        {isDropdownVisible && (
          <View className="absolute top-10 left-2 w-[120%] bg-white shadow-lg rounded-lg mt-2">
            {filters.map((filter, index) => (
              <TouchableOpacity
                key={index}
                className="py-2 px-4 rounded-lg hover:bg-gray-200"
                onPress={() => handleFilterSelect(filter)}
              >
                <Text className="text-gray-800 font-medium">{filter}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Task List */}
      <View className="mt-2 mb-24">
        {filteredTasks.length > 0 ? (
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <TaskCard task={item} />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text className="text-center text-gray-500 mt-10">
            No tasks found for "{selectedFilter}"
          </Text>
        )}
      </View>

    </View>
  );
};

export default TaskScreen;
