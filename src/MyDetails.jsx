import React from 'react';
import './MyDetails.css';

const MyDetails = () => {
  const name = "Satya Narayana Reddy";
  const id = "WDFTYHGK";

  return (
    <div className="myDetails">
      <div className="header">
        <div className="image-placeholder">
        <img src='https://i.ibb.co/kBctgqS/f7d98753-2129-4d3a-b909-7d9133a42a99.jpg'/>
        </div>
        <h1>My Portfolio</h1>
      </div>
      <div className="content">
        <h2 className="name">Name: {name}</h2>
        <h2 className="id">ID: {id}</h2>
      </div>
    </div>
  );
};

export default MyDetails;
