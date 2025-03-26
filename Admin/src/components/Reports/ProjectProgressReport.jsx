import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Import autoTable
import { FaFileCsv, FaFilePdf, FaPrint } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { formatDate } from "../utils";

const ProjectProgressReport = () => {
  // Mock project data
  const mockProjects = [
    {
      _id: "1",
      name: "Website Redesign",
      startDate: "2024-01-10",
      endDate: "2024-06-30",
      tasks: [
        { status: "Completed" },
        { status: "Completed" },
        { status: "In Progress" },
        { status: "Not Started" },
      ],
      status: "In Progress",
    },
    {
      _id: "2",
      name: "Mobile App Development",
      startDate: "2024-02-15",
      endDate: "2024-09-15",
      tasks: [
        { status: "Completed" },
        { status: "Completed" },
        { status: "Completed" },
        { status: "In Progress" },
        { status: "Not Started" },
      ],
      status: "In Progress",
    },
    {
      _id: "3",
      name: "Cloud Migration",
      startDate: "2024-03-01",
      endDate: "2024-07-20",
      tasks: [{ status: "Completed" }, { status: "Completed" }],
      status: "Completed",
    },
  ];

  const [selectedProject, setSelectedProject] = useState("All");

  const filteredProjects =
    selectedProject === "All"
      ? mockProjects
      : mockProjects.filter((p) => p.name === selectedProject);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Project Progress Report", 20, 10);

    autoTable(doc, {
      head: [["Project", "Start Date", "End Date", "Tasks", "Completed", "Progress (%)", "Status"]],
      body: filteredProjects.map((p) => [
        p.name,
        p.startDate,
        p.endDate,
        p.tasks.length,
        p.tasks.filter((t) => t.status === "Completed").length,
        ((p.tasks.filter((t) => t.status === "Completed").length / p.tasks.length) * 100).toFixed(1) + "%",
        p.status,
      ]),
    });

    doc.save("Project_Progress_Report.pdf");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Project Progress Report</h2>

      {/* Dropdown for Filtering */}
      <select
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}
        className="p-2 border rounded w-1/2 mb-4"
      >
        <option value="All">All Projects</option>
        {mockProjects.map((project) => (
          <option key={project._id} value={project.name}>
            {project.name}
          </option>
        ))}
      </select>

      {/* Data Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-yellow-200">
            <th className="border p-2">Project</th>
            <th className="border p-2">Start Date</th>
            <th className="border p-2">End Date</th>
            <th className="border p-2">Tasks</th>
            <th className="border p-2">Completed</th>
            <th className="border p-2">Progress (%)</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project._id}>
              <td className="border p-2">{project.name}</td>
              <td className="border p-2">{formatDate(project.startDate)}</td>
              <td className="border p-2">{formatDate(project.endDate)}</td>
              <td className="border p-2">{project.tasks.length}</td>
              <td className="border p-2">{project.tasks.filter((t) => t.status === "Completed").length}</td>
              <td className="border p-2">
                {((project.tasks.filter((t) => t.status === "Completed").length / project.tasks.length) * 100).toFixed(1)}%
              </td>
              <td className="border p-2">{project.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Export Buttons */}
      <div className="flex gap-4 mt-4">
        <button onClick={exportPDF} className="p-2 bg-red-500 text-white rounded flex items-center">
          <FaFilePdf className="mr-2" /> Export PDF
        </button>

        <button onClick={() => window.print()} className="p-2 bg-green-500 text-white rounded flex items-center">
          <FaPrint className="mr-2" /> Print Report
        </button>
      </div>
    </div>
  );
};

export default ProjectProgressReport;
