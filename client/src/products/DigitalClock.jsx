import React, { useState, useEffect } from 'react';
import './product.css';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  // useEffect to update the time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000); // Update time every 1 second
    return () => clearInterval(timer);
  }, []);

  // Function to format time into HH:MM:SS
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0'); // Get hours and pad with 0 if needed
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Get seconds

    // Return formatted string
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="digital-clock-container">
      <div className="digital-clock-glass">{formatTime(time)}</div>
    </div>
  );
};

export default DigitalClock;
