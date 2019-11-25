import { getInventory } from "../api";

export function addToCart(payload) {
  return { type: "ADD_TO_CART", payload };
}

export function removeFromCart(payload) {
  return { type: "REMOVE_FROM_CART", payload };
}

export function updateQuanity(payload) {
  return { type: "UPDATE_ITEM_QUANITY", payload };
}

export function toggleCheckout(payload) {
  return { type: "TOGGLE_CHECKOUT", payload };
}

export function updateInventory(payload) {
  return { type: "UPDATE_INVENTORY", payload };
}

export function updateCheckoutSection(payload) {
  return { type: "UPDATE_CHECKOUT_SECTION", payload };
}

export function getItems(payload) {
  return function(dispatch) {
    getInventory().then(inv => dispatch(updateInventory(inv.data)));
  };
}
