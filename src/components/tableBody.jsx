import _, { random } from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class TableBody extends Component {


  renderCell(item, column) {
    if (column.content) {
      return column.content(item);
    }
    if (column.path === "title") {
      return <Link to={"/movies/" + item._id}>{_.get(item, column.path)}</Link>;
    }
    return _.get(item, column.path);
  }

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item._id || item.title} className="delete-animation">
              {columns.map((column) => {
                return (
                  <td key={column.key || column.path}>
                    {this.renderCell(item, column)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default TableBody;
