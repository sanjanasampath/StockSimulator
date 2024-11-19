/* @example : "https://github.com/welf/react-d3-stock-chart-demo/tree/main/src" */

import React from 'react'
import useD3Chart from "../hooks/useD3Chart"

function Chart({graphData}) {
  const stockSymbol = 'AAPL.US'; // Replace with your desired stock ticker symbol
  const year = 2022; // Replace with your desired year

  const { chartRef, warning } = useD3Chart(stockSymbol, year, graphData); // Call the useD3Chart hook

  // If there is a warning (and no data), display it
  if (warning !== undefined) {
    return (
      <div className="App">
        <h1>{warning}</h1>
        <h3>Stock symbol: <span className='symbol'>{stockSymbol}</span>, year: {year}</h3>
      </div>
    );
  }

  // Otherwise, display the chart
  return (
    <div className="">
      {/* <h1><span className='symbol'>{stockSymbol}</span> Stock Price Chart</h1> */}
      <div ref={chartRef} className='svgChart'></div>
    </div>
  );
}

export default Chart