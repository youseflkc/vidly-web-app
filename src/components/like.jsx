import React, { Component } from "react";
import "./like.css";

class Like extends Component {
  getHeartClass() {
    if (this.props.liked) {
      return "fa-heart";
    }
    return "fa-heart-o";
  }

  render() {
    return (
      <i
        onClick={this.props.onLike}
        className={"fa fa-2x like " + this.getHeartClass()}
      ></i>
    );
  }
}

export default Like;
