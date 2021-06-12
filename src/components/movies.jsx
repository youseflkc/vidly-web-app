import React, { Component } from "react";
import "./movies.css";
import {
  getMovies,
  deleteMovie,
  getTotalMovies,
} from "../services/movieService";
import { paginate } from "../utils/paginate";
import Genres from "./genres";
import Pagination from "./pagination";
import MoviesTable from "./moviesTable";
import _ from "lodash";

export default class Movies extends Component {
  state = {
    movies: [],
    totalMovies: 0,
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "title", order: "asc" },
    filterGenre: "all",
    filteredMovies: [],
  };

  async componentDidMount() {
    const movies = await getMovies();
    const totalMovies = movies.length;
    this.setState({ movies, totalMovies, filteredMovies: movies });
  }

  handleNewMovie = () => {
    this.props.history.push("/movies/" + Date.now());
  };

  handleDelete = async (_id) => {
    const originalMovies = this.state.movies;
    this.setState({
      movies: await getMovies(),
      filteredMovies: await getMovies(),
      totalMovies: await getTotalMovies(),
    });

    try {
      await deleteMovie(_id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log("movie already deleted");
        this.setState({
          movies: originalMovies,
          filteredMovies: originalMovies,
          totalMovies: originalMovies.length,
        });
      }
    }

    if (this.state.filteredMovies.length <= this.state.pageSize) {
      this.setState({ currentPage: this.currentPage-- });
    }
  };

  handleSort = (sortPath) => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === sortPath) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = sortPath;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
  };

  handleFilterGenre = (genre) => {
    let movies = this.state.movies;
    if (!movies) return null;
    if (genre !== "all")
      movies = movies.filter((movie) => movie.genre.name === genre);
    this.setState({
      filterGenre: genre,
      filteredMovies: movies,
      currentPage: 1,
      totalMovies: movies.length,
    });
  };

  handleSearch = ({ target }) => {
    let search = target.value;
    let movies = this.state.movies;
    console.log(search);
    let searchedMovies = !search
      ? null
      : movies.filter((m) => m.title.toLowerCase().startsWith(search));
    this.handleFilterGenre("all");
    this.setState({ searchedMovies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleLike = (movie) => {
    let movies = this.state.movies;
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  renderHeader() {
    const totalMovies = this.state.totalMovies;
    if (totalMovies === 0) {
      return <h1>There are no movies in the database.</h1>;
    }
    return (
      <h1>Showing {this.state.filteredMovies.length} movies in database.</h1>
    );
  }

  renderTable() {
    let {
      pageSize,
      currentPage,
      filteredMovies: allMovies,
      sortColumn,
      searchedMovies,
    } = this.state;

    if (searchedMovies) {
      allMovies = searchedMovies;
    } else {
      allMovies = _.orderBy(allMovies, [sortColumn.path], [sortColumn.order]);
      allMovies = paginate(allMovies, currentPage, pageSize);
    }

    return this.state.totalMovies !== 0 ? (
      <MoviesTable
        movies={allMovies}
        onDelete={this.handleDelete}
        onLike={this.handleLike}
        onSort={this.handleSort}
        sortColumn={this.state.sortColumn}
      ></MoviesTable>
    ) : (
      ""
    );
  }

  render() {
    const { movies, pageSize, currentPage, filterGenre } = this.state;
    const totalMovies = movies.length || 0;

    return (
      <div className="container-custom">
        <Genres
          selectedGenre={filterGenre}
          onFilterGenre={this.handleFilterGenre}
        ></Genres>
        <div className="movies">
          <input
            type="text"
            placeholder="Search..."
            onKeyUp={this.handleSearch}
          ></input>
          <button onClick={this.handleNewMovie} className="btn btn-primary">
            New Movie
          </button>
          {this.renderHeader()}
          {this.renderTable()}
          <Pagination
            itemCount={totalMovies}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          ></Pagination>
        </div>
      </div>
    );
  }
}
