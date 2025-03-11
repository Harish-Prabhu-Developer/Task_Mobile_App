import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import User from "./pages/User";
import Task from "./pages/Task";
import { Mobilenavbar, Sidebar } from "./components/navigation/SideandMobilenavbar";
import { TodosTasks } from "./components/Tasks/TodosTasks";
import { InProgressTasks } from "./components/Tasks/InProgressTasks";
import { CompletedTasks } from "./components/Tasks/CompletedTasks";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { logout, setProfile } from "./redux/slice/auth/authSlice";
import Header from "./components/navigation/Header";
import { jwtDecode } from "jwt-decode";
import CustomLoading from "./components/CustomComponent/CustomLoading";
import TaskDetails from "./pages/TaskDetails";

// ✅ Protected Route Component
const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const token = localStorage.getItem("token");
  return isLoggedIn && token ? <Outlet /> : <Navigate to="/login" replace />;
};

// ✅ Layout Component
const Layout = () => {
  return (
    <div className="flex max-h-screen">
      {/* Sidebar for Large Screens */}
      <div className="hidden sm:flex w-screen h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 transition-all duration-200 bg-slate-100 p-4 overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Mobile Navbar for Small Screens */}
      <div className="sm:hidden w-screen h-screen flex flex-col">
        <Mobilenavbar />
        <div className="flex-1 overflow-auto p-4 bg-slate-100 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
};



// ✅ Main App Component
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const loggedIn = localStorage.getItem("isLoggedIn");

      if (token && loggedIn) {
        setIsLoggedIn(true);
        try {
          const decoded = jwtDecode(token);
          console.log("Decoded Token:", decoded);

          // Extract first word of userLevel (e.g., "Senior" from "Senior Developer")
          setUserRole(decoded?.userLevel?.split(" ")[0] || "");
          setDecodedToken(decoded);
        } catch (error) {
          console.error("Invalid token:", error);
          dispatch(logout());
          navigate("/login", { replace: true });
          setIsLoggedIn(false);
        }
      }

      await dispatch(setProfile()); // Fetch user profile on mount
      setIsLoading(false); // Mark loading complete
    };

    fetchData();
  }, [dispatch]);

  console.log("User Role:", userRole);

  // Allowed roles
  const allowedRoles = ["Admin", "Manager", "User"];

  // Show loading screen while processing auth
  if (isLoading) {
    return <CustomLoading />;
  }

  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={isLoggedIn && decodedToken ? <Navigate to="/dashboard" replace /> : <Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          {/* Ensure Routes are Always Available */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/users" element={<User />} />
          <Route path="/tasks" element={<Task />}>
            <Route path="todos" element={<TodosTasks />} />
            <Route path="in-progress" element={<InProgressTasks />} />
            <Route path="completed" element={<CompletedTasks />} />
          </Route>
          <Route path="/task/:id" element={<TaskDetails />} />
        </Route>
      </Route>

      {/* Default Route */}
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />

      {/* Catch-All Redirect */}
      <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
};

export default App;
