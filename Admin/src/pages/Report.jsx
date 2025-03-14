import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { formatDate } from "../components/utils";
import html2canvas from "html2canvas";
import { useDispatch, useSelector } from "react-redux";
import { fetchreportData } from "../redux/slice/Analytical/Analytical";
const Report = () => {
  // Sample Data (Replace with actual API data)
/**  const reportData = [
    { task: "Design UI", status: "Completed", project: "Project A", user: "John Doe", date: "2024-03-01" },
    { task: "Develop API", status: "In Progress", project: "Project B", user: "Alice Smith", date: "2024-03-02" },
    { task: "Testing", status: "Not Started", project: "Project C", user: "Bob Johnson", date: "2024-03-03" },
  ];  */
  const dispatch = useDispatch();
  useEffect(() => {
    const handleReport=async()=>{
      await dispatch(fetchreportData());
    };
    handleReport();
  },[dispatch])
  const reportData = useSelector((state) => state.analytical.reportData);
  
  
  const [showDialog, setShowDialog] = useState(false);
  const [fileName, setFileName] = useState("");
  const [exportType, setExportType] = useState(""); // "csv" or "pdf"
  // Extract unique projects, users, and statuses
  const projects = [...new Set(reportData.map((item) => item.project))];
  const users = [...new Set(reportData.map((item) => item.user))];
  const statuses = [...new Set(reportData.map((item) => item.status))];

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    project: "",
    user: "",
    status: "",
  });

  // Show dialog and set export type
  const openExportDialog = (type) => {
    setExportType(type);
    setShowDialog(true);
  };

  // Handle filename input change
  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredData = reportData.filter((item) => {
    return (
      (filters.startDate === "" || item.date >= filters.startDate) &&
      (filters.endDate === "" || item.date <= filters.endDate) &&
      (filters.project === "" || item.project === filters.project) &&
      (filters.user === "" || item.user === filters.user) &&
      (filters.status === "" || item.status === filters.status)
    );
  });


  // Export CSV
  const exportCSV = () => {
    // Add a header or title as a comment or metadata
    let csv = `# Task Report\n`;
    csv += `# Generated On: ${new Date().toLocaleDateString()}\n\n`;
  
    // Add column headers
    csv += `Task,Status,Project,User,Date\n\n`;
  
    // Add data rows
    filteredData.forEach((row) => {
      csv += `${row.task},${row.status},${row.project},${row.user},${row.date}\n`;
    });
  
    // Create a Blob and trigger download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `${fileName || "report"}.csv`);
  };
  // Export PDF with formatted table content
  const exportPDF = () => {
    const htmlContent = `
    <html>
    <head>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          margin: 20px; 
          font-size: 26px;
          color: #333;
        }
        h1 { 
          text-align: center; 
          color: #2E86C1; 
          font-size: 22px;
          font-weight: bold; 
          margin-bottom: 10px;
        }
        p { 
          text-align: center; 
          font-size: 14px; 
          color: #555;
        }
        table { 
          width: 100%; 
          border-collapse: collapse; 
          margin-top: 20px; 
          background: #fff; 
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
        th, td { 
          border: 1px solid #ddd; 
          padding: 10px; 
          text-align: left; 
          font-size: 14px;
        }
        th { 
          background-color: #3498db; 
          color: white; 
          font-weight: bold; 
          text-transform: uppercase;
        }
        tr:nth-child(even) { 
          background-color: #f9f9f9; 
        }
        tr:nth-child(odd) { 
          background-color: #ffffff; 
        }
        tr:hover { 
          background-color: #f1f1f1; 
        }
        .no-data { 
          text-align: center; 
          font-size: 16px; 
          color: #e74c3c; 
          font-weight: bold; 
          padding: 10px;
        }
      </style>
    </head>
    <body>
      <h1>Task Report</h1>
      <p><strong>Generated On:</strong> ${new Date().toLocaleDateString()}</p>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Project</th>
            <th>User</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${
            filteredData.length > 0
              ? filteredData
                  .map(
                    (item) => `
                    <tr>
                      <td>${item.task}</td>
                      <td>${item.status}</td>
                      <td>${item.project}</td>
                      <td>${item.user}</td>
                      <td>${formatDate(item.date)}</td>
                    </tr>
                  `
                  )
                  .join('')
              : `<tr><td colspan="5" class="no-data">No Data Found</td></tr>`
          }
        </tbody>
      </table>
    </body>
    </html>
    `;
  
    const doc = new jsPDF("p", "mm", "a4");
    const element = document.createElement("div");
    element.innerHTML = htmlContent;
    document.body.appendChild(element);
  
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      doc.save(`${fileName || "task_report"}.pdf`);
      document.body.removeChild(element);
    });
  };
  

  

  // Handle export confirmation
  const handleExport = () => {
    if (!fileName.trim()) return alert("Please enter a valid file name.");
    setShowDialog(false);
    exportType === "csv" ? exportCSV() : exportPDF();
  };
// Print Report
const handlePrint = () => {
    window.print();
  };
const handleSubmit=async(e)=>{
    e.preventDefault();
};

  return (
    <>
     {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Export Report</h2>
            <label className="block text-gray-900 font-semibold mb-1">File Name</label>
            <input
              type="text"
              value={fileName}
              onChange={handleFileNameChange}
              placeholder="Enter file name"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}

     <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Task Reports</h1>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-md shadow-md mb-4 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <input type="date" name="startDate" className="border p-2 rounded-md" onChange={handleFilterChange} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">End Date</label>
          <input type="date" name="endDate" className="border p-2 rounded-md" onChange={handleFilterChange} />
        </div>

        {/* Project Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Project</label>
          <select name="project" className="border p-2 rounded-md" onChange={handleFilterChange}>
            <option value="">All Projects</option>
            {projects.map((project) => (
              <option key={project} value={project}>{project}</option>
            ))}
          </select>
        </div>

        {/* User Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">User</label>
          <select name="user" className="border p-2 rounded-md" onChange={handleFilterChange}>
            <option value="">All Users</option>
            {users.map((user) => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>

        {/* Task Status Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Task Status</label>
          <select name="status" className="border p-2 rounded-md" onChange={handleFilterChange}>
            <option value="">All</option>
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-4 rounded-md shadow-md">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-yellow-200">
              <th className="border p-2">Task</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Project</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{item.task}</td>
                  <td className="border p-2">{item.status}</td>
                  <td className="border p-2">{item.project}</td>
                  <td className="border p-2">{item.user}</td>
                  <td className="border p-2">{formatDate(item.date)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border p-2 text-center text-gray-500">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

        {/* Export Buttons */}
        <div className="flex gap-4 mt-4">
          <button onClick={() => openExportDialog("csv")} className="bg-green-600 text-white px-4 py-2 rounded-md">
            Export CSV
          </button>
          <button onClick={() => openExportDialog("pdf")} className="bg-red-600 text-white px-4 py-2 rounded-md">
            Export PDF
          </button>
          <button onClick={() => window.print()} className="bg-gray-600 text-white px-4 py-2 rounded-md">
            Print Report
          </button>
        </div>
    </div>
    </>
  );
};

export default Report;
