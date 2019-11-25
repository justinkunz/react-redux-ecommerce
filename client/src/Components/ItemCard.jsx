import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { addToCart, toggleSnackbar } from "../actions";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: "2.5vh 10px",
    height: 450
  },
  media: {
    height: 225
  }
});

function MediaCard(props) {
  const classes = useStyles();
  const { img, title, name, desc, price, _id } = props;

  const handleClick = () => {
    props.addToCart(_id);
    props.toggleSnackbar({ show: true, msg: "Item Added to Cart" });
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={img} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {desc}
        </Typography>
      </CardContent>
      <CardActions>
        <div className="items__card__price">${price / 100}</div>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Button onClick={handleClick} size="small" color="primary">
            Add to Cart
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = state => {
  return { items: state.items, showSnackbar: state.config.showSnackbar };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addToCart, toggleSnackbar }, dispatch);
};
const ConnectedMediaCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaCard);

export default ConnectedMediaCard;
