import React, { Component } from "react";
import Form from "./form";
import { getGenres } from "../services/genreService";
import DropDownList from "./dropDownList";
import { createMovie, getMovie, saveMovie } from "../services/movieService";
import Joi from "joi-browser";
import { toast } from "react-toastify";

class NewMovie extends Form {
  state = {
    data: {
      title: "",
      genre: { name: "", _id: "" },
      numberInStock: "",
      dailyRentalRate: 0,
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi,
    __v: Joi,
    title: Joi.string().required().label("Title"),
    genre: Joi.required(),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  async componentDidMount() {
    const genres = await getGenres();
    this.setState({ genres });
  }

  handleGenreChange = ({ currentTarget: input }) => {
    let errors = this.state.errors;
    let errorMessage = this.validateProperty(input);

    if (errorMessage) {
      errors[input.id] = errorMessage;
    } else {
      delete errors[input.id];
    }

    let data = this.state.data;
    data[input.id] = this.state.genres.find((g) => g._id === input.value);
    this.setState({ data, errors });
  };

  doSubmit = async () => {
    try {
      await createMovie(this.state.data);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Error: Unauthorized Access.");
      }
    }
  };

  renderDropDownList(name, label, value, options) {
    const { data, errors } = { ...this.state };
    return (
      <DropDownList
        name={name}
        label={label}
        value={value}
        onChange={this.handleGenreChange}
        options={options}
        error={errors[name]}
      ></DropDownList>
    );
  }
  render() {
    const { data, genres } = this.state;
    return (
      <div className="container">
        <h1 className="title">Movie Form</h1>
        <form>
          {this.renderInput("title", "Title", true)}
          {this.renderDropDownList("genre", "Genre", data.genre._id, genres)}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default NewMovie;
