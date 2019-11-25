import React, { Component, Fragment } from "react";
import { CircularProgress, Button } from "@material-ui/core";

class LoadingBtn extends Component {
  render() {
    const { isFetching, clickHandler, fetchingMsg, stableMsg } = this.props;
    return (
      <Button
        disabled={isFetching}
        className="actionBtn"
        onClick={clickHandler}
        variant="contained"
        color="primary"
      >
        {isFetching ? fetchingMsg : stableMsg}
        {isFetching ? (
          <CircularProgress className="actionBtn--loader" size={24} />
        ) : (
          <Fragment />
        )}
      </Button>
    );
  }
}

export default LoadingBtn;
