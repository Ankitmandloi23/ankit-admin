import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import './App.css';
import ColdEmailStats from './pages/ColdEmailStats';
import EditWebContent from './pages/EditWebContent';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      case 'analytics':
        return <Analytics />;
      case 'coldEmail':
        return <ColdEmailStats />;
      case 'settings':
        return <Settings />;
      case 'EditWebContent':
        return <EditWebContent />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        <main className="page-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;