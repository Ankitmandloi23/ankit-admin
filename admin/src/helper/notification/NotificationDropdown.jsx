import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import "./NotificationDropdown.css";

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, text: "New user registered", time: "2m ago" },
    { id: 2, text: "Server downtime resolved", time: "1h ago" },
    { id: 3, text: "Password changed successfully", time: "3h ago" },
  ];

  return (
    <div className="notification-dropdown-container" ref={dropdownRef}>
      <button className="notification-btn" onClick={() => setOpen(!open)}>
        <Bell size={20} />
        {notifications.length > 0 && (
          <span className="notification-badge">{notifications.length}</span>
        )}
      </button>

      {open && (
        <div className="notification-dropdown">
          <div className="dropdown-header">Notifications</div>
          {notifications.length === 0 ? (
            <div className="empty">No new notifications</div>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="notification-item">
                <p className="text">{n.text}</p>
                <span className="time">{n.time}</span>
              </div>
            ))
          )}
          <div className="dropdown-footer">
            <button className="clear-btn">Clear All</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
