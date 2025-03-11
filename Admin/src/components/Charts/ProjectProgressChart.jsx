import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ProjectProgressChart = () => {
  const data = [
    { month: "Jan", completed: 10, inProgress: 5 },
    { month: "Feb", completed: 20, inProgress: 10 },
    { month: "Mar", completed: 30, inProgress: 15 },
    { month: "Apr", completed: 50, inProgress: 20 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip labelStyle={{ fontWeight: 600 }} />
        <Legend />
        <Line type="natural" dataKey="completed"  stroke="#82ca9d" />
        <Line type="natural" dataKey="inProgress" stroke="#FFBB28" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProjectProgressChart;
