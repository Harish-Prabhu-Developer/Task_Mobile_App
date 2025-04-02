import { StyleSheet, Text, View, FlatList, Pressable, Animated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import TopHeader from '../Components/Header/TopHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import LinearGradient from 'react-native-linear-gradient';

// TypeScript interface for Task Overview Data
interface TaskOverviewItem {
  label: string;
  total: number;
  icon: string;
  bg: string;
}

const DashboardScreen: React.FC = () => {
  const [taskOverview, setTaskOverview] = useState<TaskOverviewItem[]>([]);

  useEffect(() => {
    setTaskOverview([
      { label: "TOTAL TASKS", total: 2 , icon: "newspaper", bg: "bg-blue-700" },
      { label: "COMPLETED TASK", total: 4, icon: "shield-check", bg: "bg-teal-700" },
      { label: "TASK IN PROGRESS", total: 4, icon: "progress-clock", bg: "bg-yellow-500" },
      { label: "TODOS", total: 6, icon: "clipboard-list", bg: "bg-pink-700" },
    ]);
  }, []);

  // Function to get the last month's name
  const getLastMonth = (): string => {
    const date = new Date();
    return date.toLocaleString('default', { month: 'long' });
  };

  // Reusable Card Component
  const Card: React.FC<TaskOverviewItem> = ({ label, total, bg, icon }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
        speed: 30,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        speed: 30,
      }).start();
    };

    return (
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View
          style={{ transform: [{ scale: scaleValue }] }}
          className="w-full h-40 rounded-xl overflow-hidden mb-4 shadow-xl bg-opacity-80 backdrop-blur-md"
        >
          {/* Gradient Background */}
          <LinearGradient
            colors={["#ffffff", "#e5e7eb"]}
            className="flex-1 p-6 flex-row items-center justify-between"
          >
            {/* Left Section: Text Content */}
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-700 tracking-wide">
                {label}
              </Text>
              <Text className="text-4xl font-extrabold text-gray-900 mt-2">
                {total}
              </Text>
              <Text className="text-sm text-gray-500 mt-2">{`${getLastMonth()} Data`}</Text>
            </View>

            {/* Right Section: Icon with Background */}
            <View
              className={`w-16 h-16 rounded-2xl flex items-center justify-center ${bg} shadow-md shadow-gray-700`}
            >
              <Icon name={icon} size={30} color="white" />
            </View>
          </LinearGradient>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <TopHeader />
      <View className="p-4 flex-1">
        {/* Task Overview Section */}
        <Text className="text-2xl font-bold mb-4">Task Overview</Text>

        {/* FlatList with Full-Screen Scroll Support */}
        <FlatList
          data={taskOverview}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Card {...item} />}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: 160, // Approximate height of each item
            offset: 160 * index,
            index,
          })}
        />
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
