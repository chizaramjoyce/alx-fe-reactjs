import React from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

const Profile = () => {
  const location = useLocation();

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <nav style={{ marginBottom: '20px' }}>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0,
          display: 'flex',
          gap: '20px',
          borderBottom: '1px solid #ccc',
          paddingBottom: '10px'
        }}>
          <li>
            <Link 
              to="/profile/details"
              style={{ 
                textDecoration: location.pathname === '/profile/details' ? 'underline' : 'none',
                color: location.pathname === '/profile/details' ? '#007bff' : '#333'
              }}
            >
              Profile Details
            </Link>
          </li>
          <li>
            <Link 
              to="/profile/settings"
              style={{ 
                textDecoration: location.pathname === '/profile/settings' ? 'underline' : 'none',
                color: location.pathname === '/profile/settings' ? '#007bff' : '#333'
              }}
            >
              Profile Settings
            </Link>
          </li>
        </ul>
      </nav>
      
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route index element={<Navigate to="details" replace />} />
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
