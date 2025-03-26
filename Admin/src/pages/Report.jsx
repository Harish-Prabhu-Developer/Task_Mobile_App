import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { formatDate } from "../components/utils";
import html2canvas from "html2canvas";
import { useDispatch, useSelector } from "react-redux";
import { fetchreportData } from "../redux/slice/Analytical/Analytical";
import ProjectProgressReport from "../components/Reports/ProjectProgressReport";
import EmployeePerformanceReport from "../components/Reports/EmployeePerformanceReport";
import MonthlyActivityLogReport from "../components/Reports/MonthlyActivityLogReport";
import TaskSummaryFilterReport from "../components/Reports/TaskSummaryFilterReport";
const Report = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleReport=async()=>{
      await dispatch(fetchreportData());
    };
    handleReport();
  },[dispatch])
  const reportData = useSelector((state) => state.analytical.reportData);
  return (
     <div className="p-1 mt-12 sm:mt-0 w-full space-y-6 bg-white min-h-screen scrollbar-hide">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <div>
          <TaskSummaryFilterReport reportData={reportData.reportData}/>
        </div>
      <div>
          <ProjectProgressReport />
        </div>
        <div>
          <EmployeePerformanceReport />
        </div>
        <div>
          <MonthlyActivityLogReport/>
        </div>
    </div>
  );
};

export default Report;
