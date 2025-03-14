import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

const TaskCompletionByTeamChart = () => {
  const data = [
    { team: "Developers", completed: 50 },
    { team: "Designers", completed: 30 },
    { team: "Testers", completed: 20 },
  ]; 
  const SummaryData=useSelector((state)=>state.analytical.summaryData);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={SummaryData?.TaskCompletionByTeamData||data}>
        <XAxis dataKey="team" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="completed" fill="#4CAF50" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TaskCompletionByTeamChart;
