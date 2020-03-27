import React, { Component } from "react";
import axios from "axios";

const colors_type = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "BB2F27",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6",
  shadow: "3F4171",
  unknown: "3C3837"
};

class TypeList extends Component {
  state = {
    url: "http://pokeapi.co/api/v2/type/?limit=999",
    typeList: []
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ typeList: res.data["results"] });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.typeList ? (
          <div className=" col">
            {this.state.typeList.map(typeList => (
              <div
                key={typeList.name}
                className="badge badge-pill mr-3 mb-1 text-capitalize badge-costum-type"
                style={{
                  background: `#${colors_type[typeList.name]}`,
                  color: "white"
                }}
              >
                <a className="dropdown-item dropdown-item-costum" href="#">
                  {typeList.name}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="loading">Loading</h1>
        )}
      </React.Fragment>
    );
  }
}

export default TypeList;
