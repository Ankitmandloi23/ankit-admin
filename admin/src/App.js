import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import ColdEmailStats from "./pages/ColdEmailStats";
import EditWebContent from "./pages/EditWebContent";
import Login from "./pages/Login";   // your login page
import ProtectedRoute from "./pages/ProtectedRoute"; 
import "./App.css";

function AdminLayout() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <Users />;
      case "analytics":
        return <Analytics />;
      case "coldEmail":
        return <ColdEmailStats />;
      case "settings":
        return <Settings darkMode={darkMode} setDarkMode={setDarkMode}/>;
      case "EditWebContent":
        return <EditWebContent />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div
        className={`main-content ${
          sidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        <main className="page-content">{renderPage()}</main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Layout */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </Router>
  );
}

export default App;
