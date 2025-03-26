import React, { useState } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatDate } from "../utils";

const MonthlyActivityLogReport = () => {
  // Mock activity data
  const activities = [
    { date: "2024-03-10", activity: "Completed Task 'UI Design'", user: "Alice", project: "Project X" },
    { date: "2024-03-11", activity: "Updated Task 'Backend API'", user: "Bob", project: "Project Y" },
    { date: "2024-03-12", activity: "Commented on 'Bug Fix'", user: "Charlie", project: "Project X" },
    { date: "2024-03-14", activity: "Started Task 'Frontend Refactor'", user: "Alice", project: "Project Z" },
    { date: "2024-03-15", activity: "Marked Task 'Database Migration' as Complete", user: "Bob", project: "Project Y" },
  ];

  // Extract unique users and projects for dropdown options
  const users = [...new Set(activities.map((act) => act.user))];
  const projects = [...new Set(activities.map((act) => act.project))];

  // State for filters
  const [userFilter, setUserFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Filtered Data
  const filteredActivities = activities.filter(activity =>
    (!userFilter || activity.user === userFilter) &&
    (!projectFilter || activity.project === projectFilter) &&
    (!dateFilter || activity.date === dateFilter)
  );

  // Prepare Data for CSV
  const csvData = [
    ["Date", "Activity", "User", "Project"],
    ...filteredActivities.map(act => [act.date, act.activity, act.user, act.project])
  ];

  // Export PDF Function
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Monthly Activity Log Report", 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [["Date", "Activity", "User", "Project"]],
      body: filteredActivities.map(act => [act.date, act.activity, act.user, act.project]),
    });
    doc.save("Monthly_Activity_Log_Report.pdf");
  };

  return (
    <div className="p-6 bg-white rounded-md shadow">
      <h2 className="text-xl font-semibold mb-4">Monthly Activity Log Report</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        {/* User Dropdown Filter */}
        <select
          className="border p-2 rounded"
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        >
          <option value="">All Users</option>
          {users.map((user, index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </select>

        {/* Project Dropdown Filter */}
        <select
          className="border p-2 rounded"
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
        >
          <option value="">All Projects</option>
          {projects.map((project, index) => (
            <option key={index} value={project}>
              {project}
            </option>
          ))}
        </select>

        {/* Date Filter */}
        <input
          type="date"
          className="border p-2 rounded"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-yellow-200">
            <th className="border p-2">Date</th>
            <th className="border p-2">Activity</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Project</th>
          </tr>
        </thead>
        <tbody>
          {filteredActivities.map((act, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{formatDate(act.date)}</td>
              <td className="border p-2">{act.activity}</td>
              <td className="border p-2">{act.user}</td>
              <td className="border p-2">{act.project}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Export Options */}
      <div className="mt-4 flex gap-4">
        <CSVLink data={csvData} filename="Monthly_Activity_Log_Report.csv" className="bg-blue-500 text-white px-4 py-2 rounded">
          Export CSV
        </CSVLink>
        <button onClick={exportPDF} className="bg-red-500 text-white px-4 py-2 rounded">
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default MonthlyActivityLogReport;
