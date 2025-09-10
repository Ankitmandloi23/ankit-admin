import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import './UserDropdown.css';

const UserDropdown = () => {
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

    const handleLogout = () => {
        console.log("Logging out...");
        // Add actual logout logic here
    };


    return (
        <div className="user-dropdown-container" ref={dropdownRef}>
            <button className="avatar-btn" onClick={() => setOpen(!open)}>

                <div className="user-avatar">
                    <User size={20} />
                </div>
                <div className="user-info">
                    <span className="user-name">John Doe</span>
                    <span className="user-role">Administrator</span>
                </div>

            </button>

            {open && (
                <div className="dropdown-menu">
                    <div className="dropdown-header">
                        <p className="name">Admin User</p>
                        <p className="email">admin@nova.com</p>
                    </div>
                    <div className="dropdown-item">
                        <User size={16} style={{ marginRight: 8 }} /> Profile
                    </div>
                    <div className="dropdown-item">
                        <Settings size={16} style={{ marginRight: 8 }} /> Settings
                    </div>
                    <hr />
                    <div className="dropdown-item logout" onClick={handleLogout}>
                        <LogOut size={16} style={{ marginRight: 8 }} /> Log out
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
