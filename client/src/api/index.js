import axios from "axios";

const api = {
  get: route => axios.get(`api/${route}`),
  post: (route, data) => axios.post(`api/${route}`, data)
};

export async function getInventory() {
  return await api.get("inventory");
}

export async function orderStatus(conf) {
  return await api.get(`orders/status/${conf}`);
}

export async function validateAddress(adrDetails) {
  return await api.post("address/shipping", adrDetails);
}

export async function getConfig() {
  return await api.get("config");
}

export async function placeOrder(orderDetails) {
  console.log("placing order", orderDetails);
  return await api.post("orders/new", orderDetails);
}
