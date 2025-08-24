import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="profile">
      <h2>User Profile</h2>
      <nav>
        <ul>
          <li><Link to="details">Profile Details</Link></li>
          <li><Link to="settings">Profile Settings</Link></li>
        </ul>
      </nav>
      
      {/* Outlet renders the child route components */}
      <Outlet />
    </div>
  );
};

export default Profile;
