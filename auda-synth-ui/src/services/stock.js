import axiosClient from './api';
import { API } from './constant';


export async function getStock(userId) {
  const data = await axiosClient.get(API.Stock.get(userId))
  return data.data;
}

export async function getPortfolio(userId) {
  const data = await axiosClient.get(API.Stock.getPortfolio(userId))
  return data.data;
}

export async function getOrders(userId) {
  const data = await axiosClient.get(API.Stock.getOrders(userId))
  return data.data;
}

export async function purchaseStock(stockData) {
  const data = await axiosClient.post(API.Stock.purchase, stockData)
  return data.data;
}

export async function saveOrder(stockData) {
  const data = await axiosClient.post(API.Stock.saveOrder, stockData)
  return data.data;
}

export async function sellStock(stockData) {
  const data = await axiosClient.patch(API.Stock.sell, stockData)
  return data.data;
}


export async function resetAccount(userId) {
  const data = await axiosClient.delete(API.Stock.reset(userId))
  return data.data;
}
