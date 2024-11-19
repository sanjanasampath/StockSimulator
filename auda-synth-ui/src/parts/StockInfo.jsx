import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Select from "../components/Select";
import { STOCKTYPES } from "../constants/select";
import DisplayTextBlock from "../components/DisplayTextBlock";
import { getDataById, getPricesById } from "../services/data";
import { euroCurrencyStd } from "../utils/formatCurrency";

const StockInfo = forwardRef(({ setStockName, setCurrentPrice }, ref) => {
  const [tooltipText, setTooltipText] = useState("");
  const [stockInfo, setStockInfo] = useState({
    openPrice: "",
    closePrice: "",
    highPrice: "",
    lowPrice: "",
  });

  useImperativeHandle(ref, () => ({
    fetchStockPrices: (value) => {
      console.log("Fetching stock prices every minute", value);
      fetchStockPrices(value);
    },
  }));

  useEffect(() => {
    if (STOCKTYPES.length > 0) {
      const initialStockName = STOCKTYPES[0].value;
      handleFetchStockData(initialStockName.split(":")[1]);
    }
  }, []);

  async function handleFetchStockData(value) {
    const stockData = await getDataById(value);
    setStockName(value);
    if (stockData.status === "success") {
      fetchStockPrices(value);
      setTooltipText(
        `${stockData.data.description}\nStart Date: ${stockData.data.startDate}\nEnd Date: ${stockData.data.endDate}`
      );
    } else if (stockData.status === "fail") {
      setTooltipText("No description");
    }
  }
  async function fetchStockPrices(value) {
    const stockPrices = await getPricesById(value);
    if (stockPrices.status === "success" && stockPrices.data.length > 0) {
      let latestStockData = stockPrices.data[stockPrices.data.length - 1];

      console.log("Latest Stock Data:", latestStockData);
      setStockInfo({
        openPrice: euroCurrencyStd(latestStockData.open),
        closePrice: euroCurrencyStd(latestStockData.close),
        highPrice: euroCurrencyStd(latestStockData.high),
        lowPrice: euroCurrencyStd(latestStockData.low),
        currentPrice: euroCurrencyStd(latestStockData.last),
      });
      setCurrentPrice(Number(latestStockData.last));
    } else if (stockPrices.status === "fail") {
      console.log(stockPrices);
    }
  }
  return (
    <div className="bg-navBackground rounded-2xl h-20 relative inline-flex text-center">
      <Select
        customstyles="w-full sm:w-auto mb-2 sm:mb-0 text-center"
        message={tooltipText}
        options={STOCKTYPES}
        id="bitcoinTypes"
        name="bitcoinTypes"
        onChange={(e) => handleFetchStockData(e.target.value.split(":")[1])}
      />
      <div className="p-4 pl-8 pr-8 items-center flex">
        <p className="text-green-500 align-middle text-center text-xl font-bold">
          $ {stockInfo.currentPrice}
        </p>
      </div>
      <DisplayTextBlock placeholder="Open" text={stockInfo.openPrice} />
      <DisplayTextBlock placeholder="24H High" text={stockInfo.highPrice} />
      <DisplayTextBlock placeholder="24H Low" text={stockInfo.lowPrice} />
      <DisplayTextBlock placeholder="Close" text={stockInfo.closePrice} />
    </div>
  );
});

export default StockInfo;
