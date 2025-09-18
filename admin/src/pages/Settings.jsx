import React, { useCallback, useState } from 'react';
import { Save, User, Bell, Shield, Palette, Lock } from 'lucide-react';
import { toast } from "react-toastify";


const Settings = ({ darkMode, setDarkMode }) => {
  const [settings, setSettings] = useState({
    siteName: 'Admin Panel',
    siteDescription: 'Modern admin dashboard',
    emailNotifications: true,
    pushNotifications: false,
    twoFactorAuth: true,
    theme: 'light'
  });



  const [AdminName, setAdminName] = useState('admin');
  const [email, setEmail] = useState('ankitmandloi23@gmail.com');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');

  const validateEmail = useCallback((value) => {
    if (value.trim() === '') return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required';
    else if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return '';
  }, []);

  const validatePassword = useCallback((value) => {
    if (value.trim() === '') return 'Password is required';
    if (!value) return 'Password is required';
    else if (value.length < 5) return 'Password must be at least 5 characters long';
    return '';
  }, []);



  const ChangePasswordAdmin = async () => {
    try {
      setLoading(true);
      const emailValidation = validateEmail(email);
      const passwordValidation = validatePassword(oldPassword);
      const newPasswordValidation = validatePassword(newPassword)

      setEmailError(emailValidation);
      setPasswordError(passwordValidation);
      setNewPasswordError(newPasswordValidation);

      if (emailValidation || passwordValidation || newPasswordValidation) return;

      const BASE_URL = process.env.REACT_APP_BASE_URL;
      const token = localStorage.getItem('admin-token');
      const response = await fetch(`${BASE_URL}auth/admin-change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, oldPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message || 'Something Went Wrong');
      toast.success(data.message || 'Password changed successfully');
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      toast.error(error.message || 'Password changed successfully');
      setOldPassword('');
      setNewPassword('');
    } finally {
      setLoading(false);
    }
  };

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
              value={darkMode ? "dark" : "light"}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "dark") {
                  setDarkMode(true);
                } else {
                  setDarkMode(false);
                }
                handleInputChange("theme", value); // still keeps it in your settings state
              }}
              className="form-select"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>

          </div>
        </div>








        <div className="settings-actions">
          <button className="btn btn-primary">
            <Save size={20} />
            Save Changes
          </button>
        </div>


        {/* Admin Password Change Section */}
        <div className="settings-section">
          <div className="section-header">
            <Lock size={20} />
            <h2>Admin Password Change</h2>
          </div>
          <div className="form-group">
            <label>Admin Name</label>
            <input
              type="text"
              value={AdminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <span className='box-error'>{emailError}</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Old Password</label>
            <span className='box-error'>{passwordError}</span>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <span className='box-error'>{newPasswordError}</span>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-input"
            />
          </div>


          <button
            className="btn btn-primary"
            onClick={ChangePasswordAdmin}
            disabled={loading}
          >
            {!loading ? "Change Password" : "Loading..."}
          </button>




        </div>
      </div>
    </div>
  );
};

export default Settings;