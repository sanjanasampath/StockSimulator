import React, { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import Input from "../components/TextBox";
import { TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";
import { euroCurrencyStd } from "../utils/formatCurrency";
import ModalAlert from "../components/ModalAlert";
import { purchaseStock, saveOrder } from "../services/stock";
import Select from "../components/Select";

const ORDER_TYPES = [
  { option: "Market order", value: "market" },
  { option: "Limit order", value: "limit" },
];
const ORDER_TYPE_PLACEHOLDERS = {
  limit: "Limit order amount",
};

function BuyStocksForm({
  user,
  balance,
  setBalance,
  currentPrice,
  stockName,
  onPurchaseSuccess,
}) {
  const [buyingPrice, setBuyingPrice] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [orderType, setOrderType] = useState("market");
  const [orderAmount, setOrderAmount] = useState("");
  const quantityRef = useRef(null);
  const [isInputMounted, setIsInputMounted] = useState(false);

  console.log("Component rendering");

  useEffect(() => {
    console.log("useEffect running");
    if (isInputMounted && quantityRef.current) {
      console.log("Attempting to focus");
      quantityRef.current.focus();
    }
  }, [isInputMounted]);

  function handleCalculatePrice(qty) {
    const calculatedPrice = euroCurrencyStd(currentPrice * qty);
    setBuyingPrice(calculatedPrice);
  }

  async function handlePurchase(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const quantity = formData.get("quantity");
    const orderAmount = formData.get("orderAmount");
    formData.append("userId", user.id);
    formData.append("ticker", stockName);
    formData.append("price", currentPrice);

    if (quantity === "") {
      setOpenModal(true);
      setMessage("Please fill in the desired Quantity!");
      return;
    }
    if (
      orderType === "limit" &&
      orderAmount !== "" &&
      orderAmount < currentPrice
    ) {
      const order = await saveOrder(formData);
      if (order.status === "success") {
        setOpenModal(true);
        setMessage(
          `Order saved successfully!\n\n ${quantity} ${stockName} will be purchased at $ ${euroCurrencyStd(
            orderAmount
          )}`
        );
        form.reset();
        onPurchaseSuccess();
        return;
      } else if (order.status === "fail") {
        setOpenModal(true);
        setMessage(`Failed to save order!\n\n ${order.message}`);
      }
    } else if (orderType === "limit" && orderAmount >= currentPrice) {
      setOpenModal(true);
      setMessage(
        `Order amount should be less than current price for Limit order type!`
      );
      return;
    } else if (orderType === "limit" && orderAmount === "") {
      setOpenModal(true);
      setMessage(`Order amount cannot be empty!`);
      return;
    } else if (orderType === "market") {
      const purchase = await purchaseStock(formData);
      if (purchase.status === "success") {
        setOpenModal(true);
        setBalance(euroCurrencyStd(purchase.user.balance));
        setMessage(
          `Purchase Successful!\n\n You now have $ ${euroCurrencyStd(
            purchase.user.balance
          )} in your account!`
        );
        // fetchPortfolioData(user.id);
        setBuyingPrice("");
        form.reset();
        onPurchaseSuccess();
      } else if (purchase.status === "fail") {
        setOpenModal(true);
        setMessage(`Purchase Unsuccessful!\n\n ${purchase.message}`);
      }
    }
  }
  return (
    <div className=" p-2 bg-navBackground rounded-xl">
      <TabGroup>
        <TabPanels>
          <TabPanel data-selected>
            <div className="flex flex-col relative p-4 gap-8">
              <div className="w-[335px] h-[21.97px] justify-center items-center gap-[23px] inline-flex">
                <div className="text-center text-[#1ec7d3] text-[17px] font-normal font-['ADLaM Display'] leading-snug">
                  Limit
                </div>
                <div className="w-[70px] h-[22px] text-center text-[#7a6eaa] text-[17px] font-normal font-['ADLaM Display'] leading-snug">
                  Market
                </div>
                <div className="w-[99px] h-[22px] relative">
                  <div className="w-[82px] h-[22px] left-0 top-0 absolute text-center text-[#7a6eaa] text-[17px] font-normal font-['ADLaM Display'] leading-snug">
                    Stop Loss
                  </div>
                </div>
                <div className="w-[22.22px] h-5 relative shadow-inner border-black" />
              </div>
              <form onSubmit={handlePurchase}>
                <div className="flex flex-col relative mt-8 mb-4">
                  <div className="w-250px h-30px px-3.5 py-1.5 bg-textboxBackground rounded-full justify-start items-center gap-20px">
                    <div className="w-270px text-center text-brand text-17 font-normal leading-snug">
                      <Input
                        ref={quantityRef}
                        placeholder="Size"
                        name="quantity"
                        id="quantity"
                        onChange={(e) => handleCalculatePrice(e.target.value)}
                        autoComplete="off"
                        onMount={() => setIsInputMounted(true)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col relative mb-4">
                  <div className="w-250px h-80px px-3.5 py-1.5 bg-textboxBackground rounded-full justify-start items-center gap-20px">
                    <div className="w-270px text-center text-brand text-17 font-normal leading-snug">
                      <Select
                        name="orderType"
                        options={ORDER_TYPES}
                        value={orderType}
                        onChange={(e) => setOrderType(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col relative mb-12">
                  <div className="w-250px h-30px px-3.5 py-1.5 bg-textboxBackground rounded-full justify-start items-center gap-20px inline-flex mb-2">
                    <div className="w-270px text-center text-[#7a6eaa] text-17 font-normal leading-snug">
                      {orderType !== "market" ? (
                        <Input
                          name="orderAmount"
                          placeholder={ORDER_TYPE_PLACEHOLDERS[orderType]}
                          value={orderAmount}
                          onChange={(e) => setOrderAmount(e.target.value)}
                        />
                      ) : (
                        <Input
                          placeholder="Buying Price"
                          value={buyingPrice || "Buying Price"}
                          type="text"
                          name="buyingPrice"
                          id="buyingPrice"
                          readOnly
                        />
                      )}
                    </div>
                    <div className="justify-end items-center gap-[19px] flex flex-1">
                      <div className="text-center text-white text-[17px] font-normal font-['ADLaM Display'] leading-snug">
                        {euroCurrencyStd(currentPrice)}
                      </div>
                      <div className="text-center text-[#d534ed] text-[17px] font-normal font-['ADLaM Display'] leading-snug">
                        Last
                      </div>
                    </div>
                  </div>
                  <div className="justify-center items-center gap-4 flex flex-1">
                    <div className="text-center text-[#d534ed] text-[17px] font-normal font-['ADLaM Display'] leading-snug">
                      Available Balance
                    </div>
                    <div className="text-center text-white text-[17px] font-normal font-['ADLaM Display'] leading-snug">
                      {balance}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-250px h-30px px-9 py-4 bg-brand rounded-[50px] items-center flex">
                    <div className="grow shrink basis-0 h-[18px] text-center text-white text-base font-normal font-['ADLaM Display'] leading-[21.05px]">
                      <button>Buy Now</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </TabGroup>
      {openModal && message && (
        <ModalAlert
          openModal={openModal}
          onClose={() => setOpenModal(false)}
          message={message}
        />
      )}
    </div>
  );
}

export default BuyStocksForm;
