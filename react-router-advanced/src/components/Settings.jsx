import React from 'react';

const Settings = () => {
  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="settings-content">
        <p>This is a protected settings page. Only authenticated users can access it.</p>
      </div>
    </div>
  );
};

export default Settings;
