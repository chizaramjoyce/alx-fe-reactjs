import React from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams();

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p>Viewing profile for user ID: {userId}</p>
      {/* This would typically fetch and display user data based on the userId */}
    </div>
  );
};

export default UserProfile;
