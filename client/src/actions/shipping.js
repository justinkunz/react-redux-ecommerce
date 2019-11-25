import { validateAddress } from "../api";

export function toggleShippingLoader(payload) {
  return { type: "TOGGLE_SHIPPING_LOADER", payload };
}

export function changeShipping(payload) {
  return { type: "CHANGE_SHIPPING_OPTION", payload };
}

export function updateTextboxError(payload) {
  return { type: "UPDATE_TEXTBOX_ERROR", payload };
}

export function updateTextBox(payload) {
  return { type: "UPDATE_SHIPPING_TEXTBOX_VALUE", payload };
}

export function toggleOrderCheck(payload) {
  return { type: "TOGGLE_ORDER_CHECK", payload };
}

export function handleAdrValResults(payload) {
  return { type: "HANDLE_ADR_VAL_RESULTS", payload };
}

export function validateAdr(payload) {
  console.log("validating adr");
  return function(dispatch) {
    return validateAddress(payload).then(addressInfo =>
      dispatch(handleAdrValResults(addressInfo.data))
    );
  };
}
