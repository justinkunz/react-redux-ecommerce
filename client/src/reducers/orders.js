const defaultStatusChecker = {
  show: false,
  isFetching: false,
  orderStatus: "",
  errorLocating: false,
  confTxt: {
    value: "",
    error: false
  }
};
const initialOrderState = {
  isFetching: false,
  conf: "",
  statusChecker: defaultStatusChecker
};

export default (state = initialOrderState, action) => {
  switch (action.type) {
    case "TOGGLE_LOADER":
      return { ...state, isFetching: !state.isFetching };
    case "PAYMENT_SUCCESS":
      return { ...initialOrderState, conf: action.payload.conf };
    case "TOGGLE_ORDER_CHECK":
      return {
        ...state,
        statusChecker: {
          ...defaultStatusChecker,
          show: !state.statusChecker.show
        }
      };
    case "UPDATE_CONF_TXT_BOX":
      return {
        ...state,
        statusChecker: {
          ...state.statusChecker,
          confTxt: {
            value: action.payload.target.value,
            error: action.payload ? false : state.statusChecker.confTxt.error
          }
        }
      };
    case "HANDLE_CONF_TXT_ERROR": {
      return {
        ...state,
        statusChecker: {
          ...state.statusChecker,
          confTxt: {
            ...state.statusChecker.confTxt,
            error: true
          }
        }
      };
    }
    case "HANDLE_ORDER_ERROR": {
      return {
        ...state,
        statusChecker: {
          ...state.statusChecker,
          errorLocating: true,
          isFetching: false,
          orderStatus: ""
        }
      };
    }
    case "TOGGLE_ORDER_FETCHING": {
      return {
        ...state,
        statusChecker: {
          ...state.statusChecker,
          isFetching: !state.statusChecker.isFetching
        }
      };
    }
    case "HANDLE_ORDER_STATUS_RESPONSE": {
      return {
        ...state,
        statusChecker: {
          ...state.statusChecker,
          orderStatus: action.payload,
          isFetching: false,
          errorLocating: false
        }
      };
    }
    case "PAYMENT_FAILURE":
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};
