import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleSnackbar } from "../../actions";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

class BottomAlert extends Component {
  render() {
    return (
      <Snackbar
        className="snackbar"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={this.props.showSnackbar}
        autoHideDuration={3000}
        onClose={e => {
          if (!e) {
            this.props.toggleSnackbar(false);
          }
        }}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={this.props.snackbarTxt}
        action={[
          <IconButton
            onClick={() => this.props.toggleSnackbar(false)}
            key="close"
            aria-label="close"
            color="inherit"
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }
}

const mapStateToProps = state => {
  return state.config;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ toggleSnackbar }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomAlert);
