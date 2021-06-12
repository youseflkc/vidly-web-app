import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../components/input";
import DropDownList from "./dropDownList";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors === null) {
      this.doSubmit();
    }
  };

  handleChange = ({ currentTarget: input }) => {
    let errors = this.state.errors;
    let errorMessage = this.validateProperty(input);

    if (errorMessage) {
      errors[input.id] = errorMessage;
    } else {
      delete errors[input.id];
    }

    let data = this.state.data;
    data[input.id] = input.value;
    this.setState({ data, errors });
  };

  validateProperty = ({ id, value }) => {
    const obj = { [id]: value };
    const schema = { [id]: this.schema[id] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    let options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  renderButton(label) {
    return (
      <button
        onClick={this.handleSubmit}
        disabled={this.validate()}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, focus = false, type = "text") {
    const { data, errors } = { ...this.state };

    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        autoFocus={focus}
        error={errors[name]}
      ></Input>
    );
  }
}

export default Form;
