import React, { Component } from "react";

class FilterBar extends Component {
  render() {
    const { users, getUsers } = this.props;
    return (
      <div className="level is-mobile">
        <div className="level-left">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Founders</p>
              <p className="subtitle">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="level-right">
          <p className="level-item">
            <a
              onClick={() => {
                getUsers("all");
              }}
            >
              All
            </a>
          </p>
          <p className="level-item">
            <a
              onClick={() => {
                getUsers("true");
              }}
            >
              Technical
            </a>
          </p>
          <p className="level-item ">
            <a
              onClick={() => {
                getUsers("false");
              }}
            >
              Non-Technical
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default FilterBar;
