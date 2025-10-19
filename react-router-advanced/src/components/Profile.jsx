import React from 'react';
import { Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Nested Route Components
const ProfileOverview = () => {
  const { user } = useAuth();
  
  return (
    <div className="profile-section">
      <h2>Profile Overview</h2>
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
        </div>
      </div>
    </div>
  );
};

const ProfileEdit = () => {
  const { user } = useAuth();
  const [formData, setFormData] = React.useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: 'Hello! I am a user of this amazing platform.'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully! (This is a demo)');
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="profile-section">
      <h2>Edit Profile</h2>
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
        
        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
};

const ProfileSecurity = () => {
  return (
    <div className="profile-section">
      <h2>Security Settings</h2>
      <div className="security-settings">
        <div className="security-item">
          <h3>Change Password</h3>
          <form className="security-form">
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input type="password" />
            </div>
            <button type="submit" className="update-button">Update Password</button>
          </form>
        </div>
        
        <div className="security-item">
          <h3>Two-Factor Authentication</h3>
          <p>Enhance your account security with 2FA</p>
          <button className="enable-2fa">Enable 2FA</button>
        </div>
      </div>
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
          <h3>Profile Settings</h3>
          <Link to="/profile" className={isActiveLink('/profile')}>
            Overview
          </Link>
          <Link to="/profile/edit" className={isActiveLink('/profile/edit')}>
            Edit Profile
          </Link>
          <Link to="/profile/security" className={isActiveLink('/profile/security')}>
            Security
          </Link>
        </nav>

        {/* Nested Routes Content */}
        <div className="profile-content">
          <Routes>
            <Route index element={<ProfileOverview />} />
            <Route path="edit" element={<ProfileEdit />} />
            <Route path="security" element={<ProfileSecurity />} />
          </Routes>
          
          {/* Outlet for nested routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
