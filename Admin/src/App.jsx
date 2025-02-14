import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import User from "./pages/User";
import Task from "./pages/Task";
import { Mobilenavbar, Sidebar } from "./components/navigation/SideandMobilenavbar";
import { TodosTasks } from "./components/Tasks/TodosTasks";
import { InProgressTasks } from "./components/Tasks/InProgressTasks";
import { CompletedTasks } from "./components/Tasks/CompletedTasks";
import Login from "./pages/Login";
import { CONFIG,IMAGES } from "./Config";
import { useDispatch } from "react-redux";
import { setProfile } from "./redux/slice/auth/authSlice";
import Header from "./components/navigation/Header";
import { jwtDecode } from "jwt-decode";
// ✅ Protected Route Component
const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const token = localStorage.getItem("token");
  return isLoggedIn && token ? <Outlet /> : <Navigate to="/login" replace />;
};

// ✅ Layout Component
const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar for Large Screens */}
      <div className="hidden sm:flex w-screen h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />
          
          {/* Main Content */}
          <div className="flex-1 p-4 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Mobile Navbar for Small Screens */}
      <div className="sm:hidden w-screen h-screen flex flex-col">
        <div className="mb-12">
          <Mobilenavbar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};


// ✅ Main App Component
const App = () => {
  const dispatch = useDispatch();
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Remove invalid token
        localStorage.removeItem("isLoggedIn");
      }
    }

    dispatch(setProfile()); // Fetch user profile on mount
  }, [dispatch]);

  return (
    <>
      <Routes>
        {/* Public Route - Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes - Wrapped inside `ProtectedRoute` */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Project  />} />
            
              {/* Role-Based Access for /users Route */}
              {decodedToken?.userLevel === "Admin" ||
              decodedToken?.userLevel === "Manager" ||
              decodedToken?.userLevel === "User" ? (
                <Route path="/users" element={<User />} />
              ) : (
                <Route path="/users" element={<Navigate to="/dashboard" replace />} />
              )}

            <Route path="/tasks" element={<Task />}>
              <Route path="todos" element={<TodosTasks />} />
              <Route path="in-progress" element={<InProgressTasks />} />
              <Route path="completed" element={<CompletedTasks />} />
            </Route>
          </Route>
        </Route>

        {/* Default Route (Redirect to Dashboard if Authenticated, Else Login) */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Catch-All Not Found - Redirect to Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default App;
