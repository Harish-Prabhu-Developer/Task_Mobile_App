import React, { useState } from "react";
import { FaProjectDiagram, FaTasks, FaUsers, FaUserTie } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import { RxActivityLog } from "react-icons/rx";
import { getInitials, GETROLE, ICONS, PRIOTITYSTYELS, TASK_TYPE } from "../components/utils";
import { MdTaskAlt } from "react-icons/md";
import Activities from "../components/Tasks/Activities";
import { getUniqueColor } from "../components/utils/logoIntoName";
import { useDispatch, useSelector } from "react-redux";
import {SUBTASKSTATUSICONS} from "../components/utils/index"
const TaskDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const task = location.state?.task;
  const [view, setView] = useState("Task Detail");


  console.log("task in taskDetails", task);
  
  const bgColor = {
    high: "bg-red-200",
    medium: "bg-yellow-200",
    low: "bg-blue-200",
  };


  if (!task) {
    return <p>Task not found!</p>;
  }

  return (
    <div className="p-4 mt-12 sm:mt-0 w-full space-y-6 bg-slate-100 min-h-screen scrollbar-hide">
      {/* Title */}
      <h1 className="text-2xl text-gray-600 font-bold">{task?.title}</h1>

      {/* Tabs */}
      <div className="flex gap-4">
        {["Task Detail", "Activities/Timeline"].map((tab) => (
          <button
            key={tab}
            className={`flex items-center gap-2 px-5 py-2 border-2 rounded-lg transition-all duration-200 shadow-sm
              ${view === tab ? "border-blue-600 text-blue-600 bg-blue-50" : "border-gray-300 text-gray-600 bg-white hover:bg-gray-100"}`}
            onClick={() => setView(tab)}
          >
            {tab === "Task Detail" ? <FaTasks className="text-lg" /> : <RxActivityLog className="text-lg" />}
            <span className="text-sm font-medium">{tab}</span>
          </button>
        ))}
      </div>

      {/* View Content */}
      {view === "Task Detail" ? (
        <div className="w-full flex flex-col md:flex-row gap-5 bg-white shadow-md p-6">
          {/* LEFT SIDE */}
          <div className="w-full md:w-1/2 space-y-6">
            {/* Priority & Status */}
            <div className="flex items-center gap-5">
              <div className={`flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full ${PRIOTITYSTYELS[task?.priority]} ${bgColor[task?.priority]}`}>
                <span className="text-lg">{ICONS[task?.priority]}</span>
                <span className="uppercase">{task?.priority} Priority</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${TASK_TYPE[task.stage]}`} />
                <span className="text-black uppercase">{task?.stage}</span>
              </div>
            </div>


            {/* Task Dates */}
            <p className="text-gray-500">Created At: {new Date(task?.createdAt).toDateString()}</p>
            {task?.updatedAt && <p className="text-gray-500">Updated At: {new Date(task?.updatedAt).toDateString()}</p>}


          {/* Project Details Section */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
              <FaProjectDiagram className="text-blue-600" /> Project Details
            </h2>

            <div className="mt-4 bg-blue-50 p-4 rounded-lg shadow-sm border-l-4 border-blue-600">
              {/* Project Name */}
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FaTasks className="text-blue-500" /> {task?.project?.name}
              </h3>

              {/* Project Description */}
              <p className="text-gray-600 mt-1 text-sm">{task?.project?.description}</p>

              {/* Project Metadata */}
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                  <FaUserTie className="text-gray-500" />
                  {/**how to get the project creator name  */} 
                  <span>Created By: {task?.project?.createdBy?.name}</span>
                </div>

                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                  <FaUsers className="text-gray-500" /> 
                  <span>Team Size: {task?.project?.teamMembers?.length}</span>
                </div>
              </div>
            </div>
          </div>
            {/* Task Stats */}
            <div className="flex items-center gap-8 p-4 border-y border-gray-200">
              <div className="space-x-2">
                <span className="font-semibold">Assets:</span>
                <span>{task?.assets?.length}</span>
              </div>
              <span className="text-gray-400">|</span>
              <div className="space-x-2">
                <span className="font-semibold">Sub-Task:</span>
                <span>{task?.subTasks?.length}</span>
              </div>
            </div>

            {/* Task Team */}
            <div className='space-y-4 py-6'>
                  <p className='text-gray-600 font-semibold test-sm'>
                    TASK TEAM
                  </p>
                  <div className='space-y-3'>
                    {task?.assignedTo?.map((user, index) => (
                      <div
                        key={index}
                        className='flex gap-4 py-2 items-center border-t border-gray-200'
                      >
                        <div
                          className={`w-10 h-10 rounded-full text-white flex items-center font-bold justify-center text-md -mr-1 ${getUniqueColor(user?.name)}`}
                        >
                          <span className='text-center'>
                            {getInitials(user?.name)}
                          </span>
                        </div>

                        <div>
                          <p className='text-lg font-semibold'>{user?.name}</p>
                          <span className='text-gray-500'>{GETROLE(user)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

            {/* Sub-Tasks */}
            <div className='space-y-4 py-6'>
                  <p className='text-gray-500 font-semibold text-sm'>
                    SUB-TASKS
                  </p>
                  <div className='space-y-8'>
                    {task?.subTasks?.map((el, index) => (
                      <div key={index} className='flex gap-3'>
                        <div>
                            { SUBTASKSTATUSICONS[el?.status]}
                        </div>

                        <div className='space-y-1'>
                          <div className='flex gap-2 items-center'>
                            <span className='text-sm text-gray-500'>
                              {new Date(el?.date).toDateString()}
                            </span>

                            <span className='px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold'>
                              {el?.tag}
                            </span>
                          </div>

                          <p className='text-gray-700'>{el?.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
          </div>

          {/* RIGHT SIDE (ASSETS) */}
          <div className="w-full md:w-1/2 space-y-6">
            <p className="text-lg font-semibold">ASSETS</p>
            <div className="grid grid-cols-2 gap-4">
              {task?.assets?.map((el, index) => (
                <img key={index} src={`http://localhost:3000/${el}`} alt={task?.title} className="w-full rounded h-28 md:h-36 transition-all hover:scale-110" />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Activities  task={task} />
      )}
    </div>
  );
};

export default TaskDetails;
