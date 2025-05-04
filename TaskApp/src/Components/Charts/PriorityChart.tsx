// PriorityChart.tsx
import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { RootState } from "../../Redux/Store";
import { useSelector } from "react-redux";

const screenWidth = Dimensions.get("window").width;

interface ChartItem {
  name: string;
  total: number;
}


const PriorityChart: React.FC = () => {

  const defaultChartData: ChartItem[] = [
    { name: "High", total: 2400 },
    { name: "Medium", total: 2210 },
    { name: "Normal", total: 3210 },
    { name: "Low", total: 2290 },
  ];
  const summaryData = useSelector((state: RootState) => state.analytics.summaryData);
  const chartData: ChartItem[] = summaryData?.PriorityChartData||defaultChartData;
  const labels = chartData.map((item) => item.name);
  const data = chartData.map((item) => item.total);
  return (
    <View className="w-[100%] bg-white mt-2 mb-4">
      <Text className="text-2xl font-bold text-gray-800 my-2">Chart by Priority</Text>
      <BarChart
        data={{ labels: labels,datasets: [{ data: data }],}}
        width={screenWidth - 32}
        height={220}
        fromZero
        withInnerLines
        showValuesOnTopOfBars={false}
        withCustomBarColorFromData={false}
        yAxisLabel=""      // 👈 FIX: Add this
        yAxisSuffix=""    // 👈 FIX: Add this
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(165, 180, 252, ${opacity})`, // Light Indigo (#a5b4fc)
          labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`, // Gray-700
          propsForBackgroundLines: {
            stroke: "#d1d5db", // Gray-300 for grid lines
            strokeDasharray: "4",
          },
          barPercentage: 0.6,
        }}
        verticalLabelRotation={0}
        style={{borderRadius: 8,}}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PriorityChart;
