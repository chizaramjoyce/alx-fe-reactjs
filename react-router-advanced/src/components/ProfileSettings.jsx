import React from 'react';

const ProfileSettings = () => {
  return (
    <div className="profile-settings">
      <h3>Profile Settings</h3>
      <form>
        <div>
          <label>Theme:</label>
          <select>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div>
          <label>Notifications:</label>
          <input type="checkbox" defaultChecked /> Enable notifications
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
