import React, { useState } from 'react';
import { Save, User, Bell, Shield, Palette } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Admin Panel',
    siteDescription: 'Modern admin dashboard',
    emailNotifications: true,
    pushNotifications: false,
    twoFactorAuth: true,
    theme: 'light'
  });

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your application settings and preferences</p>
      </div>
      
      <div className="settings-container">
        <div className="settings-section">
          <div className="section-header">
            <User size={20} />
            <h2>General Settings</h2>
          </div>
          <div className="form-group">
            <label>Site Name</label>
            <input 
              type="text" 
              value={settings.siteName}
              onChange={(e) => handleInputChange('siteName', e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Site Description</label>
            <textarea 
              value={settings.siteDescription}
              onChange={(e) => handleInputChange('siteDescription', e.target.value)}
              className="form-textarea"
              rows="3"
            />
          </div>
        </div>
        
        <div className="settings-section">
          <div className="section-header">
            <Bell size={20} />
            <h2>Notifications</h2>
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={settings.emailNotifications}
                onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
              />
              <span>Email Notifications</span>
            </label>
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={settings.pushNotifications}
                onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
              />
              <span>Push Notifications</span>
            </label>
          </div>
        </div>
        
        <div className="settings-section">
          <div className="section-header">
            <Shield size={20} />
            <h2>Security</h2>
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={settings.twoFactorAuth}
                onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
              />
              <span>Two-Factor Authentication</span>
            </label>
          </div>
        </div>
        
        <div className="settings-section">
          <div className="section-header">
            <Palette size={20} />
            <h2>Appearance</h2>
          </div>
          <div className="form-group">
            <label>Theme</label>
            <select 
              value={settings.theme}
              onChange={(e) => handleInputChange('theme', e.target.value)}
              className="form-select"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>
        
        <div className="settings-actions">
          <button className="btn btn-primary">
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;