import React, { Component } from 'react';
import StocksPortfolio from './StocksPortfolio';
import NetworthComponent from './NetworthComponent';

  class PortfolioPage extends Component {
    state = {
        portfolio: [
            {
              stockName: 'Reliance Industries Ltd',
              quantity: 100,
              buyAvg: 2500,
              increasePercentage: 10,
              incrementalValue: 250,
              investedAmount: 250000,
              LTP: 2750
            },
            {
              stockName: 'Tata Consultancy Services Ltd',
              quantity: 200,
              buyAvg: 3200,
              increasePercentage: -5,
              incrementalValue: -160,
              investedAmount: 640000,
              LTP: 3040
            },
            {
              stockName: 'HDFC Bank Ltd',
              quantity: 50,
              buyAvg: 1400,
              increasePercentage: 15,
              incrementalValue: 210,
              investedAmount: 70000,
              LTP: 1610
            },
            {
              stockName: 'Infosys Ltd',
              quantity: 150,
              buyAvg: 1200,
              increasePercentage: -2,
              incrementalValue: -24,
              investedAmount: 180000,
              LTP: 1176
            },
            {
              stockName: 'Hindustan Unilever Ltd',
              quantity: 75,
              buyAvg: 2300,
              increasePercentage: 8,
              incrementalValue: 184,
              investedAmount: 172500,
              LTP: 2484
            },
            {
              stockName: 'ICICI Bank Ltd',
              quantity: 300,
              buyAvg: 600,
              increasePercentage: 20,
              incrementalValue: 120,
              investedAmount: 180000,
              LTP: 720
            },
            {
              stockName: 'ITC Ltd',
              quantity: 50,
              buyAvg: 200,
              increasePercentage: -10,
              incrementalValue: -20,
              investedAmount: 10000,
              LTP: 180
            },
            {
              stockName: 'State Bank of India',
              quantity: 150,
              buyAvg: 400,
              increasePercentage: 5,
              incrementalValue: 20,
              investedAmount: 60000,
              LTP: 420
            },
            {
              stockName: 'Maruti Suzuki India Ltd',
              quantity: 100,
              buyAvg: 6000,
              increasePercentage: 12,
              incrementalValue: 720,
              investedAmount: 600000,
              LTP: 6720
            }
          ],
        filter: 'all',
        sortBy: null,
        sortDirection: 'asc',
      };
    
  
    calculateStatistics = () => {
      const { portfolio } = this.state;
  
      let totalWorth = 0;
      let incrementalValue = 0;
      let maxGainerStock = { name: '', gain: 0 };
      let maxLoserStock = { name: '', loss: 0 };
  
      portfolio.forEach(stock => {
        const stockWorth = stock.quantity * stock.LTP;
        totalWorth += stockWorth;
  
        const stockIncrementalValue = stock.quantity * stock.incrementalValue;
        incrementalValue += stockIncrementalValue;
  
        if (stock.incrementalValue > maxGainerStock.gain) {
          maxGainerStock.gain = stock.incrementalValue;
          maxGainerStock.name = stock.stockName;
        }
  
        if (stock.incrementalValue < maxLoserStock.loss) {
          maxLoserStock.loss = stock.incrementalValue;
          maxLoserStock.name = stock.stockName;
        }
      });
  
      const percentageChange = (incrementalValue / (totalWorth - incrementalValue)) * 100;
  
      return {
        totalWorth,
        incrementalValue,
        percentageChange,
        maxGainerStock,
        maxLoserStock,
      };
    };
  
    render() {
      const stats = this.calculateStatistics();
  
      return (
        <div>
          <NetworthComponent {...stats} />
            <br/>   <br/>   <br/>   <br/>   <br/>    <br/>   <br/>
          <StocksPortfolio portfolio={this.state.portfolio} />
        </div>
      );
    }
  }
  
  export default PortfolioPage;
  