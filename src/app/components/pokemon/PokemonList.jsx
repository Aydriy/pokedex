import React, { Component } from "react";
import PokemonCard from "./PokemonCard.jsx";
import axios from "axios";

class PokemonList extends Component {
  state = {
    url: "http://pokeapi.co/api/v2/pokemon/?limit=12",
    pokemon: null
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data["results"] });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.pokemon ? (
          <div className="row">
            {this.state.pokemon.map(pokemon => (
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
