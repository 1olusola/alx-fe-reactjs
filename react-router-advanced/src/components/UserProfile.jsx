import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const users = {
    1: {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'Admin',
      joinDate: '2023-01-15',
      bio: 'Senior developer and team lead with 8 years of experience in web development.',
      location: 'New York, USA',
      website: 'https://alicejohnson.dev',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS']
    },
    2: {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'User',
      joinDate: '2023-02-20',
      bio: 'Frontend developer passionate about creating beautiful user interfaces.',
      location: 'London, UK',
      website: null,
      skills: ['JavaScript', 'CSS', 'Vue.js', 'UI/UX']
    }
  };

  const user = users[userId];

  if (!user) {
    return (
      <div className="user-profile-container">
        <div className="user-not-found">
          <h1>User Not Found</h1>
          <p>The user you're looking for doesn't exist.</p>
          <Link to="/users" className="back-link">← Back to Users</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <nav className="user-profile-nav">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <Link to="/users" className="users-link">All Users</Link>
      </nav>

      <div className="user-profile">
        <div className="profile-header">
          <div className="profile-avatar large">
            {user.name.charAt(0)}
          </div>
          
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            <span className={`profile-role ${user.role.toLowerCase()}`}>
              {user.role}
            </span>
            
            <div className="profile-meta">
              <span>Joined: {user.joinDate}</span>
              {user.location && <span>• Location: {user.location}</span>}
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h3>About</h3>
            <p>{user.bio}</p>
          </div>

          {user.website && (
            <div className="profile-section">
              <h3>Website</h3>
              <a href={user.website} target="_blank" rel="noopener noreferrer">
                {user.website}
              </a>
            </div>
          )}

          {user.skills && user.skills.length > 0 && (
            <div className="profile-section">
              <h3>Skills</h3>
              <div className="skills-list">
                {user.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="profile-actions">
          <button onClick={() => navigate(-1)} className="action-button">
            Back to List
          </button>
          <Link to="/users" className="action-button secondary">
            All Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
