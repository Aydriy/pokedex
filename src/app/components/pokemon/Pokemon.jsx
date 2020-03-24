import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CardPokemon = styled.div`
  box-shadow: 2px 3px 10px 1px rgba(0, 0, 0, 0.75);
`;

const colors_type = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "823551D",
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
  water: "3295F6"
};

const colors_background = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5"
};

export default class Pokemon extends Component {
  state = {
    name: "",
    pokemonIndex: "",
    imageUrl: "",
    types: [],
    description: "",
    stats: {
      attack: "",
      defense: "",
      hp: "",
      specialAttack: "",
      specialDefense: "",
      speed: ""
    },
    weight: "",
    moves: [],
    themeColor: "",
    statTitleWidth: 3,
    statBarWidth: 9
  };

  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;

    // Urls for pokemon information
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    //get pokemon info
    const pokemonRes = await axios.get(pokemonUrl);
    const name = pokemonRes.data.name;
    this.setState({ name });
    // const imageUrl = pokemonRes.data.sprites.front_default;
    const imageUrl = `https://projectpokemon.org/images/normal-sprite/${name}.gif`;
    let { attack, defense, hp, specialAttack, specialDefense, speed } = "";
    pokemonRes.data.stats.map(stat => {
      switch (stat.stat.name) {
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "hp":
          hp = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
      }
    });
    //in hectogram to kilogram
    const weight =
      Math.round((pokemonRes.data.weight * 0.1 + 0.0001) * 100) / 100;

    const types = pokemonRes.data.types.map(type => type.type.name);
    const themeColor = `${colors_type[types[types.length - 1]]}`;
    const bgColor = `${colors_background[types[types.length - 1]]}`;

    const abilities = pokemonRes.data.abilities
      .map(ability => {
        return ability.ability.name
          .toLowerCase()
          .split("-")
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(", ");
    const moves = pokemonRes.data.moves
      .map(move => {
        return move.move.name
          .toLowerCase()
          .split("-")
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(" ");
    const evs = pokemonRes.data.stats
      .filter(stat => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map(stat => {
        return `${stat.effort} ${stat.stat.name}`
          .toLowerCase()
          .split("-")
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(", ");

    await axios.get(pokemonSpeciesUrl).then(res => {
      let description = "";
      res.data.flavor_text_entries.some(flavor => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return;
        }
      });
      this.setState({
        description
      });

      this.setState({
        imageUrl,
        pokemonIndex,
        name,
        types,
        stats: {
          attack,
          defense,
          hp,
          specialAttack,
          specialDefense,
          speed
        },
        weight,
        moves,
        evs,
        abilities,
        themeColor,
        bgColor
      });
    });
  }
  render() {
    return (
      <div className="col">
        <div
          className="btn-group btn-back"
          role="group"
          aria-label="Basic example"
        >
          <Link to="/#" label="board">
            <button type="button" className="btn btn-secondary">
              Back
            </button>
          </Link>
        </div>

        <CardPokemon
          className="card mx-auto card-pokemon"
          style={{
            backgroundColor: `${this.state.bgColor}`
          }}
        >
          {this.state.types.map(type => (
            <div
              className="card-header pokemon-header"
              key={type}
              style={{
                background: `#${colors_type[type]}`
              }}
            ></div>
          ))}

          <div className="card-body mx-auto">
            <div className="image-container">
              <img
                className="card-img-top rounded mx-auto mt-2 mb-3 img-pokem"
                src={this.state.imageUrl}
              />
            </div>

            <h6 className="card-title text-capitalize name-pokemon">
              {this.state.name}
              <span className="number">
                #{this.state.pokemonIndex.toString().padStart(3, "0")}
              </span>
            </h6>
          </div>
          <div className="card-body d-flex body-pokemon">
            <div className="row align-items-center">
              <div className="col-md-9 container-species">
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                    Type
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="type-pokem">
                      {this.state.types.map(type => (
                        <span
                          key={type}
                          className="badge badge-pill mr-2 text-capitalize badge-costum-pokemon"
                          style={{
                            background: `#${colors_type[type]}`
                          }}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                    Attack
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.attack}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.attack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                    Defense
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.defense}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.defense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                    HP
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.hp}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.hp}</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                    Sp Atk
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.specialAttack}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow={this.state.stats.specialAttack}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.specialAttack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                    Sp Def
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.specialDefense}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow={this.state.stats.specialDefense}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.specialDefense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                    Speed
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.speed}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.speed}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                    Weight
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="">
                      <h6 className="">{this.state.weight} kg</h6>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                    Total moves
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="">
                      <h6 className="">{this.state.moves.length} </h6>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col mt-1 ">
                  <div className=" description">
                    <p
                      style={{
                        color: `#${this.state.themeColor}`
                      }}
                    >
                      Description:
                    </p>
                    <p className="">{this.state.description}</p>
                  </div>
                  <div className="">
                    <p
                      style={{
                        color: `#${this.state.themeColor}`
                      }}
                    >
                      Abilities:
                    </p>
                  </div>
                  <div className="">
                    <p className="">{this.state.abilities}</p>
                  </div>

                  <div className="">
                    <p
                      style={{
                        color: `#${this.state.themeColor}`
                      }}
                    >
                      EVs:
                    </p>
                  </div>
                  <div className="">
                    <p className="">{this.state.evs}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardPokemon>
      </div>
    );
  }
}

{
  /* 
<div className="characteristics center">
                <div className="type-element">
                  <div className="type">
                    <span className="">Type: </span>
                    <div className="results">
                      {this.state.types.map(type => (
                        <span
                          key={type}
                          className="badge badge-pill mr-2 text-capitalize badge-costum-pokemon"
                          style={{
                            background: `#${colors_type[type]}`
                          }}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="type-element">
                  <div className="type">Attack</div>
                  <div className="results">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.attack}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.attack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="type-element">
                  <div className="type">Defense</div>
                  <div className="results">
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.defense}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.defense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="type-element">
                  <div className="type">HP</div>
                  <div className="results">
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.hp}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.hp}</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="type-element">
                  <div className="type">Sp Atk</div>
                  <div className="results">
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.specialAttack}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow={this.state.stats.specialAttack}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.specialAttack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="type-element">
                  <div className="type">Sp Def</div>
                  <div className="results">
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.specialDefense}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow={this.state.stats.specialDefense}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.specialDefense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="type-element">
                  <div className="type">Speed</div>
                  <div className="results">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.speed}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.speed}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="type-element">
                  <div className="type">Weight:</div>
                  <div className="results">
                    <h6 className="float-left">{this.state.weight} kg</h6>
                  </div>
                </div>
                <div className="type-element">
                  <div className="type">Total moves:</div>
                  <div className="results">
                    <h6 className="float-left">{this.state.moves.length} </h6>
                  </div>
                </div>
                <div className="type-element">
                  <div className="type">Abilities:</div>
                  <div className="results">
                    <h6 className="float-left">{this.state.abilities}</h6>
                  </div>
                </div>
                <div className="type-element">
                  <div className="type">EVs:</div>
                  <div className="results">
                    <h6 className="float-left">{this.state.evs}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="results center">
              <div className="col">
                <p className="results">{this.state.description}</p>
              </div>
            </div> */
}
