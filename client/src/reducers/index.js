import { combineReducers } from "redux";
import shipping from "./shipping";
import checkout from "./checkout";
import config from "./config";
import orders from "./orders";
import "../prototypes";

const rootReducers = combineReducers({
  checkout,
  shipping,
  orders,
  config
});

export default rootReducers;
