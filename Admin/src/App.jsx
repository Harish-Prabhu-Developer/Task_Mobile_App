import React from "react";

import Sidebar from "./components/navigation/Sidebar";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import User from "./pages/User";
import Task from "./pages/Task";
import { Mobilenavbar } from "./components/navigation/Mobilenavbar";
function Layout() {
  return (
    <div className="flex min-h-screen">
    <div className="hidden sm:flex bg-fixed h-screen ">
    <Sidebar />
    <div className="flex-grow p-4 transition-all">
      <Outlet />
    </div>
    </div>
    <div className="sm:hidden bg-fixed w-full">
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
        <Route element={<Layout />}>
          <Route
            index
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/users" element={<User />} />
          <Route path="/tasks" element={<Task />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
