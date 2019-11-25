import React, { Component } from "react";
import { TextField, Tooltip } from "@material-ui/core";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateTextBox } from "../actions";

class Shipping extends Component {
  render() {
    const {
      addressLine1,
      addressLine2,
      city,
      state,
      firstName,
      lastName,
      zip,
      email,
      handleInputChange
    } = this.props;
    return (
      <form>
        <TextField
          error={firstName.error}
          required
          className="checkout__shipping__subAddress"
          name="firstName"
          value={firstName.value}
          onChange={handleInputChange}
          label="First Name"
          margin="normal"
        />
        <TextField
          error={lastName.error}
          required
          className="checkout__shipping__subAddress"
          name="lastName"
          value={lastName.value}
          onChange={handleInputChange}
          label="Last Name"
          margin="normal"
        />
        <TextField
          error={addressLine1.error}
          required
          fullWidth
          name="addressLine1"
          value={addressLine1.value}
          onChange={handleInputChange}
          label="Address Line 1"
          margin="dense"
        />

        <TextField
          error={addressLine2.error}
          fullWidth
          name="addressLine2"
          value={addressLine2.value}
          onChange={handleInputChange}
          label="Address Line 2"
          margin="dense"
        />

        <TextField
          error={city.error}
          className="checkout__shipping__subAddress"
          required
          name="city"
          value={city.value}
          onChange={handleInputChange}
          label="City"
          margin="normal"
        />

        <TextField
          error={state.error}
          className="checkout__shipping__subAddress"
          required
          name="state"
          value={state.value}
          onChange={handleInputChange}
          label="State"
          margin="normal"
        />
        <TextField
          error={zip.error}
          className="checkout__shipping__subAddress"
          required
          name="zip"
          value={zip.value}
          onChange={handleInputChange}
          label="Zip Code"
          margin="normal"
        />

        <Tooltip title="We wont spam you!">
          <TextField
            error={email.error}
            required
            className="checkout__shipping__subAddress"
            name="email"
            value={email.value}
            onChange={handleInputChange}
            label="Email Address"
            margin="normal"
          />
        </Tooltip>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return state.shipping;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleInputChange: updateTextBox }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
