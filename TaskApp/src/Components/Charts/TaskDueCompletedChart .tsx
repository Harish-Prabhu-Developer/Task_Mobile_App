import React from "react";
import { View, Dimensions, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";

interface TaskDataItem {
  month: string;
  due: number;
  completed: number;
}

interface RootState {
  analytics: {
    summaryData?: {
      TaskDueCompletedData?: TaskDataItem[];
    };
  };
}

const TaskDueCompletedChart = () => {
  const screenWidth = Dimensions.get("window").width;

  const defaultData: TaskDataItem[] = [
    { month: "Jan", due: 20, completed: 10 },
    { month: "Feb", due: 30, completed: 20 },
    { month: "Mar", due: 40, completed: 25 },
    { month: "Apr", due: 50, completed: 35 },
  ];

  const summaryData = useSelector((state: RootState) => state.analytics.summaryData);
  const chartData: TaskDataItem[] = summaryData?.TaskDueCompletedData || defaultData;

  const labels = chartData.map((item) => item.month);
  const dueData = chartData.map((item) => item.due);

  return (
    <View>
      <Text className="font-bold text-2xl mb-2">
        Tasks Due
      </Text>
      <BarChart
        data={{
          labels: labels,
          datasets: [{ data: dueData }],
        }}
        width={screenWidth}
        height={300}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 87, 51, ${opacity})`,
          barPercentage: 0.5,
        }}
        verticalLabelRotation={30}
        fromZero
        showBarTops
        withInnerLines
      />
    </View>
  );
};

export default TaskDueCompletedChart;
