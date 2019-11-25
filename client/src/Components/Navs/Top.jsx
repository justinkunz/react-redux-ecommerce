import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { toggleCheckout } from "../../actions";
import { bindActionCreators } from "redux";

class Navbar extends Component {
  render() {
    return (
      <AppBar position="fixed">
        <Toolbar className="nav nav__top">
          <Grid item>
            <Typography variant="h6">[LOGO]</Typography>
          </Grid>
          <Grid item xs />
          <Grid item>
            <Tooltip title="View Cart">
              <IconButton color="inherit">
                <Badge
                  badgeContent={this.props.checkout.cart.reduce(
                    (a, c) => a + c.quanity,
                    0
                  )}
                  color="primary"
                >
                  <ShoppingCartIcon
                    onClick={this.props.showCheckout}
                    className="nav--right"
                  />
                </Badge>
              </IconButton>
            </Tooltip>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ showCheckout: toggleCheckout }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
