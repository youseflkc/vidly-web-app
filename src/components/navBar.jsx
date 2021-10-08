import { fromPairs } from "lodash";
import React, { Component } from "react";
import { NavLink, Router } from "react-router-dom";
import "../components/navbar.css";
import * as auth from "../services/authService";

class NavBar extends Component {
  state = {};

  getUser() {
    return auth.getCurrentUser();
  }

  render() {
    const user = this.getUser();
    return (
      <div className="navbar-container">
        <NavLink className="navbar-item" to="/movies">
          Movies
        </NavLink>
        <NavLink className="navbar-item" to="/customers">
          Customers
        </NavLink>
        <NavLink className="navbar-item" to="/rentals">
          Rentals
        </NavLink>
        {!user && (
          <React.Fragment>
            <NavLink className="navbar-item" to="/login">
              Login
            </NavLink>
            <NavLink className="navbar-item" to="/register-form">
              Register
            </NavLink>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <NavLink className="navbar-item" to="/logout">
              Logout
            </NavLink>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default NavBar;
