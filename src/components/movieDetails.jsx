import React, { Component } from "react";

export default class MovieDetails extends Component {
  state = {};
  handleSave = () => {
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>{this.props.match.params.id}</h1>
        <button onClick={this.handleSave} className="btn-primary">
          Save
        </button>
      </div>
    );
  }
}
