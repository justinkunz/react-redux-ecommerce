import React, { Fragment, Component } from "react";
import TopNav from "./Components/Navs/Top";
import BottomNav from "./Components/Navs/Bottom";
import Checkout from "./Containers/Checkout";
import Items from "./Containers/Items";
import Title from "./Components/Title";
import BottomAlert from "./Components/Utils/BottomAlert";
import Modal from "./Components/Utils/Modal";
import OrderStatus from "./Components/OrderStatus";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Modal />
        <OrderStatus />
        <Checkout />
        <TopNav />
        <Title />
        <Items />
        <BottomAlert />
        <BottomNav />
      </Fragment>
    );
  }
}

export default App;
