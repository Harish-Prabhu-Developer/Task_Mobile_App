import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const PriorityChart = () => {
  const chartData = [
    {
      name: "High",
      total: 2400,
    },
    {
      name: "Medium",
      total: 2210,
    },
    {
      name: "Normal",
      total: 3210,
    },
    {
      name: "Low",
      total: 2290,
    },
  ];
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart width={150} height={40} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PriorityChart;
