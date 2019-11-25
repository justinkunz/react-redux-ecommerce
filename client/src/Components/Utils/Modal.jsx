import React, { Component } from "react";
import SweetAlert from "sweetalert2-react";
import { connect } from "react-redux";
import { hideSuccessAlert } from "../../actions";
import { bindActionCreators } from "redux";

class SuccessAlert extends Component {
  render() {
    const { type, show, title } = this.props.config.modal;
    let html;
    switch (type) {
      case "paymentSuccess":
        html = `<div>Your confirmation code is <span class="modal__focusTxt">${this.props.orders.conf}</span><div class="success__subtxt">You will recieve a confirmation email shortly</div></div>`;
        break;
      case "contactUs":
        html = `<div>Contact us at <span class="modal__focusTxt">${this.props.config.supportEmail}</span></div>`;
        break;
      default:
        html = "";
    }
    return (
      <SweetAlert
        show={show}
        title={title}
        html={html}
        onConfirm={this.props.hideSuccessAlert}
      />
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ hideSuccessAlert }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(SuccessAlert);
