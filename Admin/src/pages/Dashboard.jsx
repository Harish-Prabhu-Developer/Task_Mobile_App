import React, { useEffect, useState } from 'react';
import { FaNewspaper, FaTasks } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaArrowsToDot } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import { FaHourglassStart, FaProjectDiagram, FaCheckCircle } from "react-icons/fa"; // Added Project Icons
import PriorityChart from '../components/Charts/PriorityChart';
import ProjectProgressChart from '../components/Charts/ProjectProgressChart';
import TaskDueCompletedChart from '../components/Charts/TaskDueCompletedChart';
import TaskCompletionByTeamChart from '../components/Charts/TaskCompletionByTeamChart';
import TaskStatusChart from '../components/Charts/TaskStatusChart';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSummaryData } from '../redux/slice/Analytical/Analytical';
const Dashboard = () => {
// Handle missing token
const token = localStorage.getItem("token");
const Decodetoken = token ? jwtDecode(token) : {};

const dispatch = useDispatch();
 // State for Overview Data
 useEffect(()=>{
    const handleSummary=async()=>{
      await dispatch(fetchSummaryData());
    };
    handleSummary();
 },[dispatch]);
 const SummaryData=useSelector((state)=>state.analytical.summaryData);
 const [taskOverview, setTaskOverview] = useState([]);
 const [projectOverview, setProjectOverview] = useState([]);


 useEffect(() => {
   // Set Task Overview Data
   setTaskOverview([
     { label: "TOTAL TASKS", total: SummaryData?.TaskStatusTotal?.total || 0, icon: <FaNewspaper />, bg: "bg-[#1d4ed8]" },
     { label: "COMPLETED TASK", total: SummaryData?.TaskStatusTotal?.completed || 0, icon: <MdAdminPanelSettings />, bg: "bg-[#0f766e]" },
     { label: "TASK IN PROGRESS", total: SummaryData?.TaskStatusTotal?.["in progress"] || 0, icon: <LuClipboardList />, bg: "bg-[#f59e0b]" },
     { label: "TODOS", total: SummaryData?.TaskStatusTotal?.todo || 0, icon: <FaArrowsToDot />, bg: "bg-[#be185d]" },
   ]);

   // Set Project Overview Data
   setProjectOverview([
     { label: "TOTAL PROJECTS", total: SummaryData?.ProjectStatusTotal?.Total || 0, icon: <FaTasks />, bg: "bg-blue-600" },
     { label: "NOT STARTED", total: SummaryData?.ProjectStatusTotal?.["Not Started"] || 0, icon: <FaHourglassStart />, bg: "bg-gray-500" },
     { label: "IN PROGRESS", total: SummaryData?.ProjectStatusTotal?.["In Progress"] || 0, icon: <FaProjectDiagram />, bg: "bg-yellow-500" },
     { label: "COMPLETED", total: SummaryData?.ProjectStatusTotal?.Completed || 0, icon: <FaCheckCircle />, bg: "bg-green-500" },
   ]);
 }, []);

  // Reusable Card Component for Tasks & Projects
  const Card = ({ label, count, bg, icon }) => {
    // Function to get the last month's name
    const getLastMonth = () => {
      const date = new Date();
      date.setMonth(date.getMonth() ); // Go to the current month
      return date.toLocaleString('default', { month: 'long' }); // Get month name
    };
  
    return (
      <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-gray-600'>{label}</p>
          <span className='text-2xl font-semibold'>{count}</span>
          <span className='text-sm text-gray-400'>{`${getLastMonth()} Data`}</span> 
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${bg}`}>
          {icon}
        </div>
      </div>
    );
  };
  
  return (
    <div className='p-2 mt-10 md:mt-0'>
      {/* Task Overview Section */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold mb-4'>Task Overview</h1>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
          {taskOverview.map(({ icon, bg, label, total }, index) => (
            <Card key={index} icon={icon} bg={bg} label={label} count={total} />
          ))}
        </div>
      </div>
    {/* Priority Chart Section */}
    <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-gray-600 font-semibold mb-4'>
          Chart by Priority
        </h4>
        <PriorityChart/>
      </div>

    {/* Task Status Chart Section */}
    <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-gray-600 font-semibold mb-4'>
          Chart by Task Status
        </h4>
        <TaskStatusChart/>
      </div>

    {/* Task Due vs Completed Chart Section */}
    <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-gray-600 font-semibold mb-4'>
          Chart by Task Due vs Completed
        </h4>
        <TaskDueCompletedChart/>
      </div>
      {(Decodetoken?.userLevel === "Admin" || Decodetoken?.userLevel === "Manager") && (
        <>
            {/* Task Completion By Team Chart Section */}
              <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
              <h4 className='text-xl text-gray-600 font-semibold mb-4'>
                Chart by Task Completion By Team
              </h4>
              <TaskCompletionByTeamChart/>
            </div>
        </>
      )}


   
  <>
  {/* Project Overview Section */}
      {(Decodetoken?.userLevel === "Admin" || Decodetoken?.userLevel === "Manager") && (
        <>
         <div>
         <h1 className='text-2xl font-bold mb-4'>Project Overview</h1>
         <div className='grid grid-cols-1 md:grid-cols-4 gap-5'> {/* Changed to 4 columns to accommodate TOTAL PROJECTS */}
           {projectOverview.map(({ icon, bg, label, total }, index) => (
             <Card key={index} icon={icon} bg={bg} label={label} count={total} />
           ))}
         </div>
       </div>
 
     {/* Project Progress Chart Section */}
     <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
         <h4 className='text-xl text-gray-600 font-semibold mb-4'>
           Chart by Project Progress
         </h4>
         <ProjectProgressChart/>
       </div>
       </>
      )}
  </>


    </div>
  );
};

export default Dashboard;
