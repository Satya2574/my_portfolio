import React, { useState, useEffect } from 'react';
import './DummyComponentForFutureUse.css'; // Import the CSS file for styling


  // Function to format the date and time
  const formatDateTime = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en', options);
    return formatter.format(date);
  };
 
const DummyComponentForFutureUse = ({ title, value, icon }) => {
  const [dateTime, setDateTime] = useState(formatDateTime(new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(formatDateTime(new Date()));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="custom-component">
      <div className="content">
        <div className="title">
          {title}
          <span className="icon">{icon}</span>
        </div>
        <div className="value">{value}</div>
        <div className="dateTime">{dateTime}</div>
      </div>
    </div>
  );
};

export default DummyComponentForFutureUse;
