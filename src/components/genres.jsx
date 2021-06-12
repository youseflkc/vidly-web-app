import React, { Component } from "react";
import { getGenres } from "../services/genreService";
import "./genres.css";

class Genres extends Component {
  state = { genres: [] };

  async componentDidMount() {
    const genres = await getGenres();
    this.setState({ genres });
  }

  render() {
    const { genres } = this.state;
    return (
      <div className="genres">
        <ul className="list-group">
          <li
            key="all"
            onClick={() => this.props.onFilterGenre("all")}
            className={
              this.props.selectedGenre === "all"
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            All Genres
          </li>
          {genres.map((genre) => {
            return (
              <li
                onClick={() => this.props.onFilterGenre(genre.name)}
                key={genre.id || genre.name}
                className={
                  this.props.selectedGenre === genre.name
                    ? "list-group-item active"
                    : "list-group-item"
                }
              >
                {genre.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Genres;
