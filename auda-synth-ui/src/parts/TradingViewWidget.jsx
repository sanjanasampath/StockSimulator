// TradingViewWidget.jsx
import React, { useState, useEffect, useRef, memo } from "react";

function TradingViewWidget({ ticker }) {
  const container = useRef(null);
  const [isContainerReady, setIsContainerReady] = useState(false);

  useEffect(() => {
    if (container.current) {
      setIsContainerReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isContainerReady) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    const config = {
      width: "100%",
      height: "100%",
      autosize: true,
      symbol: `${ticker.replace("-", "")}`,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      backgroundColor: "rgba(0, 0, 0, 1)",
      hide_side_toolbar: false,
      allow_symbol_change: true,
      save_image: false,
      calendar: false,
      hide_volume: true,
      support_host: "https://www.tradingview.com",
    };

    script.innerHTML = JSON.stringify(config);

    const widgetContainer = container.current.querySelector(
      ".tradingview-widget-container__widget"
    );
    if (widgetContainer) {
      widgetContainer.innerHTML = "";
      widgetContainer.appendChild(script);
    }

    return () => {
      if (widgetContainer) {
        widgetContainer.innerHTML = "";
      }
    };
  }, [isContainerReady, ticker]);

  console.log("Rendering TradingViewWidget", { ticker });
  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "100%", width: "100%" }}
      ></div>
      {/* <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div> */}
    </div>
  );
}

export default memo(TradingViewWidget);
