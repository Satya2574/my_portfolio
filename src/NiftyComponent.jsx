import React, { useState, useEffect } from 'react';
import './NiftyComponent.css'; 


  // Function to format the date and time
  const formatDateTime = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en', options);
    return formatter.format(date);
  };
 

const NiftyComponent = ({ text, profit, price, change, percentage }) => {
  const textColor = profit ? 'green' : 'red';
  const arrowIcon = profit ? '▲' : '▼';

  const [dateTime, setDateTime] = useState(formatDateTime(new Date()));
  const formattedPrice = parseFloat(price).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR'
  });
  

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(formatDateTime(new Date()));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="nifty-component">
      <div className="content">
        <div className="text">
          <span className="text-content" style={{fontSize: 36 +'px', color: 'white'}}>{text}</span>
          <span className={`icon ${textColor}`}>{arrowIcon}</span>
        </div>
        <div className="details">
          <span className={`price ${textColor} larger-font`}>{formattedPrice}</span>
          <span className={`change ${textColor} larger-font`}>{change}</span>
          <span className={`percentage ${textColor} larger-font`}>{percentage}</span>
        </div>
        <div className="dateTime unique-style">{dateTime}</div>
      </div>
    </div>
  );
  
};

export default NiftyComponent;

/**
 * Use this below code once you have an API for getting the data 
 */


// import React, { useState, useEffect } from 'react';
// import './NiftyComponent.css'; // Import the CSS file for styling

// const formatDateTime = (date) => {
//     const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
//     const formatter = new Intl.DateTimeFormat('en', options);
//     return formatter.format(date);
//   };

// const NiftyComponent = ({ text, profit, price, change, percentage }) => {
//   const textColor = profit ? 'green' : 'red';
//   const arrowIcon = profit ? '▲' : '▼';
//   const [dateTime, setDateTime] = useState(formatDateTime(new Date()));
//   const [niftyData, setNiftyData] = useState(null);

//   useEffect(() => {
//     const fetchNiftyData = async () => {
//       const apiKey = ''; // Replace with your API key

//       try {
//         const response = await fetch(`your url here`);
//         const data = await response.json();
//         setNiftyData(data['Global Quote']);
//       } catch (error) {
//         console.log('Error fetching Nifty data:', error);
//       }
//     };

//     fetchNiftyData();

//     const timer = setInterval(() => {
//       setDateTime(formatDateTime(new Date()));
//     }, 1000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);



// //   if (!niftyData) {
// //     return <div>Loading...</div>;
// //   }

//   const niftyPrice = parseFloat(niftyData['05. price']).toLocaleString('en-IN', {
//     style: 'currency',
//     currency: 'INR'
//   });
//   const niftyChange = niftyData['09. change'];
//   const niftyPercentage = niftyData['10. change percent'];

//   return (
//     <div className="component">
//       <div className="content">
//         <div className="text">
//           {text}
//           <span className={`icon ${textColor}`}>{arrowIcon}</span>
//         </div>
//         <div className="details">
//           <span className={`price ${textColor}`}>{niftyPrice}</span>
//           <span className={`change ${textColor}`}>{niftyChange}</span>
//           <span className={`percentage ${textColor}`}>{niftyPercentage}</span>
//         </div>
//         <div className="dateTime">{dateTime}</div>
//       </div>
//     </div>
//   );
// };

// export default NiftyComponent;

