import { rest } from "lodash";
import React, { Component } from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="mb-2">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input {...rest} className="form-control" id={name}></input>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
