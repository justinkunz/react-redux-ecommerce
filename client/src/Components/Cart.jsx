import React from "react";
import { connect } from "react-redux";
import {
  updateTextBox,
  updateCheckoutSection,
  removeFromCart,
  updateQuanity
} from "../actions";
import {
  TableHead,
  TableBody,
  Table,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
  Select,
  MenuItem
} from "@material-ui/core";
import { bindActionCreators } from "redux";
import "../prototypes";

class Cart extends React.Component {
  render() {
    const { cart } = this.props;
    const total = cart.reduce((a, c) => a + parseInt(c.price * c.quanity), 0);

    if (this.props.cart.length === 0) {
      return <div className="checkout__cart--empty">Your cart is empty :(</div>;
    }

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell />
            <TableCell align="right">Quanity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell
              align="right"
              className="checkout__cart__delete--desktopOnly"
            >
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map(item => (
            <TableRow key={item._id}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell>
                <Tooltip title="Remove Item From Cart">
                  <IconButton
                    onClick={() => this.props.removeFromCart(item._id)}
                  >
                    <div className="checkout__cart__delete">REMOVE</div>
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell align="right">
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={item.quanity}
                  onChange={e => {
                    this.props.updateQuanity({
                      _id: item._id,
                      quanity: e.target.value
                    });
                  }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                </Select>
              </TableCell>
              <TableCell align="right">
                ${(item.price / 100).toFixed(2)}
              </TableCell>
              <TableCell
                align="right"
                className="checkout__cart__delete--desktopOnly"
              >
                ${(item.quanity * (item.price / 100)).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2} align="right">
              Total
            </TableCell>
            <TableCell align="right">${(total / 100).toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = state => {
  return state.checkout;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleInputChange: updateTextBox,
      updateCheckoutSection,
      removeFromCart,
      updateQuanity
    },
    dispatch
  );
};

const connectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default connectedCart;
