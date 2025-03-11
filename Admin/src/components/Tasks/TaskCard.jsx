//TaskCard.jsx
import React, { useState } from "react";
import {
  MdAttachFile,
  MdCalendarToday,
  MdEvent,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,

} from "react-icons/md";
import {  formatDate, ICONS, PRIOTITYSTYELS,  TASK_TYPE } from "../utils";
import { FaList } from "react-icons/fa";
import { BiCalendarAlt, BiMessageAltDetail } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getUniqueColor } from "../utils/logoIntoName";
import AddSubTask from "./AddSubTask";
import UserInfo from "../User/UserInfo";
import { useNavigate } from "react-router-dom";
import { updateTask } from "../../redux/slice/AssignTask/AssignTaskSlice";
const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users);
  const [isAddSubTaskOpen, setIsAddSubTaskOpen] = useState(false);
  const [SubTasksToEdit, setSubTasksToEdit] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  

  const latestSubTask = task?.subTasks?.length
    ? task.subTasks.reduce((latest, current) =>
        new Date(current.date) > new Date(latest.date) ? current : latest
      )
    : null;

  const openAddSubTasksDialog = (SubTask = null) => {
    setSubTasksToEdit(SubTask);
    setIsAddSubTaskOpen(true);
  };

  const closeAddSubTasksDialog = () => {
    setIsAddSubTaskOpen(false);
    setSubTasksToEdit(null);
  };

  const handleSubTaskSubmit = (SubTaskdata) => {
    console.log("SubTask Data:", SubTaskdata);
     
    closeAddSubTasksDialog();
  };

  return (
    <>
      <AddSubTask
        onOpen={isAddSubTaskOpen}
        closeAddSubTasksDialog={closeAddSubTasksDialog}
        SubTasksToEdit={SubTasksToEdit}
        onSubmit={handleSubTaskSubmit}
      />

      <div className="bg-white shadow-lg border-gray-400 border-spacing-48 rounded-lg p-4"
            onClick={()=>navigate(`/task/${task._id}`,{ state: { task } })}
            >
        {/* Task Priority */}
        <div className="flex flex-row items-center justify-between">
          <div
            className={`flex flex-1 gap-1 items-center text-sm font-medium ${PRIOTITYSTYELS[task?.priority]}`}
          >
            <span className="text-lg">{ICONS[task?.priority]}</span>
            <span className="uppercase">{task?.priority} Priority</span>
          </div>
        </div>


        {/* Project Info */}
        {task?.project && (
          <div className="mt-4 p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-blue-800 ">
              {task.project.name}
            </h3>
            <p className="text-sm font-medium text-gray-600 mt-1">{task.project.description}</p>

            {/* Start & End Dates */}
            <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-700">
              <span className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full">
                <MdCalendarToday className="text-blue-600" />
                <span className="font-medium">Start:</span>{formatDate(new Date(task.project.startDate))}
              </span>
              <span className="flex items-center gap-1 bg-red-100 px-3 py-1 rounded-full">
                <MdEvent className="text-red-600 text-[114%]" />
                <span className="font-medium">End:</span>{formatDate(new Date(task.project.endDate))}
              </span>
            </div>

            {/* Project Status */}
            {/*<div className="mt-3">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <span className={`ml-2 px-3 py-1 rounded-full text-white font-medium text-xs ${PROJECT_TYPE[task.project.status]}`}>
                {task.project.status}
              </span>
            </div>*/}
          </div>
        )}

        {/* Task Title */}
        <div className="flex flex-col gap-1 mt-2">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${TASK_TYPE[task.stage]}`} />
            <h4 className="line-clamp-1 text-black">{task?.title}</h4>
          </div>
          <span className="text-sm text-gray-600  flex items-center gap-1 bg-lime-200 p-[1.2%] w-fit rounded-full">
          <BiCalendarAlt className="text-lime-700" />
            <strong>Due Date :</strong> {formatDate(new Date(task.dueDate))}
          </span>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-200 my-2" />

        {/* Task Details */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center text-sm text-gray-600">
              <BiMessageAltDetail />
              <span>{task?.activities?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600">
              <MdAttachFile />
              <span>{task?.assets?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600">
              <FaList />
              <span>0/{task?.subTasks?.length}</span>
            </div>
          </div>

          {/* Assigned Users */}
          <div className="flex flex-row-reverse">
            {task?.assignedTo?.map((user, index) => (
              <div
                key={index}
                className={`w-7 h-7 rounded-full text-white flex items-center font-bold justify-center text-xs -mr-1 ${getUniqueColor(user.name)}`}
              >
                <UserInfo user={user} styles={"transform -translate-x-[90%] -translate-y-[125%] "} />
              </div>
            ))}
          </div>
        </div>

        {/* Sub-Tasks Section */}
        {task?.subTasks?.length > 0 ? (
          <div className="py-4 border-t border-gray-200">
            <h5 className="text-base font-semibold text-black flex items-center justify-between">
              Sub-Task
              <button onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? (
                  <MdKeyboardArrowUp className="text-xl text-gray-600" />
                ) : (
                  <MdKeyboardArrowDown className="text-xl text-gray-600" />
                )}
              </button>
            </h5>

            {/* Show only the latest sub-task when collapsed */}
            {!isExpanded && latestSubTask && (
              <div className="p-2 border rounded-lg bg-gray-50">
                <h6 className="text-sm font-medium text-black">
                  {latestSubTask.title}
                </h6>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>{formatDate(new Date(latestSubTask.date))}</span>
                  <span className="bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium">
                    {latestSubTask.tag}
                  </span>
                </div>
              </div>
            )}

            {/* Show all sub-tasks when expanded */}
            {isExpanded && (
              <div className="mt-2 space-y-2">
                {task?.subTasks?.map((subTask, index) => (
                  <div key={index} className="p-2 border rounded-lg bg-gray-50">
                    <h6 className="text-sm font-medium text-black">
                      {subTask.title}
                    </h6>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>{formatDate(new Date(subTask.date))}</span>
                      <span className="bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium">
                        {subTask.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="py-4 border-t border-gray-200">
            <span className="text-gray-500">No Sub Tasks</span>
          </div>
        )}

        {/* Add SubTask Button */}
        <button
          onClick={() => openAddSubTasksDialog()}
          className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold"
        >
          <IoMdAdd className="text-lg" />
          <span>ADD SUBTASK</span>
        </button>
      </div>
    </>
  );
};

export default TaskCard;
