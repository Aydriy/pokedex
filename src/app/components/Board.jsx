import React, { Component } from "react";
import PokemonList from "../components/pokemon/PokemonList.jsx";
import ButtonLeadMore from "./ButtonLeadMore.jsx";

export default class Board extends Component {
  render() {
    return (
      <div className="container">
        <div className="row ">
          <div className="col ">
            <PokemonList pokemons={this.props.pokemons} />
          </div>
        </div>

        <div className="d-flex justify-content-center btn-load">
          <ButtonLeadMore getMore={this.props.getMore} />
        </div>
      </div>
    );
  }
}
