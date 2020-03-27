import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import pokemon from "../../../sass/image/pokemon.svg";
import axios from "axios";

const ImagePokem = styled.img`
  width: 100px;
  height: 100px;
`;

const Card = styled.div`
  box-shadow: 2px 3px 10px 1px rgba(0, 0, 0, 0.75);
  transition: all 0.3s cubic-bezier(0.3, 1, 0.3, 1);
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: default;
  &:hover,
  &:visited,
  &:focus,
  &:link {
    text-decoration: none;
    color: black;
  }
`;

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

export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: " ",
    imageLoading: true,
    toManyRequests: false,
    types: []
  };

  async componentDidMount() {
    const name = this.props.name;
    const url = this.props.url;
    const pokemonIndex = url.split("/")[url.split("/").length - 2];

    const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemonIndex}.png?raw=true`;

    // https://pokeres.bastionbot.org/images/pokemon/${pokemonIndex}.png?raw=true    good picture
    // `https://projectpokemon.org/images/normal-sprite/${name}.gif`    giff
    // https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true    standart picture
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;

    //get pokemon info
    const pokemonRes = await axios.get(pokemonUrl);

    const types = pokemonRes.data.types.map(type => type.type.name);

    this.setState({
      types: types,
      name: name,
      imageUrl: imageUrl,
      pokemonIndex: pokemonIndex
    });
  }

  render() {
    return (
      <div className="col-md-4 mb-5 ml-auto ">
        <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
          <Card className="card mx-auto card-costum">
            <div className="card-header topBottomCard stage">
              <div className=""></div>
              <img src={pokemon} alt="" className="poceball-card blob" />
            </div>
            <div className="card-body mx-auto">
              {this.state.imageLoading ? <h4>Loading...</h4> : null}

              <ImagePokem
                className="card-img-top rounded mx-auto mt-2 mb-3 card-img-costum"
                src={this.state.imageUrl}
                onLoad={() => this.setState({ imageLoading: false })}
                onError={() => this.setState({ toManyRequests: true })}
              />

              <h6 className="card-title text-capitalize">{this.state.name}</h6>
              <div className="center">
                {this.state.types.map(type => (
                  <span
                    key={type}
                    className="badge badge-pill mr-2 text-capitalize badge-costum"
                    style={{
                      background: `#${colors_type[type]}`,
                      color: "white"
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </StyledLink>
      </div>
    );
  }
}
