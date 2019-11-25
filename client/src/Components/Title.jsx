import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getSiteInfo } from "../actions";

class AppTitle extends Component {
  componentDidMount() {
    this.props.getSiteInfo();
  }
  render() {
    return (
      <div className="title">
        <div className="title__text">{this.props.title}</div>
        <div className="title__text--sub">{this.props.tagline}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.config;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getSiteInfo }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AppTitle);
