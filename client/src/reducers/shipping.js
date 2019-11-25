const initialShippingState = {
  firstName: {
    value: "",
    error: false,
    required: true
  },
  lastName: {
    value: "",
    error: false,
    required: true
  },
  addressLine1: {
    value: "",
    error: false,
    required: true
  },
  addressLine2: {
    value: "",
    error: false,
    required: false
  },
  city: {
    value: "",
    error: false,
    required: true
  },
  state: {
    value: "",
    error: false,
    required: true
  },
  zip: {
    value: "",
    error: false,
    required: true
  },
  email: {
    value: "",
    error: false,
    required: true
  },
  isFetching: false,
  validAddress: true,
  cost: {
    options: [],
    choosen: { total: 0 }
  }
};

export default (state = initialShippingState, action) => {
  switch (action.type) {
    case "TOGGLE_SHIPPING_LOADER":
      return { ...state, isFetching: !state.isFetching };
    case "HANDLE_ADR_VAL_RESULTS":
      const minShipping = Math.min.apply(
        Math,
        action.payload.map(t => t.total)
      );
      const minIndex = action.payload.partialMatch({
        total: minShipping
      });
      return {
        ...state,
        isFetching: false,
        cost: {
          options: action.payload,
          choosen: action.payload[minIndex]
        }
      };

    case "UPDATE_SHIPPING_TEXTBOX_VALUE":
      const { name, value } = action.payload.target;
      const error = state[name].error && value === "";

      return {
        ...state,
        [name]: {
          error,
          value
        }
      };
    case "UPDATE_TEXTBOX_ERROR":
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          error: true
        }
      };

    case "CHANGE_SHIPPING_OPTION":
      return {
        ...state,
        cost: {
          ...state.cost,
          choosen: state.cost.options.partialMatchItem({
            courier_id: action.payload
          })
        }
      };
    default:
      return state;
  }
};
