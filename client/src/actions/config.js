import { getConfig } from "../api";

export function updateSiteInfo(payload) {
  return { type: "UPDATE_SITE_INFO", payload };
}

export function hideSuccessAlert(payload) {
  return { type: "HIDE_PAYMENT_SUCCESS", payload };
}

export function showContactModal(payload) {
  return { type: "SHOW_CONTACT_MODAL", payload };
}
export function toggleSnackbar(payload) {
  return { type: "TOGGLE_SNACKBAR", payload };
}

export function getSiteInfo(payload) {
  return function(dispatch) {
    getConfig().then(siteInfo => dispatch(updateSiteInfo(siteInfo.data)));
  };
}
