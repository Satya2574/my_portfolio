import React, { useEffect, useState } from "react";
import StocksPortfolio from "./StocksPortfolio";
import MFPortfolio from "./MFPortfolio";
import axios from "axios";
import "./StocksApp.css";

const StocksApp = () => {
  const [stocks, setStocks] = useState([]);
  const [funds, setFunds] = useState([]);
  const [displayStocks, setDisplayStocks] = useState(false);
  const [displayFunds, setDisplayFunds] = useState(false);

  useEffect(() => {
    fetchStockData();
  }, []);

  async function fetchStockData() {
    try {
      const body = "W114G349,83027,";
      const response = await axios.post("/api", body, {
        headers: {
          "content-type": "application/json",
        },
      });

      const data = response.data.Data;
      setStocks(data.StockDetails.Stocks);
      setFunds(data.MfStockDetails.Stocks);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  }

  const handleStocksButtonClick = () => {
    setDisplayStocks(true);
    setDisplayFunds(false);
  };

  const handleFundsButtonClick = () => {
    setDisplayStocks(false);
    setDisplayFunds(true);
  };
  return (
    <div>
      <div>
        <button
          className={displayStocks ? "active" : ""}
          onClick={handleStocksButtonClick}
        >
          Stocks
        </button>
        <button
          className={displayFunds ? "active" : ""}
          onClick={handleFundsButtonClick}
        >
          Funds
        </button>
      </div>
      <div>
        {displayStocks && <StocksPortfolio stocks={stocks} />}
        {displayFunds && <MFPortfolio funds={funds} />}
      </div>
    </div>
  );
};

export default StocksApp;
