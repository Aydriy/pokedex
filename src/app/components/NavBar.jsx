import React, { Component } from "react";
import ball2 from "../../sass/image/ball2.png";

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
        </nav>
      </div>
    );
  }
}

export default NavBar;
