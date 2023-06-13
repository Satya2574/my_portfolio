import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faSync } from '@fortawesome/free-solid-svg-icons';
import './NetworthComponent.css'; // Import the CSS file for styling
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';



const NetworthComponent = (
    { totalWorth, incrementalValue, percentageChange, maxGainerStock, maxLoserStock }) => {
// Create styles
const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    text: {
      marginBottom: 10 ,
      color: 'black',
      fontSize: 20,
      textAlign: 'center',
      fontFamily: 'Times-Roman'

    }
  });
  
  const MyDoc = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.text}>Total Worth: {totalWorth}</Text>
          <Text style={styles.text}>Incremental Value: {incrementalValue}</Text>
          <Text style={styles.text}>Percentage Change: {percentageChange}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Max Gainer Stock: {maxGainerStock.name}</Text>
          <Text style={styles.text}>Gain: {maxGainerStock.gain}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Max Loser Stock: {maxLoserStock.name}</Text>
          <Text style={styles.text}>Loss: {maxLoserStock.loss}</Text>
        </View>
      </Page>
    </Document>
  );
  
  
  const handlePrint = () => {
    return (
      <div>
        <PDFDownloadLink document={<MyDoc />} fileName="stocks.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
      </div>
    )
  };

  const handleRefresh = () => {
    // Functionality for refreshing
    console.log('Refresh icon clicked');
  };
  const renderTooltip = (message) => (props) => (
    <Tooltip id={`button-tooltip-${message}`} {...props}>
      {message}
    </Tooltip>
  );
  

  const isPositiveChange = percentageChange >= 0;
  const changeColor = isPositiveChange ? 'green' : 'red';

  return (
    <div className="networth-component">
      <div className="header">
        <h1>My Networth</h1>
        <div className="icons">
        <PDFDownloadLink document={<MyDoc />} fileName="stocks.pdf">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip('Click to download PDF')}
        >
          <FontAwesomeIcon icon={faPrint} onClick={handlePrint} />
        </OverlayTrigger>
          </PDFDownloadLink>
          <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip('Click to refresh data')}
        >
          <FontAwesomeIcon icon={faSync}  color="#DEFFFF"  onClick={handleRefresh} />
        </OverlayTrigger>
        </div>
      </div>
      <div className="row">
      <div className="col-lg-4">
      <div className="total-worth">
        <div className="label">Total Worth</div> 
        <div className="value">{totalWorth}</div>
      </div>
    </div>
    <div className="col-lg-4">
      <div className="total-worth">
        <div className="label">Total Incremental Value</div>
        <div className="incremental-value">{incrementalValue}</div>
      </div>
    </div>
    <div className="col-lg-4">
      <div className="total-worth">
        <div className="label">Total Change in Percentage</div>
        <div className={`percentage-change ${changeColor}`}>{percentageChange.toFixed(2)}%</div>
      </div>
    </div>
    
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className={`max-gainer ${isPositiveChange ? 'green' : 'red'}`}>
            <div className="label">Max Gainer</div>
            <div className="stock">{maxGainerStock.name}</div>
            <div className="gain">{maxGainerStock.gain}</div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className={`max-loser ${isPositiveChange ? 'red' : 'green'}`}>
            <div className="label">Max Loser</div>
            <div className="stock">{maxLoserStock.name}</div>
            <div className="loss">{maxLoserStock.loss}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworthComponent;
