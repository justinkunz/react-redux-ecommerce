import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  toggleCheckout,
  toggleOrderCheck,
  showContactModal
} from "../../actions";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import ToolTip from "@material-ui/core/Tooltip";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import ShippingIcon from "@material-ui/icons/LocalShipping";

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  paper: {
    paddingBottom: 50
  },
  list: {
    marginBottom: theme.spacing(2)
  },
  subheader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
    backgroundColor: "#c9202f"
  }
}));

function Copyright(props) {
  return (
    <div className="nav__bottom__copyright">{props.title} &#9400; 2019</div>
  );
}
function BottomAppBar(props) {
  const classes = useStyles();
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar className="nav nav__bottom">
        <ToolTip title="Order Status">
          <IconButton color="inherit" onClick={props.toggleOrderCheck}>
            <ShippingIcon />
          </IconButton>
        </ToolTip>
        <ToolTip title="Contact Us">
          <IconButton
            edge="end"
            color="inherit"
            onClick={props.showContactModal}
          >
            <ContactSupportIcon />
          </IconButton>
        </ToolTip>
        <ToolTip title="View Cart">
          <Fab
            aria-label="add"
            className={classes.fabButton}
            onClick={props.showCheckout}
          >
            <ShoppingCartIcon />
          </Fab>
        </ToolTip>
        <div className={classes.grow} />
        {Copyright(props)}
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = state => {
  return state.config;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { showCheckout: toggleCheckout, toggleOrderCheck, showContactModal },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(BottomAppBar);
