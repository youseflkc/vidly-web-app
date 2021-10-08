import Joi from "joi-browser";
import React, { Component } from "react";
import Form from "./form";
import * as userService from "../services/userService";
import { login } from "../services/authService";
class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username").email(),
    password: Joi.string().required().label("Password").min(5),
    name: Joi.string().required().label("name"),
  };

  async doSubmit() {
    try {
      await userService.registerUser(this.state.data);
      await login(this.state.data.username, this.state.data.password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", true, "email")}
          {this.renderInput("password", "Password", false, "password")}
          {this.renderInput("name", "Name", false)}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
