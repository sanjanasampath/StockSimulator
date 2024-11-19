import { useState } from "react";
import Tabs from "./Tabs";
import { TabPanels, TabPanel } from "@headlessui/react";
import Table from "./Table";
import Input from "./TextBox";
import { Link } from "react-router-dom";
import ModalSell from "../parts/ModalSellStocksForm";
import Button from "./Button";
import Moment from "moment";
import { euroCurrencyStd } from "../utils/formatCurrency";

const categories = [
  {
    name: "Positions",
  },
  {
    name: "History",
  },
  {
    name: "Orders",
  },
];

function TabSwitcher({
  portfolioData,
  stockHistoryData,
  ordersData,
  onSellSuccess,
  setBalance,
}) {
  const [currentTab, setCurrentTab] = useState("");
  const options = categories.map((category) => category.name);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [stock, setStock] = useState(undefined);

  const openSaleModal = (stock) => {
    setStock(stock);
    setSellModalOpen(true);
  };

  return (
    <div className="flex w-full justify-center pt-2 px-4">
      <div className="w-full">
        <Tabs value={currentTab} onChange={setCurrentTab} options={options}>
          <TabPanels className="mt-3">
            {/* {categories.map((category) => ( */}
            <TabPanel key="Portfolio" className="rounded-xl p-3">
              <div className="relative w-full">
                <div className="flex gap-2 bg-textboxBackground h-11 py-1.5 px-2 mb-2 rounded border border-transparent border-solid items-center">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-brand"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Input type="text" id="simple-search" placeholder="Search" />
                </div>
              </div>
              {portfolioData.length === 0 ||
              portfolioData.every((data) => data.closed) ? (
                <Table>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell colSpan="8">
                        <div className="flex w-full p-4 items-center justify-center text-brand">
                          No Data
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              ) : (
                <Table>
                  <Table.Head>
                    <Table.Row>
                      <Table.Cell>Pair</Table.Cell>
                      <Table.Cell>Name</Table.Cell>
                      <Table.Cell>Position</Table.Cell>
                      <Table.Cell>Purchase Price</Table.Cell>
                      <Table.Cell>Last Price</Table.Cell>
                      <Table.Cell>Est Position Cost</Table.Cell>
                      <Table.Cell>Est Position Value</Table.Cell>
                      <Table.Cell>Unrealised P&L (%)</Table.Cell>
                      <Table.Cell>Open Time</Table.Cell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {portfolioData.map((data, index) => {
                      const purchaseCost = (
                        Number(data.quantity) * Number(data.avgPrice)
                      ).toFixed(2);
                      const positionValue = (
                        Number(data.quantity) * Number(data.currentPrice)
                      ).toFixed(2);
                      const difference = (
                        (Number(positionValue) / Number(purchaseCost) - 1) *
                        100
                      ).toFixed(2);
                      return (
                        <Table.Row key={index}>
                          <Table.Cell>
                            <div className="h-30px py-2 bg-brand rounded-[10px] items-center flex">
                              <div className="grow shrink basis-0 text-center text-white text-base font-normal font-['ADLaM Display'] leading-[21.05px]">
                                <button>
                                  <Link
                                    className="underlined"
                                    onClick={() => openSaleModal(data)}
                                  >
                                    {data.ticker}
                                  </Link>
                                </button>
                              </div>
                            </div>
                          </Table.Cell>
                          <Table.Cell>{data.name}</Table.Cell>
                          <Table.Cell>
                            {data.quantity} {data.ticker}
                          </Table.Cell>
                          <Table.Cell>
                            $ {euroCurrencyStd(data.avgPrice)}
                          </Table.Cell>
                          <Table.Cell>
                            $ {euroCurrencyStd(data.currentPrice)}
                          </Table.Cell>
                          <Table.Cell>
                            $ {euroCurrencyStd(purchaseCost)}
                          </Table.Cell>
                          <Table.Cell>
                            $ {euroCurrencyStd(positionValue)}
                          </Table.Cell>
                          <Table.Cell
                            condition={
                              difference >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {difference >= 0 ? "▲" : "▼"} {difference} %
                          </Table.Cell>
                          <Table.Cell>
                            {Moment(data.date).format("DD-MM-YYYY HH:mm")}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              )}
            </TabPanel>

            <TabPanel key="History" className="rounded-xl p-3">
              <div className="relative w-full">
                <div className="flex gap-2 bg-textboxBackground h-11 py-1.5 px-2 mb-2 rounded border border-transparent border-solid items-center">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-brand"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Input type="text" id="simple-search" placeholder="Search" />
                </div>
              </div>
              <ul>
                <Table>
                  <Table.Head>
                    <Table.Row>
                      <Table.Cell>Pair</Table.Cell>
                      <Table.Cell>Name</Table.Cell>
                      <Table.Cell>Direction</Table.Cell>
                      <Table.Cell>Type</Table.Cell>
                      <Table.Cell>Executed</Table.Cell>
                      <Table.Cell>Avg Filled Price</Table.Cell>
                      <Table.Cell>Total Amount</Table.Cell>
                      <Table.Cell>Realized P&L (%)</Table.Cell>
                      <Table.Cell>Open Time</Table.Cell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {stockHistoryData.length === 0 ||
                    stockHistoryData.every((data) => data.closed) ? (
                      <Table.Row>
                        <Table.Cell colSpan="8">
                          <div className="flex w-full p-4 items-center justify-center text-brand">
                            No Data
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ) : (
                      stockHistoryData
                        .slice()
                        .reverse()
                        .map((data) => {
                          const purchaseTotal = (
                            Number(data.quantity) * Number(data.purchasePrice)
                          ).toFixed(2);
                          return (
                            <Table.Row key={data.id}>
                              <Table.Cell>
                                <div className="h-30px py-2 bg-brand rounded-[10px] items-center">
                                  <div className="grow shrink basis-0 text-center text-white text-base font-normal font-['ADLaM Display']">
                                    <button>
                                      <Link className="underlined">
                                        {data.ticker}
                                      </Link>
                                    </button>
                                  </div>
                                </div>
                              </Table.Cell>
                              <Table.Cell>{data.name}</Table.Cell>
                              <Table.Cell>
                                {data.closed ? "Close Long" : "Long"}
                              </Table.Cell>
                              <Table.Cell>Taker</Table.Cell>
                              <Table.Cell>
                                {data.quantity} {data.ticker}
                              </Table.Cell>
                              <Table.Cell>
                                $ {euroCurrencyStd(data.purchasePrice)}
                              </Table.Cell>
                              <Table.Cell>
                                $ {euroCurrencyStd(purchaseTotal)}
                              </Table.Cell>
                              {data.closed ? (
                                <>
                                  <Table.Cell //blank for purchased //document sold price
                                    condition={
                                      data.realisedPL >= 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }
                                  >
                                    {data.realisedPL >= 0 ? "▲" : "▼"}{" "}
                                    {data.realisedPL} %
                                  </Table.Cell>
                                </>
                              ) : (
                                <Table.Cell></Table.Cell>
                              )}
                              <Table.Cell>
                                {Moment(data.purchaseDate).format(
                                  "DD-MM-YYYY HH:mm"
                                )}
                              </Table.Cell>
                            </Table.Row>
                          );
                        })
                    )}
                  </Table.Body>
                </Table>
              </ul>
            </TabPanel>
            <TabPanel key="Orders" className="rounded-xl p-3">
              {ordersData.length === 0 ? (
                <Table>
                  <Table.Head></Table.Head>
                  <Table.Row>
                    <Table.Cell colSpan="8">
                      <div className="flex w-full p-4 items-center justify-center text-brand">
                        No Data
                      </div>
                    </Table.Cell>
                  </Table.Row>
                </Table>
              ) : (
                <Table>
                  <Table.Head>
                    <Table.Row>
                      <Table.Cell>Ticker</Table.Cell>
                      <Table.Cell>Quantity</Table.Cell>
                      <Table.Cell>Order Type</Table.Cell>
                      <Table.Cell>Order Amount</Table.Cell>
                      <Table.Cell>Status</Table.Cell>
                      <Table.Cell>Created At</Table.Cell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {ordersData
                      .slice()
                      .reverse()
                      .map((order) => (
                        <Table.Row key={order._id}>
                          <Table.Cell>{order.ticker}</Table.Cell>
                          <Table.Cell>{order.quantity}</Table.Cell>
                          <Table.Cell>{order.orderType}</Table.Cell>
                          <Table.Cell>{order.orderAmount}</Table.Cell>
                          <Table.Cell>{order.status}</Table.Cell>
                          <Table.Cell>
                            {Moment(order.createdAt).format("DD-MM-YYYY HH:mm")}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>
                </Table>
              )}
            </TabPanel>
            {/* ))} */}
          </TabPanels>
        </Tabs>
      </div>
      {sellModalOpen && stock && (
        <ModalSell
          sellModalOpen={sellModalOpen}
          onClose={() => setSellModalOpen(false)}
          stock={stock}
          setBalance={setBalance}
          onSellSuccess={onSellSuccess}
        />
      )}
    </div>
  );
}

export default TabSwitcher;
