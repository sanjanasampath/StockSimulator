
import axiosClient from './api';
import { API } from './constant';



export async function getDataById(id) {
  const data = await axiosClient.get(API.Data.getDescriptionById(id))
  return data.data;
}

export async function getPricesById(id) {
  const data = await axiosClient.get(API.Data.getPricesById(id))
  return data.data;
}

export async function getRandomData() {
  const data = await axiosClient.get(API.Data.random)
  return data.data;
}



// TODO - Check this function better 
// It should use JSON Body not URL params
export async function setPriceForTicker(ticker, price){
  const data = await axiosClient.post(API.Data.setPriceForTicker, {ticker, price})
  return data.data;
}

export async function getCurrentPrice(ticker) {
  const data = await axiosClient.get(API.Data.getPriceForTicker(ticker))
  return data.data;
}