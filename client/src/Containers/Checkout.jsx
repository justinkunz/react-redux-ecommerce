import React from "react";
import {
  Drawer,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Button
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowBack from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import Cart from "../Components/Cart";
import Shipping from "../Components/Shipping";
import Payment from "../Components/Payment";
import LoadingBtn from "../Components/Utils/LoadingBtn";
import { connect } from "react-redux";
import {
  toggleCheckout,
  updateCheckoutSection,
  updateTextboxError,
  toggleShippingLoader,
  validateAdr
} from "../actions";
import { bindActionCreators } from "redux";

class Checkout extends React.Component {
  render() {
    const isEmpty = this.props.checkout.cart.length === 0;

    const validateAddress = async () => {
      const { shipping } = this.props;
      const empty = Object.keys(shipping).filter(
        txtBox => shipping[txtBox].required && shipping[txtBox].value === ""
      );
      if (empty.length === 0) {
        this.props.toggleShippingLoader();
        this.props.validateAdr({ destZip: this.props.shipping.zip.value });
      } else {
        empty.forEach(txtBox => this.props.updateTextboxError(txtBox));
      }
    };

    const updateSection = section => {
      if (!isEmpty) this.props.updateCheckoutSection(section);
    };
    const { expand, open } = this.props.checkout;

    return (
      <Drawer anchor="right" open={open}>
        <div>
          <IconButton color="inherit" onClick={this.props.hideCheckout}>
            <ArrowBack className="nav--right" />
          </IconButton>
          <ExpansionPanel expanded={expand.cart}>
            <ExpansionPanelSummary
              expandIcon={
                <ExpandMoreIcon onClick={() => updateSection("cart")} />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Your Cart</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Cart />
            </ExpansionPanelDetails>
            <Button
              disabled={isEmpty}
              className="checkout__sectionBtn"
              onClick={() => updateSection("shipping")}
              variant="contained"
              color="primary"
            >
              Shipping Details
            </Button>
          </ExpansionPanel>
          <ExpansionPanel expanded={expand.shipping}>
            <ExpansionPanelSummary
              expandIcon={
                <ExpandMoreIcon onClick={() => updateSection("shipping")} />
              }
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Shipping</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Shipping />
            </ExpansionPanelDetails>
            <LoadingBtn
              isFetching={this.props.shipping.isFetching}
              clickHandler={validateAddress}
              fetchingMsg={"Verifying Address. . ."}
              stableMsg={"Review & Pay"}
            />
          </ExpansionPanel>
          <ExpansionPanel expanded={expand.payment}>
            <ExpansionPanelSummary
              expandIcon={
                <ExpandMoreIcon onClick={() => updateSection("payment")} />
              }
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Payment</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
              className="checkout__payment__panel"
              expanded={expand.pay}
            >
              <Payment />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Drawer>
    );
  }
}

const mapDisatchToProps = dispatch => {
  return bindActionCreators(
    {
      hideCheckout: toggleCheckout,
      updateCheckoutSection,
      updateTextboxError,
      toggleShippingLoader,
      validateAdr
    },
    dispatch
  );
};
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, mapDisatchToProps)(Checkout);
