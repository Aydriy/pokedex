import React, { Component } from "react";
import ball2 from "../../sass/image/ball2.png";
import Type from "./Type";

class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light navbar-custom fixed-top">
          <a className="navbar-brand" href="#">
            <img
              src={ball2}
              width="35"
              height="35"
              className="d-inline-block align-top ball"
              alt=""
            />
            <img
              src="https://fontmeme.com/permalink/200321/0ea46dc4ce09ee94d63a8925a3f90273.png"
              alt="pokemon-font"
              border="0"
            />
          </a>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-danger dropdown-toggle mr-5"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              All Types
            </button>
            <div className="dropdown-menu dropdown-costum">
              <Type />
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
