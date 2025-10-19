import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Users from './components/Users';
import UserProfile from './components/UserProfile';
import Settings from './components/Settings';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Navigation Component
const Navigation = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">React Router Advanced</Link>
      </div>
      
      <div className="nav-links">
        <Link to="/" className={isActiveLink('/')}>Dashboard</Link>
        
        {isAuthenticated ? (
          <>
            {/* Protected routes navigation */}
            <Link to="/profile" className={isActiveLink('/profile')}>Profile</Link>
            <Link to="/blog" className={isActiveLink('/blog')}>Blog</Link>
            <Link to="/users" className={isActiveLink('/users')}>Users</Link>
            <Link to="/settings" className={isActiveLink('/settings')}>Settings</Link>
            <div className="user-menu">
              <span>Welcome, {user?.username}</span>
              <button onClick={logout} className="logout-btn">Logout</button>
            </div>
          </>
        ) : (
          <Link to="/login" className={isActiveLink('/login')}>Login</Link>
        )}
      </div>
    </nav>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes Implementation */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              {/* Profile with nested routes */}
              <Route path="/profile/*" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              {/* Blog with dynamic routing */}
              <Route path="/blog" element={
                <ProtectedRoute>
                  <Blog />
                </ProtectedRoute>
              } />
              
              <Route path="/blog/:postId" element={
                <ProtectedRoute>
                  <BlogPost />
                </ProtectedRoute>
              } />
              
              {/* Users with dynamic routing */}
              <Route path="/users" element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              } />
              
              <Route path="/users/:userId" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              
              {/* 404 Route */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>
          
          <footer className="app-footer">
            <p>Advanced React Router Demo - Features: Nested Routes, Dynamic Routing, Protected Routes</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
