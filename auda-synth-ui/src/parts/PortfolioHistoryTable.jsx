import {
  React,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import TabSwitcher from "../components/TabSwitcher";
import { getPricesById } from "../services/data";
import { getStock, getPortfolio, getOrders } from "../services/stock";

const PortfolioHistoryTable = forwardRef(({ setBalance, userId }, ref) => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [stockHistoryData, setStockHistoryData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    fetchPortfolioPurchaseHistoryData(userId);
    fetchOrders(userId);
  }, []);

  useImperativeHandle(ref, () => ({
    updateToCurrentPrices: () => {
      updatePrices();
    },
    refreshPurchaseHistoryData: () => {
      fetchPortfolioPurchaseHistoryData(userId);
      fetchOrders(userId);
    },
  }));

  // Function to update current prices
  function updatePrices(portfolioToUpdate = null) {
    const dataToUpdate = portfolioToUpdate || portfolioData;
    console.log("Updating prices, current portfolio:", dataToUpdate);

    if (dataToUpdate.length > 0) {
      const updatedPortfolio = dataToUpdate.map(async (item) => {
        const currentPrice = await fetchCurrentPrice(item.ticker);
        return {
          ...item,
          currentPrice: currentPrice,
        };
      });

      Promise.all(updatedPortfolio).then((result) => {
        console.log("Updated portfolio:", result);
        setPortfolioData(result);
      });
    } else {
      console.log("Portfolio is empty, fetching new data");
      // fetchPortfolioPurchaseHistoryData(userId);
    }
  }

  const fetchCurrentPrice = async (ticker) => {
    try {
      const stockPrices = await getPricesById(ticker);
      if (stockPrices.status === "success" && stockPrices.data.length > 0) {
        let latestStockData = stockPrices.data[stockPrices.data.length - 1];

        return latestStockData.last;
      }
    } catch (error) {
      console.error("Error fetching price:", error);
      return null;
    }
  };

  const fetchPortfolioPurchaseHistoryData = async (userId) => {
    try {
      const userStockPortfolio = await getPortfolio(userId);
      if (userStockPortfolio.status === "success") {
        setPortfolioData(userStockPortfolio.portfolioData);
        const currentPricePortfolio = await updatePrices(
          userStockPortfolio.portfolioData
        );

        console.log("Portfolio Data:", currentPricePortfolio);
      } else {
        console.log("Error:", userStockPortfolio.message);
      }
      const userStockHistory = await getStock(userId);
      console.log(userId);
      if (userStockHistory.status === "success") {
        setStockHistoryData(userStockHistory.stocks);
        console.log("History Data:", userStockHistory.stocks);
      } else {
        console.log("Error Fetching History Data:", userStockHistory.message);
      }
    } catch (error) {
      console.error("Error Fetching History Data:", error);
    }
  };

  const fetchOrders = async (userId) => {
    // Fetch orders from API
    const orders = await getOrders(userId);
    console.log("Orders:", orders.orders);
    setOrdersData(orders.orders);
  };

  return (
    <div className=" bg-navBackground rounded-2xl">
      <TabSwitcher
        portfolioData={portfolioData}
        stockHistoryData={stockHistoryData}
        ordersData={ordersData}
        setBalance={setBalance}
        onSellSuccess={() => fetchPortfolioPurchaseHistoryData(userId)}
      />
    </div>
  );
});

export default PortfolioHistoryTable;
