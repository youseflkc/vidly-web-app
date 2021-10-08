import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

export default class Pagination extends Component {
  renderPages() {
    const { itemCount, pageSize, onPageChange } = this.props;
    const numberOfPages = Math.ceil(itemCount / pageSize);
    const pages = _.range(1, numberOfPages + 1);

    if (numberOfPages === 1) {
      return "";
    }
    return pages.map((page) => {
      return (
        <li
          key={page}
          className={
            page === this.props.currentPage ? "page-item active" : "page-item"
          }
        >
          <a
            className="page-link"
            style={{ cursor: "pointer" }}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      );
    });
  }

  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">{this.renderPages()}</ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
