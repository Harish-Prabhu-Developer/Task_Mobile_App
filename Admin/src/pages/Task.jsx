import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { FaList, FaPlus, FaTh } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchtasks } from '../redux/slice/AssignTask/AssignTaskSlice';

const Task = () => {
    const [view, setView] = useState("board");
    const dispatch = useDispatch();

    useEffect(() => {
      const getTasks = async () => {
        await dispatch(fetchtasks());
      };
      getTasks();
    }, [dispatch]);
  
    const projectData = useSelector((state) => state.project.projects);
  


    // Handle missing token
    const token = localStorage.getItem("token");
    const Decodetoken = token ? jwtDecode(token) : {};
  return (
    <>
      <div className="p-1 mt-12 sm:mt-0 w-full space-y-6 bg-slate-100 min-h-screen scrollbar-hide">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
      
                {/* Add Button (Admin & Manager Only) */}
                {(Decodetoken?.userLevel === "Admin" || Decodetoken?.userLevel === "Manager") && (
                  <button
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md active:scale-95"
                  
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
              {/*Add Todo or Add In Progress or Add Complete  Task*/}
              <div className='flex flex-row items-center justify-between gap-2 md:gap-1'>
                <div className=' hover:cursor-pointer shadow-lg hover:border-blue-500 hover:text-blue-600  bg-white  hover:bg-slate-300 w-72 text-center text-xs md:text-base h-12 border-2  rounded-lg flex flex-row items-center justify-between p-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <div className='rounded-full bg-blue-700 w-2.5 h-2.5  md:w-3.5 md:h-3.5'/>
                      <p className='text-black font-medium'>To Do</p>
                    </div>
                    <FaPlus className= "sm:text-sm " />
                </div>
                <div className=' hover:cursor-pointer shadow-lg hover:border-blue-500 hover:text-blue-600  bg-white  hover:bg-slate-300 w-72 text-center text-xs md:text-base h-12 border-2  rounded-lg flex flex-row items-center justify-between p-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <div className='rounded-full bg-yellow-700 w-2.5 h-2.5  md:w-3.5 md:h-3.5'/>
                      <p className='text-black font-medium'>In Progress</p>
                    </div>
                    <FaPlus className= "sm:text-sm " />
                </div>
                <div className='hover:cursor-pointer shadow-lg hover:border-blue-500  hover:text-blue-600 bg-white  hover:bg-slate-300 w-72 text-center text-xs md:text-base h-12 border-2  rounded-lg flex flex-row items-center justify-between p-2'>
                    <div className='flex flex-row items-center gap-2'>
                      <div className='rounded-full bg-green-700 w-2.5 h-2.5  md:w-3.5 md:h-3.5'/>
                      <p className='text-black font-medium'>Completed</p>
                    </div>
                    <FaPlus className= "sm:text-sm " />
                </div>

              </div>
      
              {/* View Content */}
              {view === "board" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  Welcome to board View
                </div>
              ) : (
                // List View (Hidden on Mobile)
                <div className="hidden sm:block bg-white rounded-xl shadow-lg overflow-hidden">
                  <table className="w-full border-collapse">
                      <thead className="bg-yellow-200 text-gray-700 text-left">
                        <tr>
                          <th className='p-4 text-md text-left'>Task Title</th>
                          <th className="p-4 text-md text-left">Project Name</th>
                          <th className="p-4 text-md text-left">Team</th>
                          <th className="p-4 text-md text-left">Due Date</th>
                          <th className="p-4 text-md text-left">Status</th>
                          <th className="p-4 text-md text-left">Created By</th>
                        </tr>
                      </thead>
                      <tbody>
                          welcome to List View
                      </tbody>
                    </table>
      
                </div>
              )}
            </div>
    </>
  )
}

export default Task