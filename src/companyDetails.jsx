import React from "react";
import "./companyDetails.css";

function CompanyDetails() {
  return (
    <div className='my-component'>
      <div className='logo-container'>
        <img
          src='https://csrbox.org/company/cmp_logo/1540960727Shriram-Transport-Finance-Stock-jxchs@goldsilverreports-gsr.jpg'
          alt='Company Logo'
          className='logo'
        />
      </div>
      <div className='text-container'>
        <p>Har Haath me dhan ki rekha</p>
      </div>
    </div>
  );
}

export default CompanyDetails;
