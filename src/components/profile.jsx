import React, { useState, useEffect } from 'react';
import './profile.css';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Aditya Priyadarshi',
    bus: '7',
    route: 'VIT Bhopal to Sehore',
    email: 'aditya@example.com',
    phone: 'XXXXXXXXXX',
    trip: '8:00 AM - 9:00 AM',
    image: 'src/assets/aditya.jpeg', // default image
  });

  useEffect(() => {
    // Load saved profile details from localStorage when component mounts
    const savedProfile = {
      name: localStorage.getItem('user-name') || profileData.name,
      bus: localStorage.getItem('bus-preference') || profileData.bus,
      route: localStorage.getItem('user-route') || profileData.route,
      email: localStorage.getItem('user-email') || profileData.email,
      phone: localStorage.getItem('user-phone') || profileData.phone,
      trip: localStorage.getItem('last-trip') || profileData.trip,
      image: localStorage.getItem('profile-image') || profileData.image,
    };
    setProfileData(savedProfile);
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    localStorage.setItem('user-name', profileData.name);
    localStorage.setItem('bus-preference', profileData.bus);
    localStorage.setItem('user-route', profileData.route);
    localStorage.setItem('user-email', profileData.email);
    localStorage.setItem('user-phone', profileData.phone);
    localStorage.setItem('last-trip', profileData.trip);
    localStorage.setItem('profile-image', profileData.image);
    setIsEditing(false);
  };

  const handleImageUpload = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      setProfileData((prevData) => ({
        ...prevData,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <video autoPlay muted loop preload="auto" className="bg-video">
        <source src="src\assets\bg1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="profile-container">
        <img
          src={profileData.image}
          alt="Profile"
          className="profile-image"
          onClick={() => document.getElementById('image-input').click()}
        />
        <input
          type="file"
          id="image-input"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
        <h2>{profileData.name}</h2>
        <p>Bus Tracker User</p>

        <div id="profile-details" style={{ display: isEditing ? 'none' : 'block' }}>
          <p><strong>User ID:</strong> 256789</p>
          <p><strong>Bus No:</strong> {profileData.bus}</p>
          <p><strong>Current Route:</strong> {profileData.route}</p>
          <p><strong>Contact:</strong> {profileData.email}</p>
          <p><strong>Phone:</strong> {profileData.phone}</p>
          <p><strong>Last Trip:</strong> {profileData.trip}</p>
        </div>

        {isEditing && (
          <div id="edit-form">
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="bus"
              value={profileData.bus}
              onChange={handleChange}
            />
            <input
              type="text"
              name="route"
              value={profileData.route}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="trip"
              value={profileData.trip}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="edit-buttons">
          <button onClick={() => window.history.back()}>Back</button>
          <button onClick={handleEditToggle}>{isEditing ? 'Cancel' : 'Edit'}</button>
          {isEditing && <button onClick={handleSaveChanges}>Save</button>}
        </div>
      </div>

      <footer>
        <p>VIT Bus Tracking Corporation © 2024</p>
      </footer>
    </>
  );
}

export default Profile;
