import React from "react";
import { bindActionCreators } from "redux";
import { changeShipping, updateCheckoutSection } from "../actions";
import { connect } from "react-redux";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class OrderReview extends React.Component {
  render() {
    const { checkout, shipping } = this.props;
    const subTotal = checkout.cart.reduce(
      (a, c) => a + parseInt(c.price * c.quanity),
      0
    );
    const tax = subTotal * 0.07;
    const shippingCost = shipping.cost.choosen.total;
    const total = subTotal + tax + shippingCost;

    const { expand } = this.props.checkout;

    return (
      <div className="checkout__payment__review--container">
        {/* Subtotal */}
        <ExpansionPanel expanded={false} className="checkout__payment__review">
          <ExpansionPanelSummary
            expandIcon={
              <ExpandMoreIcon className="checkout__payment__review__expand--hidden" />
            }
          >
            <div className="checkout__payment__review--left">Subtotal</div>
            <div className="checkout__payment__review--right">
              ${(subTotal / 100).toFixed(2)}
            </div>
          </ExpansionPanelSummary>
        </ExpansionPanel>

        {/* Tax */}
        <ExpansionPanel expanded={false} className="checkout__payment__review">
          <ExpansionPanelSummary
            expandIcon={
              <ExpandMoreIcon className="checkout__payment__review__expand--hidden" />
            }
          >
            <div className="checkout__payment__review--left">Tax</div>
            <div className="checkout__payment__review--right">
              ${(tax / 100).toFixed(2)}
            </div>
          </ExpansionPanelSummary>
        </ExpansionPanel>

        {/* Shipping */}
        <ExpansionPanel
          expanded={expand.shippingOptions}
          className={expand.shippingOptions ? "" : "checkout__payment__review"}
        >
          <ExpansionPanelSummary
            expandIcon={
              <ExpandMoreIcon
                onClick={() =>
                  this.props.updateCheckoutSection("shippingOptions")
                }
              />
            }
          >
            <div className="checkout__payment__review--left">Shipping</div>
            <div className="checkout__payment__review--right">
              ${(shippingCost / 100).toFixed(2)}
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={expand.shippingOptions ? "" : "checkout--hide"}
          >
            <RadioGroup value={shipping.cost.choosen.courier_id}>
              {shipping.cost.options.map(opt => {
                return (
                  <React.Fragment>
                    <FormControlLabel
                      value={opt.courier_id}
                      checked={
                        opt.courier_id === shipping.cost.choosen.courier_id
                      }
                      onClick={() => this.props.changeShipping(opt.courier_id)}
                      control={<Radio />}
                      label={`${opt.courier} - $${(opt.total / 100).toFixed(
                        2
                      )}`}
                    />
                    <span className="checkout__payment__review__shipping__time">
                      ( {opt.timeframe.days.min_delivery_time} to{" "}
                      {opt.timeframe.days.max_delivery_time} business days)
                    </span>
                  </React.Fragment>
                );
              })}
            </RadioGroup>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        {/* Total */}
        <ExpansionPanel expanded={false} className="checkout__payment__review">
          <ExpansionPanelSummary
            expandIcon={
              <ExpandMoreIcon className="checkout__payment__review__expand--hidden" />
            }
          >
            <div className="checkout__payment__review--left">Total</div>
            <div className="checkout__payment__review--right">
              ${(total / 100).toFixed(2)}
            </div>
          </ExpansionPanelSummary>
        </ExpansionPanel>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { changeShipping, updateCheckoutSection },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderReview);
