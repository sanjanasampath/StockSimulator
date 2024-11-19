

export const API = {

  "Auth": {
    "login": "/auth/login",
    "register": "/auth/register",
    "logout": "/auth/logout",
    "user": "/auth/user",
  },

  "Stock": {
    "purchase": "/stock",
    "saveOrder": "/stock/saveOrder",
    "sell": "/stock",
    "getPortfolio": (userId) => `/stock/portfolio/${userId}`,
    "get": (userId) => `/stock/${userId}`,
    "getOrders": (userId) => `/stock/${userId}/getOrders`,
    "reset": (userId) => `/stock/${userId}`,
  },

  "Data": {
    "getDescriptionById": (tickerId) => `/data/prices/${tickerId}`,
    "getPricesById": (tickerId) => `/data/prices/${tickerId}/full`,
    "random": "/data/random",
    "setPriceForTicker": "/data/prices/setPriceForTicker",
    "getPriceForTicker": (ticker) => `/data/getPriceForTicker?ticker=${ticker}`,
  }

}
