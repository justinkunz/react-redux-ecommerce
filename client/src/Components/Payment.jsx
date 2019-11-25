import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleLoader, submitOrder } from "../actions";
import OrderReview from "./OrderReview";
import LoadingBtn from "./Utils/LoadingBtn";

import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe
} from "react-stripe-elements";

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: "#424770",
        letterSpacing: "0.025em",
        ...(padding ? { padding } : {})
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
};

class _Pay extends React.Component {
  handleSubmit = async ev => {
    ev.preventDefault();
    this.props.toggleLoader();
    const token = await this.props.stripe.createToken();
    const { checkout, shipping } = this.props;
    if (token.error) return this.props.toggleLoader();

    this.props.submitOrder({
      cart: checkout.cart.map(item => {
        return { id: item._id, qty: item.quanity };
      }),
      shipping: {
        option: shipping.cost.choosen.courier_id,
        adr: {
          addressLine1: shipping.addressLine1.value,
          addressLine2: shipping.addressLine2.value,
          city: shipping.city.value,
          state: shipping.state.value,
          zip: shipping.zip.value
        }
      },
      customer: {
        email: shipping.email.value,
        firstName: shipping.firstName.value,
        lastName: shipping.lastName.value
      },
      token: token.token
    });
  };
  render() {
    return (
      <React.Fragment>
        <OrderReview className="clearfix" />
        <div className="clearFix" />
        <form className="checkout__payment__form">
          <div className="checkout__payment__form--container">
            <CardElement {...createOptions(this.props.fontSize)} />
          </div>

          <LoadingBtn
            isFetching={this.props.orders.isFetching}
            clickHandler={this.handleSubmit}
            fetchingMsg={"Submitting. . ."}
            stableMsg={"Submit Order"}
          />
        </form>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ submitOrder, toggleLoader }, dispatch);
};
const CardForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(injectStripe(_Pay));

class Stripe extends React.Component {
  constructor() {
    super();
    this.state = {
      elementFontSize: window.innerWidth < 450 ? "14px" : "18px"
    };
  }
  render() {
    return (
      <StripeProvider apiKey={this.props.stripePublicKey}>
        <Elements>
          <CardForm />
        </Elements>
      </StripeProvider>
    );
  }
}

const mapStateToStripeProps = state => {
  return state.config;
};

export default connect(mapStateToStripeProps, null)(Stripe);
