{
  /* <table className='table table-bordered'>
  <thead>
    <tr>
      <th>Security Name</th>
      <th>Sector</th>
      <th>Quantity</th>
      <th>Holding (%)</th>
      <th>Change (%)</th>
      <th>Valuation</th>
      <th>Last Traded Price</th>
      <th>Change</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{stock.SecName}</td>
      <td>{stock.Sector}</td>
      <td>{stock.AvailableQty}</td>
      <td>{stock.HoldPer}%</td>
      <td
        style={{
          color: stock.ChangePer < 0 ? "red" : "green",
        }}
      >
        {stock.ChangePer}%
      </td>
      <td>{stock.Valuation}</td>
      <td>{stock.LTP}</td>
      <td
        style={{
          color: stock.Change < 0 ? "red" : "green",
        }}
      >
        {stock.Change}
      </td>
    </tr>
  </tbody>
</table>



<div>
<div className='right-corner-buttons'>
  <label htmlFor='sort-select'>Sort By:</label>
  <select id='sort-select' value={sortBy || ""} onChange={handleSortBy}>
    <option value=''>None</option>
    <option value='Quantity'>Quantity</option>
    <option value='Valuation'>Valuation</option>
    <option value='Holding(%)'>Holding(%)</option>
    <option value='change'>Change</option>
    <option value='NAVValue'>NAVValue</option>
  </select>
  <select id='filter-select' value={filter} onChange={handleFilter}>
    <option value='all'>All</option>
    <option value='profit'>Profit</option>
    <option value='loss'>Loss</option>
  </select>
</div>
{sortedFunds.map((Fund, index) => (
  <React.Fragment key={index}>
    <div className='container'>
      <div className='card mt-3' key={index}>
        <div className='card-header'>
          <h5>{Fund.SchemeName}</h5>
          <h6>{Fund.SchemeType}</h6>
        </div>
        <div className='card-body'>
          <table className='table table-bordered'>
            <tbody>
              <tr>
                <td>
                  <strong>Quantity:</strong> {Fund.Qty}
                </td>
                <td>
                  <strong>Holding(%) :</strong> {Fund.HoldPer}%
                </td>
                <td
                  style={{
                    color: Fund.ChangePer < 0 ? "red" : "green",
                  }}
                >
                  <strong>Change (%) :</strong> {Fund.ChangePer}%
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Valuation:</strong> {Fund.Valuation}
                </td>
                <td>
                  <strong>NAV Value:</strong> {Fund.NAVValue}
                </td>
                <td
                  style={{
                    color: Fund.Change < 0 ? "red" : "green",
                  }}
                >
                  <strong>Change :</strong> {Fund.Change}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </React.Fragment>
))}
</div> */
}

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MFPortfolio.css";
const MFPortfolio = (props) => {
  const Funds = props.funds;
  const [sortBy, setSortBy] = useState(null); // Track the current sorting criteria
  const [filter, setFilter] = useState("all");
  let [filteredFunds, setFilteredFunds] = useState(Funds);
  const [sortedFunds, setSortedFunds] = useState(filteredFunds);
  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  useEffect(() => {
    // Filter the stocks whenever the filterProfit or stocks change
    if (filter === "profit") {
      filteredFunds = Funds.filter((fund) => fund.Change > 0);
    } else if (filter === "loss") {
      filteredFunds = Funds.filter((fund) => fund.Change < 0);
    } else filteredFunds = Funds;
    let sortedFunds = [...filteredFunds];
    if (sortBy === "Quantity") {
      sortedFunds.sort((a, b) => b.Qty - a.Qty);
    } else if (sortBy === "Valuation") {
      sortedFunds.sort((a, b) => b.Valuation - a.Valuation);
    } else if (sortBy === "Holding(%)") {
      sortedFunds.sort((a, b) => b.HoldPer - a.HoldPer);
    } else if (sortBy === "change") {
      sortedFunds.sort((a, b) => b.Change - a.Change);
    }

    setSortedFunds(sortedFunds);
    setFilteredFunds(filteredFunds);
  }, [filter, sortBy, Funds]);

  return (
    <div>
      <div className='right-corner-buttons'>
        <label htmlFor='sort-select'>Sort By:</label>
        <select id='sort-select' value={sortBy || ""} onChange={handleSortBy}>
          <option value=''>None</option>
          <option value='Quantity'>Quantity</option>
          <option value='Valuation'>Valuation</option>
          <option value='Holding(%)'>Holding(%)</option>
          <option value='change'>Change</option>
          <option value='NAVValue'>NAVValue</option>
        </select>
        <select id='filter-select' value={filter} onChange={handleFilter}>
          <option value='all'>All</option>
          <option value='profit'>Profit</option>
          <option value='loss'>Loss</option>
        </select>
      </div>
      <table className='table-container'>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Scheme Name</th>
              <th>Scheme Type</th>
              <th className='text-right'>Quantity</th>
              <th className='text-right'>Holding (%)</th>
              <th className='text-right'>NAV Value</th>
              <th className='text-right'>Valuation</th>
              <th className='text-right'>Change (%)</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {sortedFunds.map((Fund, index) => (
              <tr key={index}>
                <td>{Fund.SchemeName}</td>
                <td>{Fund.SchemeType}</td>
                <td className='text-right'>{Fund.Qty}</td>
                <td className='text-right'>{Fund.HoldPer}%</td>
                <td className='text-right'>{Fund.NAVValue}</td>
                <td className='text-right'>{Fund.Valuation}</td>
                <td
                  style={{
                    color: Fund.ChangePer < 0 ? "red" : "green",
                  }}
                  className={
                    Fund.ChangePer < 0
                      ? "text-right text-red"
                      : "text-right text-green"
                  }
                >
                  {Fund.ChangePer}%
                </td>
                <td
                  style={{
                    color: Fund.Change < 0 ? "red" : "green",
                  }}
                  className={
                    Fund.Change < 0
                      ? "text-right text-red"
                      : "text-right text-green"
                  }
                >
                  {Fund.Change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </table>
    </div>
  );
};

export default MFPortfolio;
