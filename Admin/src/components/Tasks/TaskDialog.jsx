import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { MdAdd, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddTask from "./AddTask";
import AddSubTask from "./AddSubTask";
import CustomDeleteAlert from "../alert/CustomDeleteAlert";
import { toast } from "react-toastify";
import { deleteTask, fetchtasks, newTask, updateTask } from "../../redux/slice/AssignTask/AssignTaskSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

const TaskDialog = ({ task }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [formStage,setFormStage]=useState("Add");
  const [openDelete, setOpenDelete] = useState(false);
  const [TaskToDelete, setTaskToDelete] = useState(null);
  const [isAddSubTaskOpen, setIsAddSubTaskOpen] = useState(false);
  const [SubTasksToEdit, setSubTasksToEdit] = useState(null);
  // Handle missing token
  const token = localStorage.getItem("token");
  const Decodetoken = token ? jwtDecode(token) : {};

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteClicks = () => {};
  const deleteHandler = () => {};
//Add Task
const handleAddBtnStageTask = (stage) => {
  setTaskToEdit({
    title: "",
    description: "",
    assignedTo: [],
    priority: "normal",
    stage: stage,  // Use the passed stage directly
    assets: [],
    dueDate: "",
  });
  setFormStage(stage.charAt(0).toUpperCase() + stage.slice(1));  // Capitalize the stage (Todo, In Progress, Completed)
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
    console.log("Edit Task",Taskdata._id);
    try {
      const res =await dispatch(updateTask({ taskId: taskToEdit._id, taskData: Taskdata }));
      console.log("Task Update Response:",res);
      if (res.payload.status==="success"&&res.payload.msg==="Task updated successfully") {
        toast.success(res.payload.msg);
      }else if (res.payload.status==="fail") {
        toast.error(res.payload);
       
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
      }else if (res.payload.status==="fail") {
        toast.error(res.payload);
        
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
    setTaskToDelete(taskId);
    setOpenDelete(true);
  };
  
  const confirmDelete = async () => {
    if (!TaskToDelete) return;
    try {
      const res = await dispatch(deleteTask(TaskToDelete));
      if (res.payload.status === "success" && res.payload.msg === "Task deleted successfully") {
        await dispatch(fetchtasks());
        toast.success(res.payload.msg);
      } else {
        toast.error(res.payload.msg || "Failed to delete task.");
      }
    } catch (error) {
      console.log("Task Delete Error:", error.message);
      toast.error(error.message);
    }
    setOpenDelete(false);
    setTaskToDelete(null);
  };
  
  //Add Sub Tasks
  const openAddSubTasksDialog = (SubTask = null) => {
    setSubTasksToEdit(SubTask);
    setIsAddSubTaskOpen(true);
  };

  const closeAddSubTasksDialog = () => {
    setIsAddSubTaskOpen(false);
    setSubTasksToEdit(null);
  };

  const handleSubTaskSubmit = async (SubTaskdata) => {
    console.log("SubTask Data:", SubTaskdata);
  
    if (!task?._id) {
      console.error("Task ID is missing!");
      toast.error("Error: Task not found.");
      return;
    }
  
    const data = await {
      
        "subTasks": {
          "title": SubTaskdata.title,
          "date": SubTaskdata.date,
          "tag": SubTaskdata.tag,
        },
      
    };
    console.log("Sub Task Data push :", data);
    
    try {
      const res = await dispatch(updateTask({ taskId: task._id, taskData: data }));
      console.log("Sub Task Update Response:", res);
  
      if (res.payload && res.payload.status === "success" && res.payload.msg === "Task updated successfully") {
        toast.success("Sub Task Added Successfully");
        dispatch(fetchtasks()); // Fetch tasks only if update was successful
      } else {
        toast.error(res.payload?.msg || "Failed to update task.");
      }
    } catch (error) {
      toast.error(error.message);
      console.log("Updated Task.jsx Error:", error.message);
    }
  
    closeAddSubTasksDialog();
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const items = [
    {
      label: "Open Task",
      icon: <AiTwotoneFolderOpen className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => navigate(`/task/${task._id}`, { state: { task } }),
    },
    {
      label: "Add Sub-Task",
      icon: <MdAdd className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => openAddSubTasksDialog(task),
    },
  ];
  
  if (Decodetoken?.userLevel === "Admin" || Decodetoken?.userLevel === "Manager") {
    items.push(
      {
        label: "Edit",
        icon: <MdOutlineEdit className='mr-2 h-5 w-5' aria-hidden='true' />,
        onClick: () => openAddTaskDialog(task),
      },
      {
        label: "Delete",
        icon: <RiDeleteBin6Line className='mr-2 h-5 w-5 text-red-400' aria-hidden='true' />,
        onClick: () => handleDeleteTask(task._id),
      }
    );
  }
  
  return (
    <>
      <div className="relative inline-block text-left" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600"
        >
          <BsThreeDots />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg p-2 z-50">
            <div className="space-y-2">
              {items.map((el) => (
                <button
                  key={el.label}
                  onClick={() => {
                    el.onClick();
                    setMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-2 py-2 text-sm rounded-md hover:bg-blue-500 hover:text-white ${el.label === "Delete" ? " text-red-900" : "text-gray-900"}`}
                >
                  {el.icon}
                  {el.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <AddTask
        closeAddTasksDialog={closeAddTaskDialog}
        TasksToEdit={taskToEdit}
        onSubmit={handleTaskSubmit}
        formStage={formStage}
        onOpen={isAddTaskOpen}
      />

    <AddSubTask
        onOpen={isAddSubTaskOpen}
        closeAddSubTasksDialog={closeAddSubTasksDialog}
        SubTasksToEdit={SubTasksToEdit}
        onSubmit={handleSubTaskSubmit}
      />      <CustomDeleteAlert
        onOpen={openDelete}
        onCancel={() => setOpenDelete(false)}
        onDelete={confirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete ${TaskToDelete?.title || "this task"}?`}
        buttonText="Delete"
      />

    </>
  );
};

export default TaskDialog;
