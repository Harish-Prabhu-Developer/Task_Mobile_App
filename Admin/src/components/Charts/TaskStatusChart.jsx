import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const TaskStatusChart = () => {
  const TaskChartdata = [
    { name: "To Do", value: 10 },
    { name: "In Progress", value: 15 },
    { name: "Completed", value: 8 },
  ];

  const COLORS = ["#FFBB28", "#FF8042", "#00C49F"];

   const SummaryData=useSelector((state)=>state.analytical.summaryData);
   const data=SummaryData?.TaskStatusData||TaskChartdata;
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TaskStatusChart;
