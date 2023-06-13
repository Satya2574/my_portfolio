import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CompanyDetails from './companyDetails'; 
import NiftyComponent from './NiftyComponent';
import MyDetails from './MyDetails';
import StocksApp from './StocksApp';

function App() {
  const text = 'Nifty';
  const profit = false; // Assuming it's a profit,defailty
  const price = '100';
  const change = '5';
  const percentage = '5%';
  const dateTime = 'May 27, 2023 10:30 AM';

  return (
    <div className="container">
      <div className="border p-3">
        <div className="row">

        <div className="col-md-6">
        <div className="company-details">
        <CompanyDetails />
        </div>
      </div>
      <div className="col-md-6">
        <div className="nifty-component1">
        <NiftyComponent
        text={text}
        profit={profit}
        price={price}
        change={change}
        percentage={percentage}
        dateTime={dateTime}
      />
        </div>
      </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <MyDetails />
          </div>
        </div>
        <div>
          <StocksApp />
        </div>
      </div>
    </div>
  );
}

export default App;
