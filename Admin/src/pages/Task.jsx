import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { FaList, FaPlus, FaTh } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, fetchtasks, newTask, updateTask } from '../redux/slice/AssignTask/AssignTaskSlice';
import AddTask from '../components/Tasks/AddTask';
import TaskCard from '../components/Tasks/TaskCard';
import { formatDate, ICONS, PRIOTITYSTYELS, TASK_TYPE } from '../components/utils';
import { BiMessageAltDetail } from 'react-icons/bi';
import { MdAttachFile, MdDelete, MdModeEditOutline } from 'react-icons/md';
import UserInfo from '../components/User/UserInfo';
import { getUniqueColor } from '../components/utils/logoIntoName';
import { toast } from 'react-toastify';

const Task = () => {
    const [view, setView] = useState("board");
    const dispatch = useDispatch();

    useEffect(() => {
      const getTasks = async () => {
        await dispatch(fetchtasks());
      };
      getTasks();
    }, [dispatch]);
const tasks=useSelector((state)=>state.assigntasks.tasks);
const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
const [taskToEdit, setTaskToEdit] = useState(null);
const [formStage,setFormStage]=useState("Add");
const handleAddBtnStageTask = (stage) => {
  if (stage==="todo") {
    setTaskToEdit({
      title: "",
      description: "",
      assignedTo: [],
      priority: "normal",
      stage: "todo",
      assets: [],
      dueDate: "",
    });
    setFormStage("Todo");
  }else if (stage==="in progress") {
    setTaskToEdit({
      title: "",
      description: "",
      assignedTo: [],
      priority: "normal",
      stage: "in progress",
      assets: [],
      dueDate: "",
    });
    setFormStage("In Progress");
  }else if (stage==="completed") {
    setTaskToEdit({
      title: "",
      description: "",
      assignedTo: [],
      priority: "normal",
      stage: "completed",
      assets: [],
      dueDate: "",
    });
    setFormStage("Completed");
  }else{
    console.log("Invalid Stage");
    setTaskToEdit(null);
    
  }
  setIsAddTaskOpen(true);
};
const openAddTaskDialog = (task = null) => {
   if (task===null) {
    setTaskToEdit(null);
    setFormStage("Add");
   }else{
    setTaskToEdit(task);
    console.log("Task to Edit on open task:",task);
    
    setFormStage("Edit");
   }
   setIsAddTaskOpen(true);
};

const closeAddTaskDialog = () => {
  setIsAddTaskOpen(false);
  setTaskToEdit(null);
  setFormStage("Add");
};

const handleTaskSubmit = async (Taskdata) => {
  console.log("Task Data:", Taskdata);
  if (taskToEdit&&formStage==="Edit") {
    console.log("Edit Task",Taskdata);
    try {
      const res =await dispatch(updateTask(taskToEdit._id,Taskdata));
      console.log("Task Update Response:",res);
      if (res.payload.status==="success"&&res.payload.msg==="Task updated successfully") {
        toast.success(res.payload.msg);
      }else{
        toast.error(res.payload.msg);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("Updated Task.jsx Error :", error.message);
      
    }
  } else {
    console.log("Create Task",Taskdata);
    try {
      const res =await dispatch(newTask(Taskdata));
      console.log("Task Create Response:",res);
      if (res.payload.status==="success"&&res.payload.msg==="Task created successfully") {
        toast.success(res.payload.msg);
      }else{
        toast.error(res.payload.msg);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("Create Task.jsx Error :", error.message);
    }
  }
  dispatch(fetchtasks());
  closeAddTaskDialog();
};

  const handleDeleteTask = async (taskId) => {
    console.log("Deleting Task:", taskId);
    try {
      const res = await dispatch(deleteTask(taskId));
      if (
        res.payload.status === "success" &&
        res.payload.msg === "Task deleted successfully"
      ) {
        await dispatch(fetchtasks());
        toast.success(res.payload.msg);
      } else if (res.payload.status === "fail") {
        toast.error(res.payload.msg);
      }
    } catch (error) {
      console.log("Task Deleted Error :", error.message);
      toast.error(error.message);
    }
  };

// Handle missing token
const token = localStorage.getItem("token");
const Decodetoken = token ? jwtDecode(token) : {};
  return (
    <>
      <AddTask
        closeAddTasksDialog={closeAddTaskDialog}
        TasksToEdit={taskToEdit}
        onSubmit={handleTaskSubmit}
        formStage={formStage}
        onOpen={isAddTaskOpen}
      />

      <div className="p-1 mt-12 sm:mt-0 w-full space-y-6 bg-slate-100 min-h-screen scrollbar-hide">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
      
                {/* Add Button (Admin & Manager Only) */}
                {(Decodetoken?.userLevel === "Admin" || Decodetoken?.userLevel === "Manager") && (
                  <button
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md active:scale-95"
                  onClick={() => openAddTaskDialog()}  
                >
                
                    <FaPlus className="text-sm" />
                    <span className="text-sm font-medium">Add Task</span>
                  </button>
                )}
              </div>
      
              {/* Tabs (Board View / List View) */}
              <div className="flex gap-4">
                <button
                  className={`flex items-center gap-2 px-5 py-2 border-2 rounded-lg transition-all duration-200 shadow-sm
                    ${view === "board" ? "border-blue-600 text-blue-600 bg-blue-50" : "border-gray-300 text-gray-600 bg-white hover:bg-gray-100"}`}
                  onClick={() => setView("board")}
                >
                  <FaTh className="text-lg" />
                  <span className="text-sm font-medium">Board View</span>
                </button>
      
                {/* Hide List View on Mobile */}
                <button
                  className={`hidden sm:flex items-center gap-2 px-5 py-2 border-2 rounded-lg transition-all duration-200 shadow-sm
                    ${view === "list" ? "border-blue-600 text-blue-600 bg-blue-50" : "border-gray-300 text-gray-600 bg-white hover:bg-gray-100"}`}
                  onClick={() => setView("list")}
                >
                  <FaList className="text-lg" />
                  <span className="text-sm font-medium">List View</span>
                </button>
              </div>
              {/*Add Todo or Add In Progress or Add Complete Task*/}
              <div className='flex flex-row items-center justify-between gap-2 md:gap-1'>
                <div className=' hover:cursor-pointer shadow-lg hover:border-blue-500 hover:text-blue-600  bg-white  hover:bg-slate-300 w-72 text-center text-xs md:text-base h-12 border-2  rounded-lg flex flex-row items-center justify-between p-2'
                     onClick={() => handleAddBtnStageTask("todo")}>
                    <div className='flex flex-row items-center gap-2'>
                       <div className={`w-4 h-4 rounded-full ${TASK_TYPE["todo"]}`} />
                      <p className='text-black font-medium'>To Do</p>
                    </div>
                    <FaPlus className= "sm:text-sm " />
                </div>
                <div className=' hover:cursor-pointer shadow-lg hover:border-blue-500 hover:text-blue-600  bg-white  hover:bg-slate-300 w-72 text-center text-xs md:text-base h-12 border-2  rounded-lg flex flex-row items-center justify-between p-2'
                     onClick={() => handleAddBtnStageTask("in progress")}>
                    <div className='flex flex-row items-center gap-2'>
                    <div className={`w-4 h-4 rounded-full ${TASK_TYPE["in progress"]}`} />
                      <p className='text-black font-medium'>In Progress</p>
                    </div>
                    <FaPlus className= "sm:text-sm " />
                </div>
                <div className='hover:cursor-pointer shadow-lg hover:border-blue-500  hover:text-blue-600 bg-white  hover:bg-slate-300 w-72 text-center text-xs md:text-base h-12 border-2  rounded-lg flex flex-row items-center justify-between p-2'
                     onClick={() => handleAddBtnStageTask("completed")}>
                    <div className='flex flex-row items-center gap-2'>
                      <div className={`w-4 h-4 rounded-full ${TASK_TYPE["completed"]}`} />
                      <p className='text-black font-medium'>Completed</p>
                    </div>
                    <FaPlus className= "sm:text-sm " />
                </div>

              </div>
      
              {/* View Content */}
              {view === "board" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Task Cards */}
                  {tasks.map((task, index) => (
                    <TaskCard key={index} task={task} />
                  ))}
                </div>
              ) : (
                // List View (Hidden on Mobile)
                <div className="hidden sm:block bg-white rounded-xl shadow-lg overflow-hidden">
                  <table className="w-full border-collapse table-auto">
                    <thead className="bg-yellow-200 text-gray-700 text-left">
                      <tr>
                        <th className="p-4 text-md text-left w-1/5">Task Title</th>
                        <th className="p-4 text-md text-left w-1/6">Project Name</th>
                        <th className="p-4 text-md text-left w-1/6">Priority</th>
                        <th className="p-4 text-md text-left w-1/6">Created At</th>
                        <th className="p-4 text-md text-left w-1/6">Assets</th>
                        <th className="p-4 text-md text-left w-1/6">Assiged To</th>
                        <th className="p-4 text-md text-center w-1/6">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task, index) => (
                        <tr key={index} className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10">
                          {/* Task Title */}
                          <td className="p-4 text-left w-1/5">
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded-full ${TASK_TYPE[task.stage]}`} />
                              <p className="w-full line-clamp-2 text-black">{task?.title}</p>
                            </div>
                          </td>
                          {/* Project Name */}
                          <td className="p-4 text-left w-1/6">
                            <span className="text-sm font-medium text-gray-800">{task?.project?.name}</span>
                          </td>

                          {/* Priority */}
                          <td className="p-4 text-left w-1/6">
                            <div className="flex items-center gap-1">
                              <span className={`text-lg ${PRIOTITYSTYELS[task?.priority]}`}>
                                {ICONS[task?.priority]}
                              </span>
                              <span className="capitalize">{task?.priority} Priority</span>
                            </div>
                          </td>

                          {/* Created At */}
                          <td className="p-4 text-left w-1/6">
                            <span className="text-sm">{formatDate(new Date(task?.dueDate))}</span>
                          </td>

                          {/* Assets */}
                          <td className="p-4 text-left w-1/6">
                            <div className="flex items-center gap-3">
                              <div className="flex gap-1 items-center text-sm">
                                <BiMessageAltDetail />
                                <span>{task?.activities?.length}</span>
                              </div>
                              <div className="flex gap-1 items-center text-sm">
                                <MdAttachFile />
                                <span>{task?.assets?.length}</span>
                              </div>
                              <div className="flex gap-1 items-center text-sm">
                                <FaList />
                                <span>0/{task?.subTasks?.length}</span>
                              </div>
                            </div>
                          </td>

                          {/* Team */}
                          <td className="p-4 text-left w-1/6">
                            <div className="flex">
                              {task?.assignedTo?.map((m, index) => (
                                <div key={index} className={`w-7 h-7 rounded-full text-white flex items-center justify-center text-xs -mr-1 ${getUniqueColor(m.name)}`}>
                                  <UserInfo user={m} styles={"transform -translate-x-[110%] -translate-y-[95%]"} />
                                </div>
                              ))}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="p-4 text-left w-1/6">
                            <div className="flex gap-2 md:gap-4 justify-start">
                              <button className="px-4 py-2 bg-blue-100 text-blue-600 hover:bg-blue-700 hover:text-white rounded-md transition-all"
                                      onClick={() =>openAddTaskDialog(task)}>
                                <MdModeEditOutline />
                              </button>
                              <button className="px-4 py-2 bg-red-100 text-red-500 hover:bg-red-600 hover:text-white rounded-md transition-all"
                                      onClick={() => handleDeleteTask(task._id)}>
                                <MdDelete />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              )}
            </div>
    </>
  )
}

export default Task