import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../providers/AuthProvider";
import NavBar from "../components/NavBar";
import TradingViewWidget from "../parts/TradingViewWidget";
import BuyStocksForm from "../parts/BuyStocksForm";
import StockInfo from "../parts/StockInfo";
import PortfolioHistoryTable from "../parts/PortfolioHistoryTable";
import { euroCurrencyStd } from "../utils/formatCurrency";

function Dashboard() {
  const { user } = useAuth();
  const [userId, setUserId] = useState();
  const [stockName, setStockName] = useState();
  const [balance, setBalance] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);

  // Refs to store update functions from child components
  const fetchStockPricesRef = useRef();
  const portfolioHistoryTableRef = useRef();

  useEffect(() => {
    if (user && user.id) {
      setUserId(user.id);
      setBalance(euroCurrencyStd(user.balance));
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (fetchStockPricesRef.current) {
        fetchStockPricesRef.current.fetchStockPrices(stockName);
      }
      if (portfolioHistoryTableRef.current) {
        portfolioHistoryTableRef.current.updateToCurrentPrices();
      }
    }, 60000); // 60 sec

    return () => clearInterval(interval);
  }, [stockName]);

  return (
    <>
      <NavBar balance={balance} setBalance={setBalance} />
      <main className="bg-background h-full bg-cover grid gap-2">
        <div className="grid lg:grid-cols-80-20 gap-2 m-2">
          <div className="flex flex-col gap-2">
            <StockInfo
              setStockName={setStockName}
              currentPrice={currentPrice}
              setCurrentPrice={setCurrentPrice}
              ref={fetchStockPricesRef}
            />
            <div className="bg-navBackground rounded-2xl h-[70vh] p-2">
              {stockName && <TradingViewWidget ticker={stockName} />}
            </div>
            {userId && (
              <PortfolioHistoryTable
                setBalance={setBalance}
                userId={userId}
                ref={portfolioHistoryTableRef}
              />
            )}
          </div>
          <BuyStocksForm
            user={user}
            balance={balance}
            setBalance={setBalance}
            currentPrice={currentPrice}
            stockName={stockName}
            onPurchaseSuccess={() =>
              portfolioHistoryTableRef.current.refreshPurchaseHistoryData()
            }
          />
        </div>
      </main>
    </>
  );
}

export default Dashboard;
