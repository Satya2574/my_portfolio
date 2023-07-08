import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./MFPortfolio.css";

const MFPortfolio = (props) => {
  const Funds = props.funds;
  const [sortBy, setSortBy] = useState(null); // Track the current sorting criteria
  const [sortOrder, setSortOrder] = useState("asc"); // Track the current sorting order
  const [filter, setFilter] = useState("all");
  const [sortedFunds, setSortedFunds] = useState(Funds);

  const handleSortBy = (column) => {
    if (column === sortBy) {
      // Toggle sorting order if the same column is clicked again
      setSortOrder((prevSortOrder) =>
        prevSortOrder === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    let filteredFunds = Funds;

    if (filter === "profit") {
      filteredFunds = Funds.filter((fund) => fund.Change > 0);
    } else if (filter === "loss") {
      filteredFunds = Funds.filter((fund) => fund.Change < 0);
    }

    let sortedFunds = [...filteredFunds];

    if (sortBy) {
      sortedFunds.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (aValue < bValue) {
          return sortOrder === "asc" ? -1 : 1;
        } else if (aValue > bValue) {
          return sortOrder === "asc" ? 1 : -1;
        } else {
          return 0;
        }
      });
    }

    setSortedFunds(sortedFunds);
  }, [filter, sortBy, sortOrder, Funds]);

  const formatDecimal = (value) => {
    if (Number.isInteger(value)) {
      const formattedValue = parseFloat(value).toFixed(2);
      return formattedValue.toString().padEnd(4, "0");
    } else {
      const formattedValue = parseFloat(value.toFixed(2));
      return formattedValue.toString().padEnd(4, "0");
    }
  };

  return (
    <div>
      <div className='right-corner-buttons'>
        <label htmlFor='sort-select'>Sort By:</label>
        <select
          id='sort-select'
          value={sortBy || ""}
          onChange={(e) => handleSortBy(e.target.value)}
        >
          <option value=''>None</option>
          <option value='SchemeName'>Scheme Name</option>
          <option value='SchemeType'>Scheme Type</option>
          <option value='Qty'>Quantity</option>
          <option value='HoldPer'>Holding (%)</option>
          <option value='NAVValue'>NAV Value</option>
          <option value='Valuation'>Valuation</option>
          <option value='ChangePer'>Change (%)</option>
          <option value='Change'>Change</option>
        </select>
        <select id='filter-select' value={filter} onChange={handleFilter}>
          <option value='all'>All</option>
          <option value='profit'>Profit</option>
          <option value='loss'>Loss</option>
        </select>
      </div>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th
              className='sort-desc'
              onClick={() => handleSortBy("SchemeName")}
            >
              {sortBy === "SchemeName" && <SortArrow sortOrder={sortOrder} />}
              Scheme Name
            </th>
            <th
              className='sort-desc'
              onClick={() => handleSortBy("SchemeType")}
            >
              {sortBy === "SchemeType" && <SortArrow sortOrder={sortOrder} />}
              Scheme Type
            </th>
            <th
              className={"sort-asc text-right"}
              onClick={() => handleSortBy("Qty")}
            >
              {sortBy === "Qty" && <SortArrow sortOrder={sortOrder} />}
              Quantity
            </th>
            <th
              className={"sort-asc text-right"}
              onClick={() => handleSortBy("HoldPer")}
            >
              {sortBy === "HoldPer" && <SortArrow sortOrder={sortOrder} />}
              Holding (%)
            </th>
            <th
              className={"sort-asc text-right"}
              onClick={() => handleSortBy("NAVValue")}
            >
              {sortBy === "NAVValue" && <SortArrow sortOrder={sortOrder} />}
              NAV Value
            </th>
            <th
              className={"sort-asc text-right"}
              onClick={() => handleSortBy("Valuation")}
            >
              {sortBy === "Valuation" && <SortArrow sortOrder={sortOrder} />}
              Valuation
            </th>
            <th
              className={"sort-asc text-right"}
              onClick={() => handleSortBy("ChangePer")}
            >
              {sortBy === "ChangePer" && <SortArrow sortOrder={sortOrder} />}
              Change (%)
            </th>
            <th
              className={"sort-asc text-right"}
              onClick={() => handleSortBy("Change")}
            >
              {sortBy === "Change" && <SortArrow sortOrder={sortOrder} />}
              Change
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedFunds.map((Fund, index) => (
            <tr key={index}>
              <td>{Fund.SchemeName}</td>
              <td>{Fund.SchemeType}</td>
              <td className='text-right'>{Fund.Qty}</td>
              <td className='text-right'>{formatDecimal(Fund.HoldPer)}%</td>
              <td className='text-right'>{formatDecimal(Fund.NAVValue)}</td>
              <td className='text-right'>{formatDecimal(Fund.Valuation)}</td>
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
                {formatDecimal(Fund.ChangePer)}%
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
                {formatDecimal(Fund.Change)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SortArrow = ({ sortOrder }) => (
  <span className='sort-arrow'>
    {sortOrder === "asc" ? (
      <i className='bi bi-arrow-up'></i>
    ) : (
      <i className='bi bi-arrow-down'></i>
    )}
  </span>
);

export default MFPortfolio;
