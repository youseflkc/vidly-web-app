import "./App.css";
import React, { Component } from "react";
import Customers from "./components/customers";
import Movies from "./components/movies";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import { ToastContainer } from "react-toastify";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import EditMovie from "./components/editMovie";
import Logout from "./components/logout";
import { injectStyle } from "react-toastify/dist/inject-style";
import NewMovie from "./components/newMovie";

if (typeof window !== "undefined") {
  injectStyle();
}

class App extends Component {
  state = {};

  render() {
    return (
      <div>
        <ToastContainer />
        <NavBar user={this.state.user}></NavBar>
        <Switch>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/movies/new-movie" component={NewMovie}></Route>
          <Route path="/movies/:id" component={EditMovie}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/register-form" component={RegisterForm}></Route>
          <Redirect from="/" exact to="/movies"></Redirect>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect to="/not-found"></Redirect>
        </Switch>
      </div>
    );
  }
}

export default App;
