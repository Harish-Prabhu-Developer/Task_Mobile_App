import { FaBug, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp, MdOutlineDoneAll, MdOutlineMessage } from "react-icons/md";

export const formatDate = (date) => {
  if (!date) return ""; // Handle empty values gracefully
  
  const parsedDate = new Date(date); // Convert string to Date object

  if (isNaN(parsedDate.getTime())) {
    console.error("Invalid date:", date); // Debugging output
    return ""; // Return an empty string for invalid dates
  }

  // Format the date
  const month = parsedDate.toLocaleString("en-US", { month: "short" });
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();

  return `${day}-${month}-${year}`;
};

  
  export function dateFormatter(dateString) {
    const inputDate = new Date(dateString);
  
    if (isNaN(inputDate)) {
      return "Invalid Date";
    }
  
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getDate()).padStart(2, "0");
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  
  export function getInitials(fullName) {
    const names = fullName.split(" ");
  
    const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
  
    const initialsStr = initials.join("");
  
    return initialsStr;
  }
  
  export const PRIOTITYSTYELS = {
    high: "text-red-600",
    medium: "text-yellow-600",
    low: "text-blue-600",
    normal:"text-gray-600"
  };
  export const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  export const TASK_TYPE = {
    todo: "bg-blue-600",
    "in progress": "bg-yellow-600",
    completed: "bg-green-600",
  };
 
  export const PROJECT_TYPE = {
    "Not Started": "bg-blue-600",
    "In Progress": "bg-yellow-600",
    "Completed": "bg-green-600",
  }
  export const BGS = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-gray-500",
    "bg-orange-500",

  ];

  export const GETROLE =(user)=>{
    if (user.subRole === null) {
      return user.role
      
    }
    if (user.subRole === null && user.role === null) {
      return "Not Assigned"
    }
    return user.role + " " + user.subRole;
  }
export const TASKTYPEICON = {
  Commented: (
      <div className='w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white'>
        <MdOutlineMessage size={22} />
      </div>
    ),
    Started: (
      <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white'>
        <FaThumbsUp size={20} />
      </div>
    ),
    Assigned: (
      <div className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 text-white'>
        <FaUser size={18} />
      </div>
    ),
    Bug: (
      <div className='text-red-600'>
        <FaBug size={24} />
      </div>
    ),
    Completed: (
      <div className='w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white'>
        <MdOutlineDoneAll size={24} />
      </div>
    ),
    "In Progress": (
      <div className='w-10 h-10 flex items-center justify-center rounded-full bg-violet-600 text-white'>
        <GrInProgress size={18} />
      </div>
    ),
  };
  
  export const act_types = [
    "Started",
    "Completed",
    "In Progress",
    "Commented",
    "Bug",
    "Assigned",
  ];
  
export const Enum=[
  "Completed",
    "In Progress",
    "Not Started",
    "Total",
  "completed",
  "in progress",
  "todo",
  "total",
]
