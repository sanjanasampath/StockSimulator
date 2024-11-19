import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import TextBox from "../components/TextBox";
import Button from "../components/Button";
import Input from "../components/TextBox";
import { useAuth } from "../providers/AuthProvider";
import { sellStock, saveOrder } from "../services/stock";
import ModalAlert from "../components/ModalAlert";
import { euroCurrencyStd } from "../utils/formatCurrency";
import Select from "../components/Select";

const ORDER_TYPES = [
  { option: "Market order", value: "market" },
  { option: "Stop loss", value: "stop_loss" },
  { option: "Take Profit", value: "take_profit" },
];
const ORDER_TYPE_PLACEHOLDERS = {
  stop_loss: "Stop loss amount",
  take_profit: "Take profit amount",
};

export default function ModalSell({
  sellModalOpen,
  onClose,
  stock,
  onSellSuccess,
  setBalance,
}) {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [orderType, setOrderType] = useState("market");
  const [orderAmount, setOrderAmount] = useState("");

  async function handleSell(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const quantity = formData.get("quantity");
    formData.append("userId", user.id);
    formData.append("price", stock.currentPrice);
    formData.append("ticker", stock.ticker);
    if (orderType === "stop_loss" && orderAmount >= stock.currentPrice) {
      setOpenModal(true);
      setMessage(`Stop loss amount should be less than current price!`);
      return;
    } else if (
      orderType === "take_profit" &&
      orderAmount < stock.currentPrice
    ) {
      setOpenModal(true);
      setMessage(`Take profit amount should be greater than current price!`);
      return;
    } else if (
      (orderType === "stop_loss" && orderAmount < stock.currentPrice) ||
      (orderType === "take_profit" && orderAmount > stock.currentPrice)
    ) {
      const order = await saveOrder(formData);
      if (order.status === "success") {
        setOpenModal(true);
        setMessage(
          `Order saved successfully!\n\n ${quantity} ${
            stock.ticker
          } will be sold if it reaches $ ${euroCurrencyStd(orderAmount)}`
        );
        return;
      } else if (order.status === "fail") {
        setOpenModal(true);
        setMessage(`Failed to save order!\n\n ${order.message}`);
      }
    } else if (orderType === "market") {
      const sellStockResult = await sellStock(formData);
      if (sellStockResult.status === "success") {
        setBalance(sellStockResult.user.balance);
        setMessage(
          `Sold Succesfully!\n\n You now have $ ${euroCurrencyStd(
            sellStockResult.user.balance
          )} in your account!`
        );
        setOpenModal(true);
        onSellSuccess();
      } else if (sellStockResult.status === "fail") {
        setMessage(`Sell Attempt Unsuccesful!\n\n ${sellStockResult.message}`);
        setOpenModal(true);
      }
    }
  }

  return (
    <Dialog className="relative z-10" open={sellModalOpen} onClose={onClose}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <form onSubmit={handleSell}>
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-navBackground text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-background px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-center w-full">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-semibold leading-6 text-brand mb-8"
                    >
                      Sell {stock.ticker}
                    </DialogTitle>
                    <div className="mt-2">
                      <div className="flex flex-col relative">
                        <div className="flex gap-2 bg-textboxBackground h-11 py-1.5 px-2 mb-2 rounded border border-transparent border-solid items-center">
                          <TextBox
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Stock Name"
                            defaultValue={stock.name}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="flex flex-col relative">
                        <div className="flex gap-2 bg-textboxBackground h-11 py-1.5 px-2 mb-2 rounded border border-transparent border-solid items-center">
                          <TextBox
                            type="text"
                            id="currentprice"
                            name="currentprice"
                            placeholder="Price"
                            defaultValue={euroCurrencyStd(stock.currentPrice)}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="flex flex-col relative">
                        <div className="flex gap-2 bg-textboxBackground h-11 py-1.5 px-2 mb-2 rounded border border-transparent border-solid items-center">
                          <TextBox
                            type="text"
                            id="quantity"
                            name="quantity"
                            placeholder="Quantity"
                            defaultValue={stock.quantity}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col relative">
                        <div className="flex gap-2 bg-textboxBackground h-11 py-1.5 px-2 mb-2 rounded border border-transparent border-solid items-center">
                          <Select
                            name="orderType"
                            options={ORDER_TYPES}
                            value={orderType}
                            onChange={(e) => setOrderType(e.target.value)}
                          />
                        </div>
                      </div>
                      {orderType !== "market" ? (
                        <div className="flex flex-col relative">
                          <div className="flex gap-2 bg-textboxBackground h-11 py-1.5 px-2 mb-2 rounded border border-transparent border-solid items-center">
                            <Input
                              name="orderAmount"
                              placeholder={ORDER_TYPE_PLACEHOLDERS[orderType]}
                              value={orderAmount}
                              onChange={(e) => setOrderAmount(e.target.value)}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-textboxBackground p-8 sm:flex sm:flex-row-reverse sm:px-6 items-center justify-center">
                <Button
                  type="submit"
                  customStyles="rounded-md px-3 py-2 sm:ml-3 sm:w-auto"
                >
                  Sell Stock
                </Button>
                <Button
                  type="button"
                  customStyles="rounded-md bg-white px-3 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setOpenModal(false)}
                  data-autofocus
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </form>
      </div>
      {openModal && message && (
        <ModalAlert
          openModal={openModal}
          message={message}
          onClose={() => setOpenModal(false)}
        />
      )}
    </Dialog>
  );
}
