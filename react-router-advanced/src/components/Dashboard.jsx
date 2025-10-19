import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    { title: 'View Profile', path: '/profile', icon: '👤', description: 'Manage your account settings' },
    { title: 'Browse Blog', path: '/blog', icon: '📝', description: 'Read latest articles' },
    { title: 'User Directory', path: '/users', icon: '👥', description: 'Explore platform users' },
    { title: 'Settings', path: '/settings', icon: '⚙️', description: 'Configure preferences' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.username}! 👋</h1>
        <p>Here's what's happening with your account today.</p>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.path} className="action-card">
              <div className="action-icon">{action.icon}</div>
              <h3>{action.title}</h3>
              <p>{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="routing-demo">
        <h2>Routing Features Demonstrated</h2>
        <div className="features-list">
          <div className="feature-item">
            <strong>Nested Routes:</strong> Profile section with sub-pages
          </div>
          <div className="feature-item">
            <strong>Dynamic Routes:</strong> Blog posts and user profiles with URL parameters
          </div>
          <div className="feature-item">
            <strong>Protected Routes:</strong> Authentication-required pages
          </div>
          <div className="feature-item">
            <strong>Programmatic Navigation:</strong> Back buttons and navigation controls
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
