import React, { Component } from "react";
import PokemonCard from "./PokemonCard.jsx";

class PokemonList extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.pokemons ? (
          <div className="row ">
            {this.props.pokemons.map(pokemon => (
              <PokemonCard
                name={pokemon.name}
                url={pokemon.url}
                key={pokemon.name}
              />
            ))}
          </div>
        ) : (
          <h1 className="loading">Loading</h1>
        )}
      </React.Fragment>
    );
  }
}

export default PokemonList;
