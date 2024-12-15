import React, { useState } from 'react';
import './cAccount.css';    


function CreateAccount() {
  // State for form inputs
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Footer visibility state
  const [footerVisible, setFooterVisible] = useState(false);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Password strength check
    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    try {
      const response = await fetch('https://localhost:3000/register', { // Assuming HTTPS for production
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phoneNumber, email, username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || 'Account created successfully! Redirecting to login page...');
        window.location.href = 'login.html'; // Redirect to login page
      } else {
        alert(result.error || 'Failed to create account.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again later.');
    }
  };

  // Footer visibility on hover near bottom
  const handleMouseMove = (event) => {
    const y = event.clientY;
    const windowHeight = window.innerHeight;

    if (y > windowHeight - 50) {
      setFooterVisible(true);

      setTimeout(() => {
        setFooterVisible(false);
      }, 5000);
    }
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <video autoPlay muted loop className="bg-video" playsInline>
        <source src="bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Create Account Container */}
      <div className="account-container">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="tel"
            id="phoneNumber"
            placeholder="Phone Number (10 digits)"
            pattern="[0-9]{10}"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <input
            type="email"
            id="email"
            placeholder="Gmail Account"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            id="newUsername"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            id="newPassword"
            placeholder="Password (min. 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input type="submit" value="Create Account" />
        </form>
      </div>

      {/* Footer Section */}
      {footerVisible && (
        <div className="footer" id="footer">
          <a href="#">About
            <span className="tooltip">Learn more about us and our services.</span>
          </a>
          <a href="#">Accessibility
            <span className="tooltip">We are committed to providing accessibility for all users.</span>
          </a>
          <a href="#">Help Center
            <span className="tooltip">Find answers to your questions in our Help Center.</span>
          </a>
          <a href="#">Privacy & Terms
            <span className="tooltip">Read our Privacy Policy and Terms of Service.</span>
          </a>
          <a href="#">Ad Choices
            <span className="tooltip">Manage your ad preferences.</span>
          </a>
          <a href="#">Advertising
            <span className="tooltip">Advertise with us to reach your target audience.</span>
          </a>
          <a href="#">Business Services
            <span className="tooltip">Explore our range of business services.</span>
          </a>
          <a href="#">Get the App
            <span className="tooltip">Download our app for seamless on-the-go access.</span>
          </a>
          <p>VIT Bus Tracking Corporation © 2024</p>
        </div>
      )}
    </div>
  );
}

export default CreateAccount;
