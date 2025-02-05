import React from "react";
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
// ✅ Protected Route Component
const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("token");
  const token = localStorage.getItem("token");
  return isLoggedIn && token ? <Outlet /> : <Navigate to="/login" replace />;
};

// ✅ Layout Component
const Layout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar for Large Screens */}
      <div className="hidden sm:flex w-screen h-screen">
        <Sidebar />
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>

      {/* Mobile Navbar for Small Screens */}
      <div className="sm:hidden w-screen h-screen">
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
  return (
    <Routes>
      {/* Public Route - Login */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes - Wrapped inside `ProtectedRoute` */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/users" element={<User />} />
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
  );
};

export default App;
