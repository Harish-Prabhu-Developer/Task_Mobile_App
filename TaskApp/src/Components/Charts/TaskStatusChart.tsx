import React from "react";
import { View, Dimensions, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";

const TaskStatusChart = () => {
  const screenWidth = Dimensions.get("window").width;

  const defaultData = [
    { name: "To Do", population: 10, color: "#FFBB28", legendFontColor: "#7F7F7F", legendFontSize: 14 },
    { name: "In Progress", population: 15, color: "#FF8042", legendFontColor: "#7F7F7F", legendFontSize: 14 },
    { name: "Completed", population: 8, color: "#00C49F", legendFontColor: "#7F7F7F", legendFontSize: 14 },
  ];

  const summaryData=useSelector((state:any)=>state.analytics.summaryData);

  const chartData =
    summaryData?.TaskStatusData?.map((item: any, index: number) => ({
      name: item.name,
      population: item.value,
      color: defaultData[index % defaultData.length].color,
      legendFontColor: "#7F7F7F",
      legendFontSize: 14,
    })) || defaultData;

  return (
    <View>
      <Text className="font-bold text-2xl">Task Status</Text>
      <PieChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={{
          color: () => `rgba(0, 0, 0, 1)`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
      />
    </View>
  );
};

export default TaskStatusChart;
