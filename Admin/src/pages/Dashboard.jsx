import React from 'react';
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

const Dashboard = () => {
  // Task Stats
  const stats = [
    { _id: "1", label: "TOTAL TASKs", total: 10, icon: <FaNewspaper />, bg: "bg-[#1d4ed8]" },
    { _id: "2", label: "COMPLETED TASK", total: 6, icon: <MdAdminPanelSettings />, bg: "bg-[#0f766e]" },
    { _id: "3", label: "TASK IN PROGRESS", total: 3, icon: <LuClipboardList />, bg: "bg-[#f59e0b]" },
    { _id: "4", label: "TODOS", total: 1, icon: <FaArrowsToDot />, bg: "bg-[#be185d]" },
  ];

 // Project Overview Stats 
 const projectOverview = [
  { _id: "0", label: "TOTAL PROJECTS", total: 15, icon: <FaTasks />, bg: "bg-blue-600" }, // Added TOTAL PROJECTS
  { _id: "1", label: "NOT STARTED", total: 5, icon: <FaHourglassStart />, bg: "bg-gray-500" },
  { _id: "2", label: "IN PROGRESS", total: 7, icon: <FaProjectDiagram />, bg: "bg-yellow-500" },
  { _id: "3", label: "COMPLETED", total: 3, icon: <FaCheckCircle />, bg: "bg-green-500" },
];

  // Reusable Card Component for Tasks & Projects
  const Card = ({ label, count, bg, icon }) => (
    <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
      <div className='h-full flex flex-1 flex-col justify-between'>
        <p className='text-base text-gray-600'>{label}</p>
        <span className='text-2xl font-semibold'>{count}</span>
        <span className='text-sm text-gray-400'>{"Last Month's Data"}</span>
      </div>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${bg}`}>
        {icon}
      </div>
    </div>
  );

  return (
    <div className='p-2 mt-10 md:mt-0'>
      {/* Task Overview Section */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold mb-4'>Task Overview</h1>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
          {stats.map(({ icon, bg, label, total }, index) => (
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

    {/* Task Completion By Team Chart Section */}
    <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-gray-600 font-semibold mb-4'>
          Chart by Task Completion By Team
        </h4>
        <TaskCompletionByTeamChart/>
      </div>

   {/* Project Overview Section */}
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


    </div>
  );
};

export default Dashboard;
