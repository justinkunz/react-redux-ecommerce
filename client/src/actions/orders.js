import { placeOrder, orderStatus } from "../api";

export function toggleLoader(payload) {
  return { type: "TOGGLE_LOADER", payload };
}

export function handleOrder(payload) {
  return { type: "HANDLE_ORDER_RESPONSE", payload };
}

export function updateConfTextBox(payload) {
  return { type: "UPDATE_CONF_TXT_BOX", payload };
}

export function paymentSuccess(payload) {
  return { type: "PAYMENT_SUCCESS", payload };
}

export function paymentFailure(payload) {
  return { type: "PAYMENT_FAILURE", payload };
}

export function handleOrderStatus(payload) {
  return { type: "HANDLE_ORDER_STATUS_RESPONSE", payload };
}

export function updateOrderFetching(payload) {
  return { type: "TOGGLE_ORDER_FETCHING", payload };
}

export function handleOrderError(payload) {
  return { type: "HANDLE_ORDER_ERROR", payload };
}

export function handleConfTxtError(payload) {
  return { type: "HANDLE_CONF_TXT_ERROR", payload };
}
export function checkOrderStatus(payload) {
  return function(dispatch) {
    orderStatus(payload).then(currStatus => {
      if (currStatus.data.status === "success") {
        dispatch(handleOrderStatus(currStatus.data.orderStatus));
      } else {
        dispatch(handleOrderError());
      }
    });
  };
}
export function submitOrder(payload) {
  return function(dispatch) {
    placeOrder(payload).then(orderResp => {
      if (orderResp.data.status === "success") {
        dispatch(paymentSuccess(orderResp.data));
      } else {
        dispatch(paymentFailure(orderResp.data));
      }
    });
  };
}
