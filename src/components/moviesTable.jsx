import React, { Component } from "react";
import Like from "./like";
import TableBody from "./tableBody";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "dailyRentalRate", label: "Rate" },
    { path: "numberInStock", label: "Stock" },
    {
      key: "like",
      content: (movie) => {
        return (
          <Like
            liked={movie.liked}
            onLike={() => this.props.onLike(movie)}
          ></Like>
        );
      },
    },
    {
      key: "delete",
      content: (movie) => {
        return (
          <button
            onClick={() => this.props.onDelete(movie._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        );
      },
    },
  ];

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) {
      return null;
    } else if (sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc"></i>;
    }
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    const { movies, onSort, onDelete, onLike: _onLike } = this.props;
    return (
      <table className="table">
        <thead>
          <tr key={"movieHeader"}>
            {this.columns.map((column) => {
              return (
                <th
                  style={{ cursor: "pointer" }}
                  key={column.path || column.key}
                  onClick={() => this.props.onSort(column.path)}
                >
                  {column.label || ""} {this.renderSortIcon(column)}
                </th>
              );
            })}
          </tr>
        </thead>

        <TableBody data={movies} columns={this.columns}></TableBody>
      </table>
    );
  }
}

export default MoviesTable;
