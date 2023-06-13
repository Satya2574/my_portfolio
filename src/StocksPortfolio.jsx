import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StocksPortfolio.css';

class StocksPortfolio extends Component {
static getDerivedStateFromProps(props, state) {
    if (props.portfolio !== state.portfolio) {
      return { portfolio: props.portfolio };
    }
    // Return null if the state hasn't changed
    return null;
  }

  state = {
    portfolio: this.props.portfolio, // using props to initialize portfolio
    filter: 'all',
    sortBy: null,
    sortDirection: 'asc',
  };
  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  }

  handleSortChange = (sortBy) => {
    this.setState((state) => ({
      sortBy,
      sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc'
    }));
  }

  getFilteredAndSortedPortfolio() {
    const { portfolio } = this.props; // Changed this from this.state
    const { filter, sortBy, sortDirection } = this.state;

    let filteredPortfolio = portfolio;

    // Apply profit/loss filter
    if (filter === 'profit') {
      filteredPortfolio = portfolio.filter(stock => stock.increasePercentage > 0);
    } else if (filter === 'loss') {
      filteredPortfolio = portfolio.filter(stock => stock.increasePercentage < 0);
    }

    // Apply sorting
    if (sortBy) {
      filteredPortfolio.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (a[sortBy] > b[sortBy]) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredPortfolio;
  }
  render() {
    const portfolio = this.getFilteredAndSortedPortfolio();

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-4">
            <label>Filter by profit/loss</label>
            <select className="form-control" onChange={this.handleFilterChange}>
              <option value="all">All</option>
              <option value="profit">Profit</option>
              <option value="loss">Loss</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-3">
            <button className="btn btn-primary mt-2" onClick={() => this.handleSortChange('buyAvg')}>Sort by Buy Value</button>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <button className="btn btn-primary mt-2" onClick={() => this.handleSortChange('LTP')}>Sort by LTP</button>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <button className="btn btn-primary mt-2" onClick={() => this.handleSortChange('quantity')}>Sort by Quantity</button>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <button className="btn btn-primary mt-2" onClick={() => this.handleSortChange('investedAmount')}>Sort by Invested Amount</button>
          </div>
        </div>
        <div className="container">
          {portfolio.map((stock, index) => (
            <div className="card mt-3" key={index}>
              <div className="card-header">
                <h5>{stock.stockName}</h5>
              </div>
              <div className="card-body">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td><strong>Quantity:</strong> {stock.quantity}</td>
                      <td><strong>Buy Average:</strong> {stock.buyAvg}</td>
                      <td style={{color: stock.increasePercentage < 0 ? 'red' : 'green'}}><strong>Change (%) :</strong> {stock.increasePercentage}%</td>
                    </tr>
                    <tr>
                      <td><strong>Invested Amount:</strong> {stock.investedAmount}</td>
                      <td><strong>Last Traded Price:</strong> {stock.LTP}</td>
                      <td style={{color: stock.incrementalValue < 0 ? 'red' : 'green'}}><strong>Change :</strong> {stock.incrementalValue}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default StocksPortfolio;




