//NavMenus.jsx
import { FaTasks, FaUserPlus } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { IoFolderOpenSharp } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { RiDashboard3Line, RiTodoFill } from "react-icons/ri";

const MENU_ITEMS = [
    { id: "dashboard", name: "Dashboard", icon: <RiDashboard3Line /> },
    { id: "projects", name: "Projects", icon: <IoFolderOpenSharp /> },
    { id: "users", name: "Users", icon: <FaUserPlus /> },
    {
      id: "tasks",
      name: "Tasks",
      icon: <FaTasks />,
      subMenu: [
        {
          id: "todos-tasks",
          name: "Todos Tasks",
          path: "/tasks/todos",
          icon: <RiTodoFill />,
        },
        {
          id: "in-progress-tasks",
          name: "In Progress Tasks",
          path: "/tasks/in-progress",
          icon: <GrInProgress />,
        },
        {
          id: "completed-tasks",
          name: "Completed Tasks",
          path: "/tasks/completed",
          icon: <MdDone />,
        },
      ],
    },
  ];
  
  
  const ADMIN_MENU_ITEMS = [
    { id: "dashboard", name: "Dashboard", icon: <RiDashboard3Line /> },
    { id: "projects", name: "Projects", icon: <IoFolderOpenSharp /> },
    { id: "users", name: "Users", icon: <FaUserPlus /> },
    {
      id: "tasks",
      name: "Tasks",
      icon: <FaTasks />,
      subMenu: [
        {
          id: "todos-tasks",
          name: "Todos Tasks",
          path: "/tasks/todos",
          icon: <RiTodoFill />,
        },
        {
          id: "in-progress-tasks",
          name: "In Progress Tasks",
          path: "/tasks/in-progress",
          icon: <GrInProgress />,
        },
        {
          id: "completed-tasks",
          name: "Completed Tasks",
          path: "/tasks/completed",
          icon: <MdDone />,
        },
      ],
    },
  ];
  const MANAGER_MENU_ITEMS = [
    { id: "dashboard", name: "Dashboard", icon: <RiDashboard3Line /> },
    { id: "projects", name: "Projects", icon: <IoFolderOpenSharp /> },
    { id: "users", name: "Users", icon: <FaUserPlus /> },
    {
      id: "tasks",
      name: "Tasks",
      icon: <FaTasks />,
      subMenu: [
        {
          id: "todos-tasks",
          name: "Todos Tasks",
          path: "/tasks/todos",
          icon: <RiTodoFill />,
        },
        {
          id: "in-progress-tasks",
          name: "In Progress Tasks",
          path: "/tasks/in-progress",
          icon: <GrInProgress />,
        },
        {
          id: "completed-tasks",
          name: "Completed Tasks",
          path: "/tasks/completed",
          icon: <MdDone />,
        },
      ],
    },
  ];
  
  const USER_MENU_ITEMS = [
    { id: "dashboard", name: "Dashboard", icon: <RiDashboard3Line /> },
    { id: "projects", name: "Projects", icon: <IoFolderOpenSharp /> },
    { id: "users", name: "Users", icon: <FaUserPlus /> },
    {
      id: "tasks",
      name: "Tasks",
      icon: <FaTasks />,
      subMenu: [
        {
          id: "todos-tasks",
          name: "Todos Tasks",
          path: "/tasks/todos",
          icon: <RiTodoFill />,
        },
        {
          id: "in-progress-tasks",
          name: "In Progress Tasks",
          path: "/tasks/in-progress",
          icon: <GrInProgress />,
        },
        {
          id: "completed-tasks",
          name: "Completed Tasks",
          path: "/tasks/completed",
          icon: <MdDone />,
        },
      ],
    },
  ];
  const JUNIOR_AND_SENIOR_MENU_ITEMS = [
    { id: "dashboard", name: "Dashboard", icon: <RiDashboard3Line /> },
    {
      id: "tasks",
      name: "Tasks",
      icon: <FaTasks />,
      subMenu: [
        {
          id: "todos-tasks",
          name: "Todos Tasks",
          path: "/tasks/todos",
          icon: <RiTodoFill />,
        },
        {
          id: "in-progress-tasks",
          name: "In Progress Tasks",
          path: "/tasks/in-progress",
          icon: <GrInProgress />,
        },
        {
          id: "completed-tasks",
          name: "Completed Tasks",
          path: "/tasks/completed",
          icon: <MdDone />,
        },
      ],
    },
  ];

  export { MENU_ITEMS, ADMIN_MENU_ITEMS, MANAGER_MENU_ITEMS, USER_MENU_ITEMS, JUNIOR_AND_SENIOR_MENU_ITEMS };