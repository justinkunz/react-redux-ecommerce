const initialSiteConfig = {
  title: "",
  tagline: "",
  supportEmail: "",
  stripePublicKey: "",
  modal: {
    show: false,
    type: "",
    title: ""
  },
  showSnackbar: false,
  showOrderStatus: false
};

export default (state = initialSiteConfig, action) => {
  switch (action.type) {
    case "UPDATE_SITE_INFO":
      return { ...state, ...action.payload };
    case "PAYMENT_SUCCESS":
      return {
        ...state,
        modal: { show: true, type: "paymentSuccess", title: "Order Placed!" }
      };
    case "SHOW_CONTACT_MODAL":
      return {
        ...state,
        modal: { show: true, type: "contactUs", title: "Contact Us!" }
      };
    case "TOGGLE_SNACKBAR":
      if (action.payload.show && state.showSnackbar) return state;
      return {
        ...state,
        showSnackbar: action.payload.show,
        snackbarTxt: action.payload.msg
      };
    case "PAYMENT_FAILURE":
      return {
        ...state,
        showSnackbar: true,
        snackbarTxt: "There was an issue accepting this card"
      };
    case "TOGGLE_ORDER_CHECK":
      return {
        ...state,
        showOrderStatus: !state.showOrderStatus
      };
    case "HIDE_PAYMENT_SUCCESS":
      return {
        ...state,
        modal: {
          ...state.modal,
          show: false
        }
      };
    default:
      return state;
  }
};
