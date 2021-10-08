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
import { toast } from "react-toastify";

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
    this.props.history.push("/movies/new-movie");
  };

  errorMsg = () => {
    toast.dark("error");
  };

  handleDelete = async (_id) => {
    const originalMovies = this.state.movies;
    let newFilteredMovies = this.state.filteredMovies;
    try {
      await deleteMovie(_id);
      let newMovies = originalMovies.filter((m) => m._id !== _id);
      newFilteredMovies = newFilteredMovies.filter((m) => m._id !== _id);
      if (this.state.searchedMovies) {
        let newSearchedMovies = this.state.searchedMovies.filter(
          (m) => m._id !== _id
        );
        this.setState({ searchedMovies: newSearchedMovies });
      }
      this.setState({
        filteredMovies: newFilteredMovies,
        movies: newMovies,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("Error: Movie already deleted.");
        this.setState({
          movies: originalMovies,
          filteredMovies: originalMovies,
          totalMovies: originalMovies.length,
        });
      } else if (ex.response && ex.response.status === 400) {
        toast.error("Error: Unauthorized access.");
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
    if (genre !== "all") {
      movies = movies.filter((movie) => movie.genre.name === genre);
    }
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
    let searchedMovies = null;
    let totalMovies = movies.length;
    if (search) {
      this.handleFilterGenre("all");
      let searchedMovies = movies.filter((m) =>
        m.title.toLowerCase().startsWith(search)
      );
      totalMovies = searchedMovies.length;
      this.setState({ searchedMovies, totalMovies });
    } else {
      searchedMovies = null;
      this.setState({ searchedMovies, totalMovies: movies.length });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  renderHeader() {
    const totalMovies = this.state.totalMovies;
    if (totalMovies === 0) {
      return <h1>There are no movies in the database.</h1>;
    }
    return <h1>Showing {totalMovies} movies in database.</h1>;
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
    const { filteredMovies, pageSize, currentPage, filterGenre, totalMovies } =
      this.state;

    return (
      <div className="container-custom">
        <Genres
          selectedGenre={filterGenre}
          onFilterGenre={this.handleFilterGenre}
        ></Genres>
        <div className="movies">
          <div className="search">
            <input
              type="text"
              placeholder="Search..."
              onKeyUp={this.handleSearch}
            ></input>
          </div>
          {this.renderHeader()}
          {this.renderTable()}
          <Pagination
            itemCount={totalMovies}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          ></Pagination>
          <button
            onClick={this.handleNewMovie}
            className="btn btn-primary create"
          >
            New Movie
          </button>
        </div>
      </div>
    );
  }
}
