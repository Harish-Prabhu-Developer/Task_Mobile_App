import React from "react";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import User from "./pages/User";
import Task from "./pages/Task";
import { Mobilenavbar, Sidebar } from "./components/navigation/SideandMobilenavbar";
import { TodosTasks } from "./components/Tasks/TodosTasks";
import { InProgressTasks } from "./components/Tasks/InProgressTasks";
import { CompletedTasks } from "./components/Tasks/CompletedTasks";
import Login from "./pages/Login";
function Layout() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden sm:flex bg-fixed w-screen h-screen ">
        <Sidebar/>
          <Outlet />
      </div>
      <div className="sm:hidden bg-fixed w-screen h-screen">
        <Mobilenavbar />
        <Outlet />
      </div>

    </div>
  );
}

export default function App() {
  return (
        <>
        <Routes>
        <Route path="/login" element={<Login />} />

          <Route element={<Layout />}>
            <Route
              index
              path="/"
              element={<Navigate to="/Login" replace />}
            />            
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/users" element={<User />} />
            <Route path="/tasks" element={<Task />}>
              <Route path="todos" element={<TodosTasks />} />
              <Route path="in-progress" element={<InProgressTasks />} />
              <Route path="completed" element={<CompletedTasks />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
}
