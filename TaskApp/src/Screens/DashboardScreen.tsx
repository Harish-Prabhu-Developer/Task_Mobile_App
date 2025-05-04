import { StyleSheet, Text, View, FlatList, Pressable, Animated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import TopHeader from '../Components/Header/TopHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import LinearGradient from 'react-native-linear-gradient';
import PriorityChart from '../Components/Charts/PriorityChart';
import { AppDispatch } from '../Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchreportData, fetchSummaryData } from '../Redux/Slice/Analyticals/AnalyticalSlice';
import { SummaryData } from '../Utils/OurInterFace';
import TaskStatusChart from '../Components/Charts/TaskStatusChart';
import TaskDueCompletedChart from '../Components/Charts/TaskDueCompletedChart ';

// TypeScript interface for Task Overview Data
interface TaskOverviewItem {
  label: string;
  total: number;
  icon: string;
  bg: string;
}

const DashboardScreen: React.FC = () => {
  const [taskOverview, setTaskOverview] = useState<TaskOverviewItem[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  
  

  useEffect(() => {
    const fetchData= async () => {
      try {
        await dispatch(fetchreportData());
        await dispatch(fetchSummaryData());
      } catch (error:any) {
        console.log("Error fetching data:", error.message);
        
      }
    }
    fetchData();
    setTaskOverview([
         { label: "TOTAL TASKS", total:SummaryData?.TaskStatusTotal?.total||0  , icon: "newspaper", bg: "bg-blue-700" },
         { label: "COMPLETED TASK", total:SummaryData?.TaskStatusTotal?.completed||0, icon: "shield-check", bg: "bg-teal-700" },
         { label: "TASK IN PROGRESS", total:SummaryData?.TaskStatusTotal?.['in progress']||0, icon: "progress-clock", bg: "bg-yellow-500" },
         { label: "TODOS", total:SummaryData?.TaskStatusTotal?.todo||0, icon: "clipboard-list", bg: "bg-pink-700" },
       ]);
     
  }, [dispatch]);
  const SummaryData=useSelector((state:any)=>state.analytics.summaryData);
  
 

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
              <MaterialCommunityIcons name={icon} size={30} color="white" />
            </View>
          </LinearGradient>
        </Animated.View>
      </Pressable>
    );
  };

  return (
<View className="flex-1 bg-white">
  <TopHeader/>
  <FlatList
    data={taskOverview}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => <Card {...item} />}
    contentContainerStyle={{ paddingBottom: 20, paddingTop: 10, paddingHorizontal: 16 }}
    showsVerticalScrollIndicator={false}
    getItemLayout={(data, index) => ({
      length: 160,
      offset: 160 * index,
      index,
    })}
    ListHeaderComponent={
      <View>
        <Text className="text-2xl font-bold mb-4">Task Overview</Text>
      </View>
    }
    ListFooterComponent={
      <>
      <View className="mt-6 mb-16">   
        <PriorityChart/>
      </View>
      <View className="mt-6 mb-16">   
          <TaskStatusChart/>
      </View>
      <View className="mt-6 mb-16">   
          <TaskDueCompletedChart/>
      </View>
      </>
    }
  />
</View>
  );
};

export default DashboardScreen;
const styles = StyleSheet.create({});
