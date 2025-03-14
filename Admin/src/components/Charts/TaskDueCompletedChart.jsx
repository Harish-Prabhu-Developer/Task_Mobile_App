import React from "react";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TaskDueCompletedChart = () => {
  const data = [
    { month: "Jan", due: 20, completed: 10 },
    { month: "Feb", due: 30, completed: 20 },
    { month: "Mar", due: 40, completed: 25 },
    { month: "Apr", due: 50, completed: 35 },
  ]; 
  const SummaryData=useSelector((state)=>state.analytical.summaryData);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={SummaryData?.TaskDueCompletedData||data}>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="due" fill="#FF5733" stackId="a" />
        <Bar dataKey="completed" fill="#4CAF50" stackId="a" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TaskDueCompletedChart;
