import React from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Ensure you import autoTable

const EmployeePerformanceReport = () => {
    const employees = [
        {
          _id: "1",
          name: "John Doe",
          tasks: [
            { id: 1, title: "Task A", stage: "completed", dueDate: "2024-03-10" },
            { id: 2, title: "Task B", stage: "completed", dueDate: "2024-03-12" },
            { id: 3, title: "Task C", stage: "in progress", dueDate: "2024-03-15" },
            { id: 4, title: "Task D", stage: "completed", dueDate: "2024-03-05" },
            { id: 5, title: "Task E", stage: "overdue", dueDate: "2024-03-02" },
          ],
        },
        {
          _id: "2",
          name: "Jane Smith",
          tasks: [
            { id: 6, title: "Task F", stage: "completed", dueDate: "2024-03-08" },
            { id: 7, title: "Task G", stage: "overdue", dueDate: "2024-03-10" },
            { id: 8, title: "Task H", stage: "in progress", dueDate: "2024-03-18" },
            { id: 9, title: "Task I", stage: "completed", dueDate: "2024-03-09" },
          ],
        },
      ];
      
  if (!employees || employees.length === 0) {
    return <p>No employee data available.</p>;
  }

  // Function to calculate performance metrics
  const calculatePerformance = (tasks) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.stage === "completed").length;
    const overdueTasks = tasks.filter(task => new Date(task.dueDate) < new Date() && task.stage !== "completed").length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0;
    
    return { totalTasks, completedTasks, overdueTasks, pendingTasks, completionRate };
  };

  // Prepare Data for CSV
  const csvData = [
    ["Employee Name", "Total Tasks", "Completed", "Overdue", "Pending", "Completion Rate (%)"],
    ...employees.map((emp) => {
      const { totalTasks, completedTasks, overdueTasks, pendingTasks, completionRate } = calculatePerformance(emp.tasks);
      return [emp.name, totalTasks, completedTasks, overdueTasks, pendingTasks, `${completionRate}%`];
    })
  ];

  // Export to PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Employee Performance Report", 14, 15);
  
    autoTable(doc, {
      startY: 20,
      head: [["Employee Name", "Total Tasks", "Completed", "Overdue", "Pending", "Completion Rate (%)"]],
      body: employees.map((emp) => {
        const { totalTasks, completedTasks, overdueTasks, pendingTasks, completionRate } = calculatePerformance(emp.tasks);
        return [emp.name, totalTasks, completedTasks, overdueTasks, pendingTasks, `${completionRate}%`];
      }),
    });
  
    doc.save("Employee_Performance_Report.pdf");
  };
  
  return (
    <div className="p-6 bg-white rounded-md shadow">
      <h2 className="text-xl font-semibold mb-4">Employee Performance Report</h2>
      
      {/* Table Display */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-yellow-200">
            <th className="border p-2">Employee Name</th>
            <th className="border p-2">Total Tasks</th>
            <th className="border p-2">Completed</th>
            <th className="border p-2">Overdue</th>
            <th className="border p-2">Pending</th>
            <th className="border p-2">Completion Rate (%)</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => {
            const { totalTasks, completedTasks, overdueTasks, pendingTasks, completionRate } = calculatePerformance(emp.tasks);
            return (
              <tr key={emp._id} className="border">
                <td className="border p-2">{emp.name}</td>
                <td className="border p-2 text-center">{totalTasks}</td>
                <td className="border p-2 text-center">{completedTasks}</td>
                <td className="border p-2 text-center">{overdueTasks}</td>
                <td className="border p-2 text-center">{pendingTasks}</td>
                <td className="border p-2 text-center">{completionRate}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Export Options */}
      <div className="mt-4 flex gap-4">
        <CSVLink data={csvData} filename="Employee_Performance_Report.csv" className="bg-blue-500 text-white px-4 py-2 rounded">Export CSV</CSVLink>
        <button onClick={exportPDF} className="bg-red-500 text-white px-4 py-2 rounded">Export PDF</button>
      </div>
    </div>
  );
};

export default EmployeePerformanceReport;
