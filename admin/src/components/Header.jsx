import React from 'react';
import { Search, Bell, User, Sun, Moon } from 'lucide-react';
import UserDropdown from '../helper/UserDropdown';

const Header = ({ darkMode, setDarkMode, sidebarCollapsed, setSidebarCollapsed }) => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-right">
        <button 
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>


        <UserDropdown />

        
        
      </div>
    </header>
  );
};

export default Header;