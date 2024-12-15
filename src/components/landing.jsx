import { useState, useEffect } from 'react';  // Removed the leading backslash
import './landing.css'



function Landing() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Tooltip functionality
    const infoIcon = document.getElementById('info-icon');
    const infoTooltip = document.getElementById('info-tooltip');

    const handleMouseEnter = () => {
      infoTooltip.style.display = 'block';
    };

    const handleMouseLeave = () => {
      infoTooltip.style.display = 'none';
    };

    infoIcon.addEventListener('mouseenter', handleMouseEnter);
    infoIcon.addEventListener('mouseleave', handleMouseLeave);

    // Footer visibility on hover near bottom
    const footer = document.getElementById('footer');
    let footerTimeout;

    const handleMouseMove = (event) => {
      const y = event.clientY;
      const windowHeight = window.innerHeight;

      // If mouse is within 50px of the bottom
      if (y > windowHeight - 50) {
        clearTimeout(footerTimeout);
        footer.style.bottom = '0'; // Slide up the footer

        // Set a new timeout to hide the footer after 5 seconds
        footerTimeout = setTimeout(function() {
          footer.style.bottom = '-100px'; // Hide the footer after a few seconds
        }, 5000);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listeners on unmount
    return () => {
      infoIcon.removeEventListener('mouseenter', handleMouseEnter);
      infoIcon.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSelectBus = () => {
    const busSelect = document.getElementById('bus-select');
    const selectedBus = busSelect.value;
    window.location.href = `map.html?bus=${selectedBus}`;
  };

  return (
    <>
      {/* <CreateAccount /> */}
      <video autoPlay muted loop className="bg-video">
        <source src="src\assets\bg4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Profile Icon */}
      <div className="profile-icon">
        <a href="profile.html">
          <i className="fa fa-user-circle" aria-hidden="true"></i>
        </a>
      </div>

      {/* Bus Container */}
      <div className="bus-container">
        {/* Small Bus Video Icon
        <video autoPlay muted loop preload="auto" className="bus-icon-video">
          <source src="bg2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}

        <h1>Select a Bus</h1>

        <div className="bus-dropdown">
          <label htmlFor="bus-select">Choose a bus:</label>
          <select id="bus-select">
            <option value="1">Bus 1</option>
            <option value="2">Bus 2</option>
            <option value="3">Bus 3</option>
            <option value="4">Bus 4</option>
            <option value="5">Bus 5</option>
            <option value="6">Bus 6</option>
            <option value="7">Bus 7</option>
            <option value="8">Bus 8</option>
            <option value="9">Bus 9</option>
            <option value="10">Bus 10</option>
            <option value="11">Bus 11</option>
            <option value="12">Bus 12</option>
            <option value="13">Bus 13</option>
            <option value="14">Bus 14</option>
          </select>
        </div>
        <button id="selectButton" onClick={handleSelectBus}>Go</button>
      </div>

      {/* Info Icon and Tooltip */}
      <div className="info-icon" id="info-icon">
        <a href="info.html">
          <i className="fa fa-info-circle" aria-hidden="true"></i>
        </a>
      </div>
      <div className="tooltip" id="info-tooltip">
        Aditya Priyadarshi
        Yashvardhan Singh Sarangdevot
        Chinmay Bhardwaj
        Pratyush Kumar
        Shriya Dhawan
      </div>

      {/* User Info Section */}
      <div className="user-info">
        <strong>User Info:</strong>
        <p>Aditya Priyadarshi</p>
        <p>Bus No: 1</p>
        <p>Destination: VIT Campus</p>
      </div>

      {/* Feedback Icon */}
      {/* <div className="feedback-icon">
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfgAPO2qyq1kQP85BvRLLAfpP7yHaH5-euKpwTWOr1iD_2jEg/viewform?vc=0&c=0&w=1&flr=0" target="_blank">
          <i className="fa fa-comment-dots" aria-hidden="true"></i> Feedback
        </a>
      </div> */}

    {/* Footer Section */}
{/* Footer Section */}
<div className="footer" id="footer">
    <a href="http://localhost:3000/login">Login
      <span className="tooltip">Log in to our services.</span>
    </a>
    <a href="http://localhost:3000/">Create Account
      <span className="tooltip">Seamlessly create an account to prevail in our services</span>
    </a>
    <a href="/info">Info
      <span className="tooltip">Get info about the developers of the service</span>
    </a>
    <a href="/profile">Profile
      <span className="tooltip">Get data on your profile</span>
    </a>
    <a href="https://docs.google.com/forms/d/e/1FAIpQLSfgAPO2qyq1kQP85BvRLLAfpP7yHaH5-euKpwTWOr1iD_2jEg/viewform?vc=0&c=0&w=1&flr=0" target="_blank">
      <i className="fa fa-comment-dots" aria-hidden="true"></i> Feedback
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


    </>
  );
}

export default Landing;
