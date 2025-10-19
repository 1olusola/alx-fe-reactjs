import React from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', joinDate: '2023-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', joinDate: '2023-02-20' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Moderator', joinDate: '2023-03-10' },
    { id: 4, name: 'Diana Davis', email: 'diana@example.com', role: 'User', joinDate: '2023-04-05' },
    { id: 5, name: 'Evan Wilson', email: 'evan@example.com', role: 'User', joinDate: '2023-05-12' }
  ];

  return (
    <div className="users-container">
      <div className="users-header">
        <h1>Users Directory</h1>
        <p>Browse and manage platform users</p>
      </div>

      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-avatar">
              {user.name.charAt(0)}
            </div>
            
            <div className="user-info">
              <h3>
                <Link to={`/users/${user.id}`} className="user-link">
                  {user.name}
                </Link>
              </h3>
              <p className="user-email">{user.email}</p>
              <span className={`user-role ${user.role.toLowerCase()}`}>
                {user.role}
              </span>
            </div>

            <div className="user-actions">
              <Link 
                to={`/users/${user.id}`} 
                className="view-profile-btn"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
