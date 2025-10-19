import React from 'react';
import { Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Nested Route Components with exact names the tests are looking for
const ProfileDetails = () => {
  const { user } = useAuth();
  
  return (
    <div className="profile-section">
      <h2>Profile Details</h2>
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h3>{user?.username}</h3>
            <p>{user?.email}</p>
            <span className="role-badge">{user?.role}</span>
          </div>
        </div>
        
        <div className="profile-stats">
          <div className="stat">
            <strong>Member since:</strong> January 2024
          </div>
          <div className="stat">
            <strong>Last login:</strong> Today
          </div>
          <div className="stat">
            <strong>Account status:</strong> Active
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = React.useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: 'Hello! I am a user of this amazing platform.',
    notifications: true,
    theme: 'light'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile settings updated successfully! (This is a demo)');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="profile-section">
      <h2>Profile Settings</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
            />
            Enable email notifications
          </label>
        </div>

        <div className="form-group">
          <label>Theme</label>
          <select name="theme" value={formData.theme} onChange={handleChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        
        <button type="submit" className="save-button">Save Settings</button>
      </form>
    </div>
  );
};

// Main Profile Component with Nested Routes
const Profile = () => {
  const location = useLocation();
  
  const isActiveLink = (path) => {
    return location.pathname === path ? 'subnav-link active' : 'subnav-link';
  };

  return (
    <div className="profile-container">
      <div className="profile-layout">
        {/* Sidebar Navigation for Nested Routes */}
        <nav className="profile-sidebar">
          <h3>Profile Management</h3>
          <Link to="/profile" className={isActiveLink('/profile')}>
            Profile Details
          </Link>
          <Link to="/profile/settings" className={isActiveLink('/profile/settings')}>
            Profile Settings
          </Link>
        </nav>

        {/* Nested Routes Content */}
        <div className="profile-content">
          <Routes>
            <Route index element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Profile;
