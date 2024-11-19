
import { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { generateD3Chart } from '../utils/generateD3Chart'
/* 
const API_URL = 'https://eodhd.com/api/eod/'
const API_TOKEN = import.meta.env.VITE_APP_EODHD_API_TOKEN || 'demo' */

const data = [
  {
    open:   123.43, 
    high: 140,
    low:  120.43,
    close:  110.80,
    adjusted_close: 111, 
    volume:  17894567,
    date: dayjs('2022-01-01').toDate(),
  },
  {
    open:   123.43, 
    high: 140,
    low:  120.43,
    close:  114,
    adjusted_close: 114, 
    volume:  19034567,
    date: dayjs('2022-01-02').toDate(),
  },
  {
    open:   123.43, 
    high: 140,
    low:  120.43,
    close:  123.70,
    adjusted_close: 123.70, 
    volume:  1234567,
    date: dayjs('2022-01-03').toDate(),
  },
  {
    open:   123.43, 
    high: 140,
    low:  120.43,
    close:  123.70,
    adjusted_close: 123.70, 
    volume:  1234567,
    date: dayjs('2022-01-04').toDate(),
  },
];


export default function useD3Chart(stockSymbol, year, graphData) {
  const chartRef = useRef(null)
  // debugger;
  // We can get a warning and no data from the free version of the API
  const [warning, setWarning] = useState(undefined)

  useEffect(() => {
    /*  const apiEndpoint = `${API_URL}${stockSymbol}?from=${year}-01-01&to=${year}-12-31&period=d&fmt=json&&api_token=${API_TOKEN}`
 
     // Create an AbortController instance to cancel the fetch request when the component is unmounted
     const abortController = new AbortController()
 
     // Get the chart container element
     
 
     const fetchStockData = async () => {
       try {
         const response = await fetch(apiEndpoint, {
           signal: abortController.signal,
         })
 
         if (!response.ok) {
           throw new Error(`Failed to fetch data. Status: ${response.status}`)
         }
 
         const data = await response.json()
 
         // We can get a warning and no data from the free version of the API
         if (data.length === 1 && Object.prototype.hasOwnProperty.call(data[0], 'warning')) {
           setWarning(() => data[0].warning)
           return
         }
 
         // Convert the date strings to Date objects to not to do it in D3.js
         return data.map((d) => ({
           ...d,
           date: dayjs(d.date).toDate(),
         }))
       } catch (error) {
         if (error.name === 'AbortError') {
           // Fetch was cancelled, ignore the error
           return
         } else {
           console.error('Error fetching data:', error)
         }
       }
     }
     fetchStockData().then((data) => {
       if (data && element && !warning) {
         
       }
     })
 
     
  */
    const element = chartRef.current
    if (!element) {
      return
    }
    generateD3Chart(stockSymbol, graphData, element, 1680, 800)
    return () => {
      // Cancel the fetch request if it's still pending when the component is unmounted
      //abortController.abort()
      if (element) {
        // Clear the chart when the component is unmounted
        element.innerHTML = ''
      }
    }
  }, [graphData])

  return { chartRef, warning }
}