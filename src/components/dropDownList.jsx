import React, { Component } from "react";

const DropDownList = ({ name, label, options, error, onChange, value }) => {
  return (
    <div className="mb-2">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <select
        onChange={onChange}
        value={value}
        name={name}
        className="form-control"
        id={name}
      >
        <option value={0}></option>
        {options.map((option) => {
          return (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default DropDownList;
