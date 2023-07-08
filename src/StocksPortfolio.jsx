import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StocksPortfolio.css";
const StocksPortfolio = (props) => {
  const stocks = props.stocks;
  const [sortBy, setSortBy] = useState(null); // Track the current sorting criteria
  const [filter, setFilter] = useState("all"); // Track whether to filter by profit
  const [filteredStocks, setFilteredStocks] = useState(stocks);
  const [sortedStocks, setSortedStocks] = useState(filteredStocks);
  const handleSortBy = (event) => {
    const selectedCriteria = event.target.value;
    setSortBy(selectedCriteria);
  };
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  useEffect(() => {
    let filteredStocks = stocks;

    if (filter === "profit") {
      filteredStocks = stocks.filter((stock) => stock.Change > 0);
    } else if (filter === "loss") {
      filteredStocks = stocks.filter((stock) => stock.Change < 0);
    }
    let sortedStocks = [...filteredStocks];
    if (sortBy === "Quantity") {
      sortedStocks.sort((a, b) => b.AvailableQty - a.AvailableQty);
    } else if (sortBy === "Valuation") {
      sortedStocks.sort((a, b) => b.Valuation - a.Valuation);
    } else if (sortBy === "Holding(%)") {
      sortedStocks.sort((a, b) => b.HoldPer - a.HoldPer);
    } else if (sortBy === "change") {
      sortedStocks.sort((a, b) => b.Change - a.Change);
    }

    setFilteredStocks(filteredStocks);
    setSortedStocks(sortedStocks);
  }, [filter, stocks, sortBy]);

  return (
    <div>
      <div className='right-corner-buttons'>
        <label htmlFor='sort-select'>Sort By:</label>
        <select
          id='sort-select'
          className='sort-select'
          value={sortBy || ""}
          onChange={handleSortBy}
        >
          <option value=''>None</option>
          <option value='Quantity'>Quantity</option>
          <option value='Valuation'>Valuation</option>
          <option value='Holding(%)'>Holding(%)</option>
          <option value='change'>Change</option>
        </select>
        <select
          id='filter-select'
          className='filter-select'
          value={filter}
          onChange={handleFilter}
        >
          <option value='all'>All</option>
          <option value='profit'>Profit</option>
          <option value='loss'>Loss</option>
        </select>
      </div>

      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Security Name</th>
            <th>Sector</th>
            <th className='text-right'>Quantity</th>
            <th className='text-right'>Holding (%)</th>
            <th className='text-right'>Last Traded Price</th>
            <th className='text-right'>Valuation</th>
            <th className='text-right'>Change (%)</th>
            <th className='text-right'>Change</th>
          </tr>
        </thead>
        <tbody>
          {sortedStocks.map((stock, index) => (
            <tr key={index}>
              <td>{stock.SecName}</td>
              <td>{stock.Sector}</td>
              <td className='text-right'>{stock.AvailableQty}</td>
              <td className='text-right'>{stock.HoldPer}%</td>
              <td className='text-right'>{stock.LTP}</td>
              <td className='text-right'>{stock.Valuation}</td>
              <td
                style={{
                  color: stock.ChangePer < 0 ? "red" : "green",
                }}
                className='text-right'
              >
                {stock.ChangePer}%
              </td>
              <td
                style={{
                  color: stock.Change < 0 ? "red" : "green",
                }}
                className='text-right'
              >
                {stock.Change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default StocksPortfolio;
