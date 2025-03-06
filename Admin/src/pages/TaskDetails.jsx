import React, { useState } from "react";
import { FaTasks} from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import { RxActivityLog } from "react-icons/rx";

const TaskDetails = () => {
  const { id } = useParams(); // Get task ID from URL
  const location = useLocation();
  const task = location.state?.task; // Get task data from state
  const [view, setView] = useState("Task Detail");

  if (!task) {
    return <p>Task not found!</p>;
  }

  return (
    <div className="p-1 mt-12 sm:mt-0 w-full space-y-6 bg-slate-100 min-h-screen scrollbar-hide">

            
                    {/* Tabs (Task Detail / Activities/Timeline) */}
                    <div className="flex gap-4">
                      <button
                        className={`flex items-center gap-2 px-5 py-2 border-2 rounded-lg transition-all duration-200 shadow-sm
                          ${view === "Task Detail" ? "border-blue-600 text-blue-600 bg-blue-50" : "border-gray-300 text-gray-600 bg-white hover:bg-gray-100"}`}
                        onClick={() => setView("Task Detail")}
                      >
                        <FaTasks className="text-lg" />
                        <span className="text-sm font-medium">Task Detail</span>
                      </button>
            
                      {/* Hide List View on Mobile */}
                      <button
                        className={`flex items-center gap-2 px-5 py-2 border-2 rounded-lg transition-all duration-200 shadow-sm
                          ${view === "Activities/Timeline" ? "border-blue-600 text-blue-600 bg-blue-50" : "border-gray-300 text-gray-600 bg-white hover:bg-gray-100"}`}
                        onClick={() => setView("Activities/Timeline")}
                      >
                        <RxActivityLog className="text-lg" />
                        <span className="text-sm font-medium">Activities/Timeline</span>
                      </button>
                    </div>

                                {/* View Content */}
              {view === "Task Detail" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  Task Detail
                </div>
              ) : (
                // "Activities/Timeline" (Hidden on Mobile)
                <div className=" bg-white rounded-xl shadow-lg overflow-hidden">
                  Activities/Timeline
                </div>

              )}


    </div>
  );
};

export default TaskDetails;
