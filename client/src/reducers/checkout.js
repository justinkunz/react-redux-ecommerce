import "../prototypes";

const defaultExpand = {
  cart: true,
  shipping: false,
  payment: false,
  shippingOptions: false
};
const initialCheckoutState = {
  open: false,
  cart: [],
  expand: defaultExpand,
  items: []
};

export default (state = initialCheckoutState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const itemIndex = state.items.partialMatch({ _id: action.payload });
      const currentCartIndex = state.cart.partialMatch({ _id: action.payload });

      const newCart = [...state.cart];
      if (currentCartIndex === -1) {
        newCart.push({
          ...state.items[itemIndex],
          quanity: 1
        });
      } else {
        newCart[currentCartIndex].quanity++;
      }
      return {
        ...state,
        cart: newCart
      };
    case "REMOVE_FROM_CART":
      const cartIndex = state.cart.partialMatch({ _id: action.payload });
      const cart = [...state.cart];
      cart.splice(cartIndex, 1);

      return {
        ...state,
        cart
      };
    case "TOGGLE_CHECKOUT":
      return {
        ...state,
        expand: defaultExpand,
        open: !state.open
      };
    case "UPDATE_INVENTORY":
      return { ...state, items: action.payload };
    case "UPDATE_ITEM_QUANITY":
      const itemCartIndex = state.cart.partialMatch({
        _id: action.payload._id
      });
      const updatedQuanityCart = [...state.cart];
      updatedQuanityCart[itemCartIndex].quanity = action.payload.quanity;
      return { ...state, cart: updatedQuanityCart };
    case "UPDATE_CHECKOUT_SECTION":
      const closedSections = { ...defaultExpand, cart: false };
      const updatedSection =
        action.payload === "shippingOptions"
          ? { shippingOptions: !state.expand.shippingOptions, payment: true }
          : { [action.payload]: true };

      return {
        ...state,
        expand: { ...closedSections, ...updatedSection }
      };

    case "HANDLE_ADR_VAL_RESULTS":
      return {
        ...state,
        expand: { ...defaultExpand, cart: false, payment: true }
      };

    case "PAYMENT_SUCCESS":
      return {
        ...initialCheckoutState,
        items: state.items
      };
    default:
      return state;
  }
};
