import React, { Component } from "react";
import ItemCard from "../Components/ItemCard";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getItems } from "../actions";
import { bindActionCreators } from "redux";

class Items extends Component {
  componentDidMount() {
    this.props.getItems();
  }
  render() {
    return (
      <div className="items">
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          {this.props.inventory.map(p => {
            return (
              <ItemCard
                img={p.image}
                name={p.name}
                desc={p.desc}
                price={p.price}
                key={p._id}
                _id={p._id}
                addToCart={this.props.addToCart}
              />
            );
          })}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { inventory: state.checkout.items };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getItems }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Items);
