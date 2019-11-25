import React, { Fragment } from "react";
import { Drawer, TextField } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import LoadingBtn from "./Utils/LoadingBtn";
import { connect } from "react-redux";
import {
  toggleOrderCheck,
  updateConfTextBox,
  checkOrderStatus,
  handleConfTxtError,
  updateOrderFetching
} from "../actions";
import { bindActionCreators } from "redux";

class Checkout extends React.Component {
  render() {
    const {
      show,
      confTxt,
      toggleOrderCheck,
      updateConfTextBox,
      isFetching,
      orderStatus,
      updateOrderFetching,
      checkOrderStatus,
      handleConfTxtError,
      errorLocating
    } = this.props;

    const checkStatus = () => {
      if (!confTxt.value) {
        return handleConfTxtError();
      }
      updateOrderFetching();
      checkOrderStatus(confTxt.value);
    };

    return (
      <Drawer anchor="left" open={show}>
        <div className="orderStatus__arrow">
          <ArrowBack onClick={toggleOrderCheck} className="nav--left" />
        </div>
        <div className="orderStatus__form">
          <TextField
            error={confTxt.error}
            className="checkout__shipping__subAddress"
            required
            fullWidth
            name="state"
            value={confTxt.value}
            onChange={updateConfTextBox}
            label="Confirmation Number"
            margin="normal"
          />

          <div>
            <LoadingBtn
              isFetching={isFetching}
              clickHandler={checkStatus}
              fetchingMsg={"Checking Status"}
              stableMsg={"Check Order Status"}
            />
          </div>

          {errorLocating && !orderStatus ? (
            <div className="clearfix orderStatus__results">
              <div className="orderStatus__results--status">
                No Record Found
              </div>
            </div>
          ) : (
            <Fragment />
          )}
          {orderStatus ? (
            <div className="clearfix orderStatus__results">
              <div>Order Status:</div>
              <div className="orderStatus__results--status">{orderStatus}</div>
            </div>
          ) : (
            <Fragment />
          )}
        </div>
      </Drawer>
    );
  }
}

const mapDisatchToProps = dispatch => {
  return bindActionCreators(
    {
      toggleOrderCheck,
      updateConfTextBox,
      checkOrderStatus,
      updateOrderFetching,
      handleConfTxtError
    },
    dispatch
  );
};
const mapStateToProps = state => {
  return state.orders.statusChecker;
};

export default connect(mapStateToProps, mapDisatchToProps)(Checkout);
