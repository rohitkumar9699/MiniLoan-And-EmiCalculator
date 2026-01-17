import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import './Auth.css';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ occupation: '', monthlyIncome: '' });
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setProfile(response.data);
      setFormData({ occupation: response.data.occupation, monthlyIncome: response.data.monthlyIncome });
    } catch (err) {
      setMessage('Error loading profile');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await userAPI.updateProfile(formData);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error updating profile');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await userAPI.changePassword(passwordData);
      setMessage('Password changed successfully!');
      setPasswordData({ oldPassword: '', newPassword: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error changing password');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
      
      {profile && (
        <>
          <div className="profile-info">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Aadhaar:</strong> {profile.aadhaarNumber}</p>
            <p><strong>PAN:</strong> {profile.panNumber}</p>
          </div>

          <form onSubmit={handleProfileUpdate} className="auth-form">
            <h3>Update Profile</h3>
            <input
              type="text"
              placeholder="Occupation"
              value={formData.occupation}
              onChange={(e) => setFormData({...formData, occupation: e.target.value})}
            />
            <input
              type="number"
              placeholder="Monthly Income"
              value={formData.monthlyIncome}
              onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
            />
            <button type="submit">Update Profile</button>
          </form>

          <form onSubmit={handlePasswordChange} className="auth-form">
            <h3>Change Password</h3>
            <input
              type="password"
              placeholder="Old Password"
              value={passwordData.oldPassword}
              onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
              required
            />
            <button type="submit">Change Password</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Profile;
